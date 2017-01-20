var AbstractGrid = require('./abstractGrid')

module.exports = function (game) {
    var ag = new AbstractGrid(game);
    return {
        place: function (x, y) {
            var coin = ag.placeSprite(x, y, 'coin')
            coin.animations.add('rotate', null, 20, true);
            coin.animations.play('rotate')
        }
    }

}
