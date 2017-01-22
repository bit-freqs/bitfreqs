var {gameHeight, gameWidth} = require('./config')

module.exports = {
  preload: function (game) {
    game.load.image('background', 'assets/background-flat.png')
    game.load.spritesheet('waves', 'assets/wave-sprite-attempt.png', 446.2, 50, 5)
  },
  create: function (game) {
    var bg = game.add.image(0, 0, 'background')
    this.createWaves(game)
  },
  createWaves: function (game) {
    var scale = 1
    //var waves = game.add.sprite(0, gameHeight - (32 * scale), 'waves')
    //waves.animations.add('animateWaves', [4, 3, 2, 1, 0], 5, true)
    //waves.animations.play('animateWaves')
    //waves.scale.setTo(scale, scale)

    var waves = []
    waves.push(game.add.sprite(0, gameHeight - (50 * scale), 'waves'))
    waves.push(game.add.sprite(446.2 * scale, gameHeight - (50 * scale), 'waves'))
    waves.push(game.add.sprite(892.4 * scale, gameHeight - (50 * scale), 'waves'))

    for (var wave of waves) {
      wave.animations.add('animateWaves', [4, 3, 2, 1, 0], 5, true)
      wave.animations.play('animateWaves')
      wave.scale.setTo(scale, scale)
    }
  }
}
