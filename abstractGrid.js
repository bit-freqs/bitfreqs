module.exports = function AbstractGrid(game) {

    var GRID_SIZE = 57

    var objectMaterial = game.physics.p2.createMaterial('worldMaterial');
    var worldMaterial = game.physics.p2.createMaterial('worldMaterial');
    game.physics.p2.setWorldMaterial(worldMaterial, true, true, true, true);

    return {
        placeSprite: function(x, y, objectName, scale) {
            var sprite = game.add.sprite(0, 0, objectName);
            if(scale != null) {
                sprite.scale.setTo(scale, scale)
            }

            sprite.x = x * GRID_SIZE + 42.5
            sprite.y = y * GRID_SIZE + 205

            game.physics.p2.enable(sprite);
            
            return sprite;
        },

        objectMaterial: objectMaterial,
        worldMaterial: worldMaterial
    }
}
