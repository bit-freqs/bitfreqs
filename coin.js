var AbstractGrid = require('./abstractGrid')

module.exports = function (game, player) {
    var ag = new AbstractGrid(game);
    return {
        place: function (x, y) {
            var coin = ag.placeSprite(x, y, 'coin')

            coin.animations.add('rotate', null, 20, true);
            coin.animations.play('rotate')

            coin.body.data.gravityScale = 0
            coin.body.static = true
            coin.body.setRectangle(32, 32, 0, 0);

            player.body.createBodyCallback(coin, coinHit, this)
            console.log('adding callback');
        },
    }
}

function coinHit() {
    console.log('[lol]');
}
