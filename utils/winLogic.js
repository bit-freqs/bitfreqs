module.exports = {
  pickedAllCoins,
  checkIfWin
}

function pickedAllCoins (totalCoins, coinsPicked){
  if (totalCoins == coinsPicked){
    return true
  }
  return false
}

function checkIfWin (gameWidth, gameHeight, playerX, playerY, totalCoins, coinsPicked){
  var playerAtEndOfScreen = playerX >= gameWidth - 20
  var playerPickedAllCoins = pickedAllCoins(totalCoins, coinsPicked)
  var playerOnGround = playerY >= gameHeight - 24

  if (playerAtEndOfScreen && playerPickedAllCoins) {
    return {payload: {type: 'WIN'} }
  } else if (playerAtEndOfScreen && !playerPickedAllCoins) {
    return {payload: {type: 'GAME_OVER'} }
  } else if (playerOnGround) {
    return {payload: {type: 'GAME_OVER'} }
  }
  return false
}
