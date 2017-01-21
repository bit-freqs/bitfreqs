module.exports = function(coinLocations){
  return {
    totalCoins: coinLocations.length,
    coinsPicked: 0,
    facing: "left",
    jumpTimer: 0
  }
}
