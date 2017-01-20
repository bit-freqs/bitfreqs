var AbstractGrid = require('./abstractGrid')

module.exports = function (game) {
    var ag = new AbstractGrid(game);

    return {
        place: function (x, y) {
            var sprite = ag.placeSprite(x, y, 'block', 0.6)

            sprite.body.static = true;
            sprite.body.setMaterial(ag.material);
        }
    }

}
