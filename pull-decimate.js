var pull = require('pull-stream')
var window = require('pull-window')

module.exports = function (n) {
  var count = 0
  var win = window((data, cb) => {
    count++
    if (count % n !== 0) return
    return function (end, data) {
      cb(null, data)
    }
  })

  return pull(
    win,
    pull.map(({data}) => data)
  )
}
