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
  var playerAtEndOfScreen = playerX >= gameWidth - 50
  var playerPickedAllCoins = pickedAllCoins(totalCoins, coinsPicked)
  var playerOnGround = playerY >= gameHeight - 50

  if (playerAtEndOfScreen && playerPickedAllCoins) {
    return 'WIN'
  } else if (playerAtEndOfScreen && !playerPickedAllCoins) {
    return 'GAME_OVER'
  } else if (playerOnGround) {
    return 'GAME_OVER'
  }
  return false
}
