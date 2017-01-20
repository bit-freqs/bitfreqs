module.exports = function update(updateParameters) {
    var game = updateParameters.game;
    var player = updateParameters.player;
    var cursors = updateParameters.cursors;
    var jumpButton = updateParameters.jumpButton;
    var facing = updateParameters.facing;
    var velocityAbs = 300;

    player.body.velocity.x = 0;
    if (cursors.left.isDown) {
        player.body.velocity.x = -velocityAbs;

        if (facing != 'left') {
            player.animations.play('left');
            facing = 'left';
        }
    } else if (cursors.right.isDown) {
        player.body.velocity.x = velocityAbs;

        if (facing != 'right')
        {
            player.animations.play('right');
            facing = 'right';
        }
    } else { if (facing != 'idle') {
            player.animations.stop();

            if (facing == 'left') {
                player.frame = 0;
            } else {
                player.frame = 5;
            }

            facing = 'idle';
        }
    }

    if (isJumping(jumpButton, cursors) && checkIfCanJump(game, player)) {
        player.body.velocity.y = -700; 
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
