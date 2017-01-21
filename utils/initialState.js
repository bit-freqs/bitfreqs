module.exports = function(numCoins){
  return {
    totalCoins: numCoins,
    coinsPicked: 0,
    facing: "left",
    jumpTimer: 0,
    keypressTimer: 0,
    currentAddCol: 1,
    lastActivity: 0,
    placeBoxTimer: 0
  }
}
