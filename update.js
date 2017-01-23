var Box = require('./box')
var {gameHeight, gameWidth} = require('./config')

var checkIfWin = require('./utils/winLogic').checkIfWin

module.exports = function update (updateParameters) {
  updatePlayer.bind(this)()
}

function updatePlayer () {
  var player = this.player
  var game = this.game
  var state = player.state
  var cursors = game.input.keyboard.createCursorKeys()
  var jumpButton = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR)
  var placeBoxButton = game.input.keyboard.addKey(Phaser.Keyboard.Q)
  var restartKey = game.input.keyboard.addKey(Phaser.Keyboard.R)
  var velocityAbs = 400

  player.body.velocity.x = 0

  var endGame = checkIfWin(gameWidth, gameHeight, player.x, player.y, state.totalCoins, state.coinsPicked)

  if (endGame === 'WIN') this.gotoWin()
  if (endGame === 'GAME_OVER') this.gotoGameOver()

  if (restartKey.isDown) this.gotoPlay()

  if (placeBoxButton.isDown && !state.qKeyDown) {
    state.qKeyDown = true
    state.maxVolume = game.volume
  } else if (placeBoxButton.isDown && state.qKeyDown) {
    state.maxVolume = game.volume > state.maxVolume ? game.volume : state.maxVolume
  } else if (!placeBoxButton.isDown && state.qKeyDown) {
    state.qKeyDown = false
    addBox(9 - state.maxVolume, game, state)
    state.maxVolume = 0
  }

  tempVoiceInput(game, state)

  if (cursors.left.isDown) {
    player.body.velocity.x = -velocityAbs
    state.animationstatus = 'left'
  } else if (cursors.right.isDown) {
    player.body.velocity.x = velocityAbs
    state.animationstatus = 'right'
  }

  var canJump = checkIfCanJump(game, player)
  if (isPressingJump(jumpButton, cursors) && canJump && game.time.now > state.jumpTimer) {
    player.body.velocity.y = -700
    state.jumpTimer = game.time.now + 750
    state.jumping = true
    state.jumpedLastUpdate = true
  } else {
    if (!state.jumpedLastUpdate) {
      if (canJump) {
        state.jumping = false
      }
    } else {
      state.jumpedLastUpdate = false
    }
  }

  var idling = !cursors.left.isDown && !cursors.right.isDown && !isPressingJump(jumpButton, cursors)
  if (!idling) {
    state.lastActivity = game.time.now
  }

  updateAnimation(player, game, state)
}

function updateAnimation (player, game, state) {
  var animation = 'left'
  var beenIdleEnough = game.time.now - state.lastActivity > 1000
  if (beenIdleEnough) {
    animation = 'idle'
  } else {
    var facing = state.animationstatus === 'left' ? 'left' : 'right'
    if (state.jumping === true) {
      animation = 'jump-' + facing
    } else {
      animation = facing
    }
  }

  player.animations.play(animation)
}

function isPressingJump (jumpButton, cursors) {
  return jumpButton.isDown || cursors.up.isDown
}

var yAxis = p2.vec2.fromValues(0, 1)
function checkIfCanJump (game, player) {
  var result = false
  for (var i = 0; i < game.physics.p2.world.narrowphase.contactEquations.length; i++) {
    var c = game.physics.p2.world.narrowphase.contactEquations[i]

    if (c.bodyA === player.body.data || c.bodyB === player.body.data) {
      var d = p2.vec2.dot(c.normalA, yAxis)

      if (c.bodyA === player.body.data) {
        d *= -1
      }

      if (d > 0.5) {
        result = true
      }
    }
  }

  return result
}

function tempVoiceInput (game, state) {
  // one to nine correspond to numbers 49-57 in the ascii table
  if (game.time.now > state.keypressTimer) {
    for (var key = 48; key <= 57; key++) {
      if (game.input.keyboard.isDown(key)) {
        var nb = key - 48
        addBox(nb, game, state)
        state.keypressTimer = game.time.now + 100
      }
    }
  }
}

function addBox (nb, game, state) {
  var boxPlacer = new Box(game)
  boxPlacer.place(state.currentAddCol, nb)

  state.currentAddCol += 1
}
