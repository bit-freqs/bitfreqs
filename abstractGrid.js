module.exports = function AbstractGrid(game, abstractGrid) {
    var material = game.physics.p2.createMaterial('worldMaterial');
    var worldMaterial = game.physics.p2.createMaterial('worldMaterial');
    game.physics.p2.setWorldMaterial(worldMaterial, true, true, true, true);

    return {
        placeSprite: function(x, y, objectName) {
            var scale = 0.6
            var box = game.add.sprite(0, 0, objectName);
            box.scale.setTo(scale, scale);

            box.x = x * box.width + 42.5
            box.y = y * box.height + 205

            game.physics.p2.enable(box);
            box.body.static = true;
            box.body.setMaterial(material);
        },
        material: material,
        worldMaterial: worldMaterial
    }
}
