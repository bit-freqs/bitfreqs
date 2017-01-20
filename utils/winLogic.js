module.exports = {
  pickedAllCoins,
  checkIfWin
}

function pickedAllCoins (totalCoins, coinsPicked){
  if (totalCoins === coinsPicked){
    return true
  }
  return false
}

function checkIfWin (gameHeight, gameWidth, playerX, playerY, totalCoins, coinsPicked){
  var playerAtEndOfScreen = gameHeight == playerX && gameWidth == playerY
  var playerPickedAllCoins = pickedAllCoins(totalCoins, coinsPicked)
  if (playerAtEndOfScreen && playerPickedAllCoins){
    return "Wis game"
  }
}
