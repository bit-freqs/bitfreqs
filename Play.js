var pull = require('pull-stream')

var {gameHeight, gameWidth} = require('./config')
var Coin = require('./coin')
var Box = require('./box')
var audio = require('./audio')()
var updateModule = require('./update')
var grid = require('./utils/grid')
var initialState = require('./utils/initialState')

function Play (game) {
  this.player
}

Play.prototype = {
  preload: function () {
    var game = this.game
    game.load.image('background', 'assets/background-flat.png')
    game.load.script('webfont', '//ajax.googleapis.com/ajax/libs/webfont/1.4.7/webfont.js')
    game.load.spritesheet('block', 'assets/ground-sprite.png', 32, 32)
    game.load.image('restartbutton', 'assets/restart.PNG')
    game.load.spritesheet('coin', 'assets/sprite-coin.png', 32, 32)
    game.load.spritesheet('dude', 'assets/sprite-character-all.png', 52, 100, 16)
    game.load.spritesheet('waves', 'assets/wave-sprite-attempt.png', 285, 32, 5)
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
  var walkingAnimationSpeed = 6

  player.animations.add('right', [12, 11, 10, 9, 8, 7], walkingAnimationSpeed, true)
  player.animations.add('left', [6, 5, 4, 3, 2, 1], walkingAnimationSpeed, true)
  player.animations.add('jump-right', [13], 1, true)
  player.animations.add('jump-left', [0], 1, true)
  player.animations.add('idle', [14, 15], 2, true)

  game.physics.p2.enable(player)

  player.body.fixedRotation = true
  player.body.damping = 0.5

  player.state = initialState(grid.coinLocations.length)

  return player
}

function createGame (game) {
  game.add.image(gameWidth, gameHeight, 'background')
  //game.add.sprite(0, gameHeight - 32, 'waves')
  game.add.button(750, 75, 'restartbutton', () => this.gotoPlay(), this)
  game.physics.startSystem(Phaser.Physics.P2JS)
  game.physics.p2.gravity.y = 2500
  game.physics.p2.world.defaultContactMaterial.friction = 0.3
  game.physics.p2.world.setGlobalStiffness(1e5)
  game.physics.p2.setImpactEvents(true)

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
