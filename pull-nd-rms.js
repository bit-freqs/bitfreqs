var pull = require('pull-stream')
var zeros = require('zeros')
var ops = require('ndarray-ops')
var fill = require('ndarray-fill')

module.exports = pull.map(sample => {
  return root(mean(square(sample)))
})

function root (audio) {
  ops.sqrteq(audio)
  return audio
}

function mean (audio) {
  var meanShape = audio.shape.slice(audio.shape.length - 1, audio.shape.length)
  var sum = zeros(meanShape, audio.dtype)

  fill(sum, function () {
    var pick = []
    pick.length = arguments.length
    pick.push(arguments[pick.length - 1])
    return ops.sum(audio.pick.apply(audio, pick))
  })

  var count = audio.shape.slice(0, audio.shape.length - 1).reduce(mult)

  ops.divseq(sum, count)

  return sum
}

function square (audio) {
  ops.powseq(audio, 2)
  return audio
}

function mult (a, b) { return a * b }
