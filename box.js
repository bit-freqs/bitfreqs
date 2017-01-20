module.exports = function Box(game) {
  var boxMaterial = game.physics.p2.createMaterial('worldMaterial');

  return { 
    placeBox: function placeBox(x, y) {
      var box = game.add.sprite(0, 0, 'atari');
      box.x = x * box.width + 42.5
      box.y = y * box.height + 42.5

      game.physics.p2.enable(box);
      box.body.static = true;
      box.body.setMaterial(boxMaterial);
    },
    material: boxMaterial
  }
}
