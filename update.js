var checkIfWin = require('./utils/winLogic').checkIfWin

module.exports = function update(updateParameters, setScreen) {
  var game = updateParameters.game;

  if(updateParameters.player){
    updatePlayer(updateParameters, setScreen)
  }
}

function updatePlayer(updateParameters, setScreen){
  var { player, game, cursors, jumpButton, gameWidth, gameHeight } = updateParameters
  var state = player.state
  var velocityAbs = 300;

  player.body.velocity.x = 0;
  var win = checkIfWin(gameWidth, gameHeight, player.x, player.y, state.totalCoins, state.coinsPicked)
  if(win) return setScreen(game, {type: 'WIN'})

  if (cursors.left.isDown) {
    player.body.velocity.x = -velocityAbs;

    if (state.facing != 'left') {
      player.animations.play('left');
      state.facing = 'left';
    }
  } else if (cursors.right.isDown) {
    player.body.velocity.x = velocityAbs;

    if (state.facing != 'right') {
      player.animations.play('right');
      state.facing = 'right';
    }
  } else {
    if (state.facing != 'idle') {
      player.animations.stop();

      if (state.facing == 'left') {
        player.frame = 0;
      } else {
        player.frame = 5;
      }

      state.facing = 'idle';
    }
  }

  if (isJumping(jumpButton, cursors) && checkIfCanJump(game, player)
    && game.time.now > state.jumpTimer) {
      player.body.velocity.y = -700
      state.jumpTimer = game.time.now + 750
  }
}

function isJumping(jumpButton, cursors) {
  return jumpButton.isDown || cursors.up.isDown;
}

var yAxis = p2.vec2.fromValues(0, 1);
function checkIfCanJump(game, player) {
  var result = false;
  for (var i=0; i < game.physics.p2.world.narrowphase.contactEquations.length; i++) {
    var c = game.physics.p2.world.narrowphase.contactEquations[i];

    if (c.bodyA === player.body.data || c.bodyB === player.body.data) {
      var d = p2.vec2.dot(c.normalA, yAxis);

      if (c.bodyA === player.body.data) {
        d *= -1;
      }

      if (d > 0.5) {
        result = true;
      }
    }
  }

  return result;
}
