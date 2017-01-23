module.exports = function (numCoins) {
  return {
    totalCoins: numCoins,
    coinsPicked: 0,
    animationStatus: 'right',
    jumpTimer: 0,
    keypressTimer: 0,
    currentAddCol: 1,
    lastActivity: 0,
    placeBoxTimer: 0,
    jumping: false,
    jumpedLastUpdate: true,
    qKeyDown: false,
    volume: 0,
    persistMaxTimer: 0
  }
}
