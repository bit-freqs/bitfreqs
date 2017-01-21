var AbstractGrid = require('./abstractGrid')

module.exports = function (game, player, coinHit) {
  var ag = new AbstractGrid(game)
  return {
    place: function (x, y) {
      var coin = ag.placeSprite(x, y, 'coin')

      coin.animations.add('rotate', null, 10, true)
      coin.animations.play('rotate')

      coin.body.data.gravityScale = 0
      coin.body.setRectangle(32, 32, 0, 0)

      player.body.createBodyCallback(coin, coinHit, coin)
    }
  }
}
