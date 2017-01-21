window.PIXI = require('phaser/build/custom/pixi')
window.p2 = require('phaser/build/custom/p2')
window.Phaser = require('phaser/build/custom/phaser-split')

var pull = require('pull-stream')

var AbstractGrid = require('./abstractGrid')
var Coin = require('./coin')
var Box = require('./box')
var audio = require('./audio')
var { createWebFontConfig, createText } = require('./utils/fontSetup')

var grid = require('./utils/grid')
var updateModule = require('./update')
var initialState = require('./utils/initialState')

var gameHeight = 750
var gameWidth = 1200
var game = new Phaser.Game(gameWidth, gameHeight, Phaser.CANVAS, 'phaser-example', { preload: preload, create: create, update: update });
var playerInitialState = initialState(grid.coinLocations.length)
var WebFontConfig = createWebFontConfig(game)

function setScreen(game, action) {
  switch(action.type){
    case 'SPLASH':
      showSplash()
      break;
    case 'START':
      startGame()
      break;
    case 'WIN':
      showWin()
      break;
    case 'GAME_OVER':
      showGameover()
      break;
  }
}

function preload() {
  game.load.image('block', 'assets/block.png')
  game.load.image('background', 'assets/background2.png')
  game.load.spritesheet('coin', 'assets/sprite-coin.png', 32, 32)
  game.load.spritesheet('dude', 'assets/sprite-character-all.png', 52, 100, 16)
  game.load.script('webfont', '//ajax.googleapis.com/ajax/libs/webfont/1.4.7/webfont.js')
}

var updateParameters = {}
function create() {
  var bg = game.add.tileSprite(0, 0, gameWidth, gameHeight, 'background');
  setScreen(game, {type: 'SPLASH'})
}

function update() {
  return updateModule(updateParameters, setScreen)
}

function showSplash() {
  var playLabel = createText(game, 'Play!')
  playLabel.events.onInputUp.add( () => {
    playLabel.destroy()
    setScreen(game, {type: 'START'} )
  })
}

function showWin() {
  var playLabel = createText(game, 'VICTORY!! \n Play again!')
  playLabel.events.onInputUp.add( () => {
    playLabel.destroy()
    setScreen(game, {type: 'START'} )
  })
}

function showGameover() {
  var playLabel = createText(game, 'He Dead \n Play again!')
  playLabel.events.onInputUp.add( () => {
    playLabel.destroy()
    setScreen(game, {type: 'START'} )
  })
}

function startGame() {
  var game = createGame()
  var bg = game.add.tileSprite(0, 0, gameWidth, gameHeight, 'background');
  var player = createPlayer(game)

  var boxPlacer = Box(game)
  boxPlacer.placeDefaultBoxes()

  var coinPlacer = new Coin(game, player, createCoinHit(player));
  for (var location of grid.coinLocations) {
    var coin = coinPlacer.place(location.y, location.x)
  }

  updateParameters = {
    player: player,
    gameWidth: gameWidth,
    gameHeight: gameHeight,
    game: game
  }
}

function createGame() {
    game.physics.startSystem(Phaser.Physics.P2JS);
    game.physics.p2.gravity.y = 2500;
    game.physics.p2.world.defaultContactMaterial.friction = 0.3;
    game.physics.p2.world.setGlobalStiffness(1e5);
    game.physics.p2.setImpactEvents(true);

    pull(
      audio(),
      pull.drain(vol => game.volume = vol)
    )

    return game
}

function createPlayer(game) {
  var player = game.add.sprite(25, gameHeight - 150, 'dude');
  var animationSpeed = 2

  player.animations.add('right', [7, 8, 9, 10, 11, 12], animationSpeed, true);
  player.animations.add('left', [1, 2, 3, 4, 5, 6], animationSpeed, true);
  player.animations.add('jump-right', [13], animationSpeed, true);
  player.animations.add('jump-left', [0], animationSpeed, true);
  player.animations.add('idle', [14, 15], animationSpeed, true);

  game.physics.p2.enable(player);

  player.body.fixedRotation = true;
  player.body.damping = 0.5;

  player.state = playerInitialState


  return player
}

function update() {
  return updateModule(updateParameters, setScreen)
}

function createCoinHit(player) {
  return function coinHit(body1, body2) {
    if(!body2.hasCollided) {
      this.destroy()

      player.state.coinsPicked += 1
      body2.hasCollided = true
    }
  }
}
