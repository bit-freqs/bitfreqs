window.PIXI = require('phaser/build/custom/pixi')
window.p2 = require('phaser/build/custom/p2')
window.Phaser = require('phaser/build/custom/phaser-split')

var {gameHeight, gameWidth} = require('./config')
var gameStates = require('./gameStates');

var game = new Phaser.Game(gameWidth, gameHeight, Phaser.CANVAS, 'phaser-example');

game.state.add('Splash', gameStates.Splash)
game.state.add('Play', gameStates.Play)
game.state.add('Win', gameStates.Win)
game.state.add('GameOver', gameStates.GameOver)

game.state.start('Splash')
