var {gameHeight, gameWidth} = require('./config')

module.exports = function addCenteredText (game, text, opts) {
  opts = opts || {}
  opts = Object.assign({ font: '100px Arial', fill: '#fff', offsetX: 0, offsetY: 0 }, opts)
  var label = game.add.text(0, 0, text, opts)
  label.x = (gameWidth / 2) - label.width / 2 + opts.offsetX
  label.y = gameHeight / 2 + opts.offsetY
  return label
}
