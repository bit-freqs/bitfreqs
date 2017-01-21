var test = require('tape')
var pull = require('pull-stream')
var nd = require('ndarray')
var unpack = require('ndarray-unpack');

var rms = require('../pull-nd-rms')

test('rms is a function', function(t) {
  t.equal(typeof rms, 'function')
  t.end()
})


test('given an ndarray of values, rms can calculate the rms', function(t) {
  var arr = nd(new Int32Array([2, 2]), [2,1])
  pull(
    pull.once(arr),
    rms,
    pull.map(unpack),
    pull.drain((val) => {
      t.equal(val[0], 2) 
      t.end()
    })
  )
})

test('given an ndarray of values, rms can calculate the rms', function(t) {
  var arr = nd(new Int32Array([4, 4]), [2,1])
  pull(
    pull.once(arr),
    rms,
    pull.map(unpack),
    pull.drain((val) => {
      t.equal(val[0], 4) 
      t.end()
    })
  )
})
