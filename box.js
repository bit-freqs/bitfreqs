module.exports = function Box(game) {
  var boxMaterial = game.physics.p2.createMaterial('worldMaterial');

  return { 
    placeBox: function placeBox(x, y) {
      var box = game.add.sprite(x, y, 'atari');
      game.physics.p2.enable(box);
      box.body.static = true;
      box.body.setMaterial(boxMaterial);
    },
    material: boxMaterial
  }
}
