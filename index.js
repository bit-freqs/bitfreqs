window.PIXI = require('phaser/build/custom/pixi')
window.p2 = require('phaser/build/custom/p2')
window.Phaser = require('phaser/build/custom/phaser-split')

var pull = require('pull-stream')

var AbstractGrid = require('./abstractGrid')
var Coin = require('./coin')
var Box = require('./box')
var audio = require('./audio')


var grid = require('./utils/grid')
var updateModule = require('./update')
var initialState = require('./utils/initialState')

var gameHeight = 750
var gameWidth = 1200
var game = new Phaser.Game(gameWidth, gameHeight, Phaser.CANVAS, 'phaser-example', { preload: preload, create: create, update: update });
var state = initialState(grid.coinLocations)

function preload() {
  game.load.image('block', 'assets/block.png');
  game.load.image('background', 'assets/background2.png');
  game.load.spritesheet('coin', 'assets/sprite-coin.png', 32, 32);
  game.load.spritesheet('dude', 'assets/dude.png', 32, 48);
}

function setScreen(game, action) {
  switch(action.type){
    case 'SPLASH':
      showSplash()
      break;
    case 'START':
      startGame()
      break;
    case 'WIN':
      showSplash()
      break;
    case 'GAME_OVER':
      showGameover()
      break;
  }
}

var updateParameters = {};

function create() {

  var bg = game.add.tileSprite(0, 0, gameWidth, gameHeight, 'background');
  setScreen(game, {type: 'SPLASH'})
}

function update() {
  return updateModule(updateParameters, setScreen)
}

function showSplash() {
  var playLabel = addCenteredText(game, 'Play!')
  playLabel.inputEnabled = true;
  playLabel.events.onInputUp.add( () => {
    playLabel.destroy()
    setScreen(game, {type: 'START'} )
  })
}


function showGameover() {
  var deadLabel = addCenteredText(game, 'He Dead', {offsetY: -90})
  var playLabel = addCenteredText(game, 'Play again!')
  playLabel.inputEnabled = true;
  playLabel.events.onInputUp.add( () => {
    playLabel.destroy()
    deadLabel.destroy()
    setScreen(game, {type: 'START'} )
  })
}

function addCenteredText(game, text, opts) {
  opts = opts || {}
  opts = Object.assign({ font: '100px Arial', fill: '#fff', offsetX: 0, offsetY: 0 }, opts)
  var label = game.add.text(0, 0, text, opts)
  label.x = (gameWidth / 2) - label.width / 2 + opts.offsetX
  label.y = gameHeight / 2 + opts.offsetY
  return label
}

function startGame() {

  //  Enable p2 physics
  game.physics.startSystem(Phaser.Physics.P2JS);
  game.physics.p2.gravity.y = 2500;
  game.physics.p2.world.defaultContactMaterial.friction = 0.3;
  game.physics.p2.world.setGlobalStiffness(1e5);

  //  Add a sprite
  var player = game.add.sprite(0, gameHeight - 100, 'dude');
  player.animations.add('left', [0, 1, 2, 3], 10, true);
  player.animations.add('turn', [4], 20, true);
  player.animations.add('right', [5, 6, 7, 8], 10, true);

  //  Enable if for physics. This creates a default rectangular body.
  game.physics.p2.enable(player);

  player.body.fixedRotation = true;
  player.body.damping = 0.5;


  var boxPlacer = Box(game)
  for (var location of grid.boxLocations) {
    boxPlacer.place(location.y, location.x)
  }

  var coinPlacer = new Coin(game, player, coinHit);
  for (var location of grid.coinLocations) {
    var coin = coinPlacer.place(location.y, location.x)
  }

  game.physics.p2.setImpactEvents(true);

  //  Here is the contact material. It's a combination of 2 materials, so whenever shapes with
  //  those 2 materials collide it uses the following settings.
  var spriteMaterial = game.physics.p2.createMaterial('spriteMaterial', player.body);
  var groundPlayerCM = game.physics.p2.createContactMaterial(spriteMaterial, AbstractGrid.worldMaterial, { friction: 0.0 });
  var groundBoxesCM = game.physics.p2.createContactMaterial(AbstractGrid.worldMaterial, AbstractGrid.material, { friction: 0.6 });

  var cursors = game.input.keyboard.createCursorKeys();
  var jumpButton = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

  updateParameters = {
    player: player,
    cursors: cursors,
    jumpButton: jumpButton,
    gameWidth: gameWidth,
    gameHeight: gameHeight,
    game: game
  }
}

function update() {
  return updateModule(updateParameters, state, setScreen)
}

function coinHit(body1, body2) {
  if(!body2.hasCollided) {
    this.destroy()

    state.coinsPicked += 1
    body2.hasCollided = true
  }
}
