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

function createText (game, textContent, textAttributes) {
  if(!textAttributes) {
    textAttributes = {}
  }

  var posX = textAttributes.posX ? textAttributes.posX : game.world.centerX
  var posY = textAttributes.posY ? textAttributes.posY : game.world.centerY

  var defaults = {
    font: 'Press Start 2P',
    fontSize: 60,
    align: 'center',
    stroke: '#000000',
    strokeThickness: 2,
    fill: "#8ED6FF"
  }

  var styles = Object.assign(defaults, textAttributes)
  var text = game.add.text(posX, posY, textContent, styles)

  if(!textAttributes.noGradient) {
    var grd = text.context.createLinearGradient(0, 0, 0, text.canvas.height)
    grd.addColorStop(0, '#8ED6FF')
    grd.addColorStop(1, '#004CB3')
    text.fill = grd
  }

  text.setShadow(5, 5, 'rgba(0,0,0,0.5)', 5)
  text.anchor.setTo(0.5)
  text.inputEnabled = true

  return text
}
