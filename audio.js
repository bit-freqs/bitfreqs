var pull = require('pull-stream')
var getUserMedia = require('getusermedia')
var defer = require('pull-defer')
var audio = require('read-audio')
var unpack = require('ndarray-unpack')
var rms = require('./pull-nd-rms')
var decimate = require('./pull-decimate')

module.exports = function () {
  var deferred = defer.source()
  getUserMedia({audio: true, video: false}, function (err, source) {
    if (err) throw new Error(err)
    var src = pull(
      audio({
        source: source,
        channels: 1
      }),
      decimate(10),
      rms,
      pull.map(unpack),
      pull.map(num => num * 10),
      pull.map(num => num >= 10 ? 10 : num),
      pull.map(num => num.toFixed())
    )
    deferred.resolve(src)
  })

  return deferred
}
