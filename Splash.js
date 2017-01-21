var {gameHeight, gameWidth} = require('./config')

var { createWebFontConfig, createText } = require('./utils/fontSetup')

function Splash (game) {

}

Splash.prototype = {
  preload: function () {
    var game = this.game
    game.load.image('background', 'assets/background2.png')
  },
  create: function () {
    var game = this.game
    createWebFontConfig(game)
    game.add.tileSprite(0, 0, gameWidth, gameHeight, 'background')
    var playLabel = createText(game, 'Play!')

    playLabel.inputEnabled = true
    playLabel.events.onInputUp.add(() => {
      playLabel.destroy()
      this.gotoPlay()
    })

    var helpText = 
      `Instructions: Bitfreq just woke up on the beach. It's getting dark, the tide has come in and he's lost his bus money. You need to collect his lost money and get to the other side without drowning. You can place platforms in the air by holding the letter 'Q' and screaming at your computer. The louder you scream the higher in the air the platform will be.`

    var textAttributes = {
      posX: game.world.centerX,
      posY: game.world.centerY + 200,
      fontSize: 20,
      wordWrapWidth: 1000,
      wordWrap: true,
      font: null,
      noGradient: true
    }
    var helpLabel = createText(game, helpText, textAttributes)

  },
  update: function () {

  },
  gotoPlay: function () {
    this.state.start('Play')
  }
}

module.exports = Splash
