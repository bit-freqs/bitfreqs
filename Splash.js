var {gameHeight, gameWidth} = require('./config')
var { createWebFontConfig, createText } = require('./utils/fontSetup')
var background = require('./background')

function Splash (game) {

}

Splash.prototype = {
  preload: function () {
    var game = this.game
    background.preload(game)
  },
  create: function () {
    var game = this.game

    createWebFontConfig(game)
    background.create(game)

    var playLabel = createText(game, 'Play!')

    playLabel.inputEnabled = true
    playLabel.events.onInputUp.add(() => {
      playLabel.destroy()
      this.gotoPlay()
    })
  },
  update: function () {

  },
  gotoPlay: function () {
    this.state.start('Play')
  }
}

module.exports = Splash
