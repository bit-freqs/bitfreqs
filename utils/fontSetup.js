module.exports = {
  createWebFontConfig,
  createText
}

function createWebFontConfig (game) {
  return {
    //  'active' means all requested fonts have finished loading
    //  We set a 1 second delay before calling 'createText'.
    //  For some reason if we don't the browser cannot render the text the first time it's created.
    active: function () { game.time.events.add(Phaser.Timer.SECOND, createText, this) },

    //  The Google Fonts we want to load (specify as many as you like in the array)
    google: {
      families: ['Press Start 2P']
    }
  }
}

function createText (game, textContent) {
  var text = game.add.text(game.world.centerX, game.world.centerY, textContent)
  text.anchor.setTo(0.5)

  text.font = 'Press Start 2P'
  text.fontSize = 60

  //  x0, y0 - x1, y1
  var grd = text.context.createLinearGradient(0, 0, 0, text.canvas.height)
  grd.addColorStop(0, '#8ED6FF')
  grd.addColorStop(1, '#004CB3')
  text.fill = grd

  text.align = 'center'
  text.stroke = '#000000'
  text.strokeThickness = 2
  text.setShadow(5, 5, 'rgba(0,0,0,0.5)', 5)

  text.inputEnabled = true

  return text
}
