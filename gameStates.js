var {gameHeight, gameWidth} = require('./config')
var Splash = require('./Splash')
var Play = require('./Play')
var addCenteredText = require('./addCenteredText')

var { createWebFontConfig, createText } = require('./utils/fontSetup')

var states = {}
module.exports = states

states.Splash = Splash 
states.Play = Play 

states.GameOver = function(game){

}

states.GameOver.prototype = {
  preload: function() {
    var game = this.game
    game.load.image('background', 'assets/background2.png');
  },
  create: function() {
    var game = this.game
    createWebFontConfig(game)
    game.add.tileSprite(0, 0, gameWidth, gameHeight, 'background');

    var playLabel = createText(game, 'He Dead \n Play again!')
    playLabel.inputEnabled = true;
    playLabel.events.onInputUp.add(() => {
      playLabel.destroy()
      this.state.start('Play') 
    })
  },
  gotoPlay: function() {
    this.state.start('Play') 
  }
}
states.Win = function(game){

}

states.Win.prototype = {
  preload: function() {
    var game = this.game
    game.load.image('background', 'assets/background2.png');
  },
  create: function() {
    var game = this.game
    createWebFontConfig(game)
    game.add.tileSprite(0, 0, gameWidth, gameHeight, 'background');

    var playLabel = createText(game, 'VICTORY!! \n Play again!')
    playLabel.inputEnabled = true;
    playLabel.events.onInputUp.add(() => {
      playLabel.destroy()
      this.state.start('Play') 
    })
  },
  gotoPlay: function() {
    this.state.start('Play') 
  }
}

