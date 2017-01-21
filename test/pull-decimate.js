var test = require('tape')
var pull = require('pull-stream')

var decimate = require('../pull-decimate')

test('decimate is a function', function(t) {
  t.equal(typeof decimate, 'function')
  t.end()
})

test('decimate emits every n', function(t) {
  t.plan(2)
  pull(
    pull.values([1,2,3,4]),
    decimate(2),
    pull.drain(t.ok)
  )
})

test('decimate emits every n #2', function(t) {
  t.plan(1)
  pull(
    pull.values([1,2,3,4,5]),
    decimate(5),
    pull.drain((val) => t.equal(val, 5))
  )
})
