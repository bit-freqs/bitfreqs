var {gameHeight, gameWidth} = require('./config')
var addCenteredText = require('./addCenteredText')

function Splash(game){

}

Splash.prototype = {
  preload: function() {
    var game = this.game
    game.load.image('background', 'assets/background2.png');
  },
  create: function() {
    var game = this.game
    game.add.tileSprite(0, 0, gameWidth, gameHeight, 'background');

    var playLabel = addCenteredText(game, 'Play!')
    playLabel.inputEnabled = true;
    playLabel.events.onInputUp.add( () => {
      playLabel.destroy()
      this.gotoPlay()
    })
  },
  update: function() {
    
  },
  gotoPlay: function() {
    this.state.start('Play') 
  }
}

module.exports = Splash
