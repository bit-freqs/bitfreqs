var Box = require('./box')
var checkIfWin = require('./utils/winLogic').checkIfWin

module.exports = function update(updateParameters, state) {
    var game = updateParameters.game;
    var player = updateParameters.player;
    var velocityAbs = 300;

    player.body.velocity.x = 0;

    var cursors = game.input.keyboard.createCursorKeys();
    var jumpButton = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    checkIfWin(updateParameters.gameWidth, player.x, state.totalCoins, state.coinsPicked)
    tempVoiceInput(game, state)

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

function tempVoiceInput(game, state) {
    // one to nine correspond to numbers 49-57 in the ascii table
    if(game.time.now > state.keypressTimer) {
        for(var key = 48; key <= 57; key++) {
            if(game.input.keyboard.isDown(key)) {
                var nb = key - 48;
                addBox(nb, game, state)
                state.keypressTimer = game.time.now + 750;
            }
        }
    }
}

function addBox() {

}
