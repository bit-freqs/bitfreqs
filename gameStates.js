var {gameHeight, gameWidth} = require('./config')
var Splash = require('./Splash')
var Play = require('./Play')
var background = require('./background')

var { createWebFontConfig, createText } = require('./utils/fontSetup')

var states = {}
module.exports = states

states.Splash = Splash
states.Play = Play

states.GameOver = function (game) {

}

states.GameOver.prototype = {
  preload: function () {
    var game = this.game
    background.preload(game)
  },
  create: function () {
    var game = this.game
    createWebFontConfig(game)
    background.create(game)

    var playLabel = createText(game, 'He Dead \n Play again!')
    playLabel.events.onInputUp.add(() => {
      playLabel.destroy()
      this.state.start('Play')
    })
  },
  gotoPlay: function () {
    this.state.start('Play')
  }
}
states.Win = function (game) {

}

states.Win.prototype = {
  preload: function () {
    var game = this.game
    background.preload(game)
  },
  create: function () {
    var game = this.game
    createWebFontConfig(game)

    background.create(game)

    var playLabel = createText(game, 'VICTORY!! \n Play again!')
    playLabel.events.onInputUp.add(() => {
      playLabel.destroy()
      this.state.start('Play')
    })
  },
  gotoPlay: function () {
    this.state.start('Play')
  }
}
