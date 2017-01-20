var pull = require('pull-stream');
var getUserMedia = require('getusermedia');
var defer = require('pull-defer');
var audio = require('read-audio');
var unpack = require('ndarray-unpack');
var freqs = require('ndsamples-frequencies');

module.exports = function () {
  var deferred = defer.source()
  getUserMedia({audio: true, video: false}, function(err, source) {
    var src =  pull(
      audio({source: source}),
      pull.map(freqs), 
      pull.map(function(freq) {
        return freq.step(-1) 
      }),
      pull.map(unpack)
    )
    deferred.resolve(src)
  })

  return deferred
}
