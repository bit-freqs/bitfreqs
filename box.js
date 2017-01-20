module.exports = function Box(game) {
  var boxMaterial = game.physics.p2.createMaterial('worldMaterial');

  return {
    placeBox: function placeBox(x, y) {
      var scale = 0.6
      var box = game.add.sprite(0, 0, 'atari');
      box.scale.setTo(scale, scale);

      box.x = x * box.width + 42.5
      box.y = y * box.height + 205

      game.physics.p2.enable(box);
      box.body.static = true;
      box.body.setMaterial(boxMaterial);
    },
    material: boxMaterial
  }
}
