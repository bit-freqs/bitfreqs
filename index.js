window.PIXI = require('phaser/build/custom/pixi')
window.p2 = require('phaser/build/custom/p2')
window.Phaser = require('phaser/build/custom/phaser-split')

var abstractGrid = require('./abstractGrid');
var grid = require('./utils/grid')
var updateModule = require('./update')

var gameHeight = 750
var gameWidth = 1200
var game = new Phaser.Game(gameWidth, gameHeight, Phaser.CANVAS, 'phaser-example', { preload: preload, create: create, update: update });

function preload() {
    game.load.image('atari', 'assets/block.png');
    game.load.image('background', 'assets/background2.png');
    game.load.image('coin', 'assets/sprite-coin.png');
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
    var player = game.add.sprite(0, gameHeight, 'dude');
    player.animations.add('left', [0, 1, 2, 3], 10, true);
    player.animations.add('turn', [4], 20, true);
    player.animations.add('right', [5, 6, 7, 8], 10, true);

    //  Enable if for physics. This creates a default rectangular body.
    game.physics.p2.enable(player);

    player.body.fixedRotation = true;
    player.body.damping = 0.5;

    var spriteMaterial = game.physics.p2.createMaterial('spriteMaterial', player.body);

    var ag = abstractGrid(game)
    for (var location of grid.boxLocations) {
      ag.placeSprite(location.y, location.x, 'atari')
    }

    //  Here is the contact material. It's a combination of 2 materials, so whenever shapes with
    //  those 2 materials collide it uses the following settings.
    var groundPlayerCM = game.physics.p2.createContactMaterial(spriteMaterial, ag.worldMaterial, { friction: 0.0 });
    var groundBoxesCM = game.physics.p2.createContactMaterial(ag.worldMaterial, ag.material, { friction: 0.6 });

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
    return updateModule(updateParameters)
}
