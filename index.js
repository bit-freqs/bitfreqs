window.PIXI = require('phaser/build/custom/pixi')
window.p2 = require('phaser/build/custom/p2')
window.Phaser = require('phaser/build/custom/phaser-split')

var pull = require('pull-stream')

var AbstractGrid = require('./abstractGrid')
var Coin = require('./coin')
var Box = require('./box')
var audio = require('./audio')

pull(
  audio(),
  pull.log()
)

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

var sprite;
var updateParameters = {}
function create() {
    var bg = game.add.tileSprite(0, 0, gameWidth, gameHeight, 'background');

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
    boxPlacer.placeDefaultBoxes()
    //for (var location of grid.boxLocations) {
        //boxPlacer.place(location.y, location.x)
    //}

    var coinPlacer = new Coin(game, player, coinHit);
    for (var location of grid.coinLocations) {
        var coin = coinPlacer.place(location.y, location.x)
    }

    game.physics.p2.setImpactEvents(true);

    var cursors = game.input.keyboard.createCursorKeys();
    var jumpButton = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

    updateParameters = {
        player: player,
        cursors: cursors,
        jumpButton: jumpButton,
        game: game
    }
}

function update() {
    return updateModule(updateParameters, state)
}

function coinHit(body1, body2) {
    if(!body2.hasCollided) { 
        this.destroy()

        state.coinsPicked += 1
        body2.hasCollided = true
    }
}
