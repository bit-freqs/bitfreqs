var AbstractGrid = require('./abstractGrid')

module.exports = function (game) {
  var ag = new AbstractGrid(game);

  return {
    place: function (x, y) {
      var box = ag.placeSprite(x, y, 'block', 1)

      box.animations.add('loseSand', null, 2, true)
      box.animations.play('loseSand')

      box.body.static = true
      box.body.setMaterial(ag.material)

      box.body.setRectangle(64, 20, null, -22)
      return box
    },

    placeDefaultBoxes: function() {
      this.place(0, 9);
      this.place(20, 9);
    }
  }
}
