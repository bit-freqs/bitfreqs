var pull = require('pull-stream')

var {gameHeight, gameWidth} = require('./config')
var Coin = require('./coin')
var Box = require('./box')
var audio = require('./audio')()
var updateModule = require('./update')
var grid = require('./utils/grid')
var initialState = require('./utils/initialState')
var background = require('./background')

function Play (game) {
  this.player
}

Play.prototype = {
  preload: function () {
    var game = this.game
    game.load.script('webfont', '//ajax.googleapis.com/ajax/libs/webfont/1.4.7/webfont.js')
    game.load.spritesheet('block', 'assets/ground-sprite.png', 64, 64)
    game.load.image('restartbutton', 'assets/restart.png', 64, 32)
    game.load.spritesheet('coin', 'assets/sprite-coin.png', 32, 32)
    game.load.spritesheet('dude', 'assets/sprite-character-all.png', 78, 150)

    background.preload(game)
  },
  create: function () {
    var game = this.game
    createGame.bind(this)(game)

    var player = this.player = createPlayer(game)

    var boxPlacer = Box(game)
    boxPlacer.placeDefaultBoxes()

    var coinPlacer = new Coin(game, player, createCoinHit(player))
    for (var location of grid.coinLocations) {
      coinPlacer.place(location.y, location.x)
    }
  },
  update: function () {
    updateModule.bind(this)()
  },
  gotoWin: function () {
    this.state.start('Win')
  },
  gotoPlay: function () {
    this.state.start('Play')
  },
  gotoGameOver: function () {
    this.state.start('GameOver')
  }
}

function createPlayer (game) {
  var player = game.add.sprite(25, gameHeight - 150, 'dude')
  player.scale.setTo(0.75)
  var walkingAnimationSpeed = 6

  player.animations.add('right', [12, 11, 10, 9, 8, 7], walkingAnimationSpeed, true)
  player.animations.add('left', [6, 5, 4, 3, 2, 1], walkingAnimationSpeed, true)
  player.animations.add('jump-right', [13], 1, true)
  player.animations.add('jump-left', [0], 1, true)
  player.animations.add('idle', [14, 15], 2, true)

  game.physics.p2.enable(player)

  player.body.fixedRotation = true
  player.body.damping = 0.5

  player.body.setRectangle(40, 112.5)

  player.state = initialState(grid.coinLocations.length)

  return player
}

function createGame (game) {
  game.physics.startSystem(Phaser.Physics.P2JS)
  game.physics.p2.gravity.y = 2500
  game.physics.p2.world.defaultContactMaterial.friction = 0.3
  game.physics.p2.world.setGlobalStiffness(1e5)
  game.physics.p2.setImpactEvents(true)

  background.create(game)

  var scale = 2
  var restart = game.add.button(gameWidth - (80 * scale), 10, 'restartbutton', () => this.gotoPlay(), this)
  restart.scale.setTo(scale, scale)

  pull(
      audio,
      pull.drain(vol => { game.volume = vol })
    )
}

function createCoinHit (player) {
  return function coinHit (body1, body2) {
    if (!body2.hasCollided) {
      this.destroy()

      player.state.coinsPicked += 1
      body2.hasCollided = true
    }
  }
}


module.exports = Play
