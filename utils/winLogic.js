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

function checkIfWin (gameWidth, playerX, totalCoins, coinsPicked){
  var playerAtEndOfScreen = playerX >= gameWidth - 20
  var playerPickedAllCoins = pickedAllCoins(totalCoins, coinsPicked)

  if (playerAtEndOfScreen && playerPickedAllCoins){
    console.log("WINNER")
    return "Wins game"
  }
}
