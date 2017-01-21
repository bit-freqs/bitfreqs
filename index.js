window.PIXI = require('phaser/build/custom/pixi')
window.p2 = require('phaser/build/custom/p2')
window.Phaser = require('phaser/build/custom/phaser-split')


var gameStates = require('./gameStates');

var gameHeight = 750
var gameWidth = 1200
var game = new Phaser.Game(gameWidth, gameHeight, Phaser.CANVAS, 'phaser-example');

game.state.add('Splash', gameStates.Splash)
game.state.add('Play', gameStates.Play)
game.state.add('Win', gameStates.Win)
game.state.add('GameOver', gameStates.GameOver)

game.state.start('Play')

function update() {
  return updateModule(updateParameters, setScreen)
}

