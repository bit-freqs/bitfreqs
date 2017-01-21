module.exports = function AbstractGrid (game) {
  var GRID_SIZE = 57

  return {
    placeSprite: function (x, y, objectName, scale) {
      var sprite = game.add.sprite(0, 0, objectName)
      if (scale != null) {
        sprite.scale.setTo(scale, scale)
      }

      sprite.x = x * GRID_SIZE + 31
      sprite.y = y * GRID_SIZE + 105

      game.physics.p2.enable(sprite)

      return sprite
    }
  }
}
