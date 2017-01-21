var {gameHeight, gameWidth} = require('./config')
var Splash = require('./Splash')
var Play = require('./Play')
var addCenteredText = require('./addCenteredText')

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
    game.add.tileSprite(0, 0, gameWidth, gameHeight, 'background');

    var playLabel = addCenteredText(game, 'Game Over!\n Click to Play Again!')
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
    game.add.tileSprite(0, 0, gameWidth, gameHeight, 'background');

    var playLabel = addCenteredText(game, 'You WIN!!!')
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

