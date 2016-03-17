var release = require('releaseify')
var extend = require('xtend')

module.exports = getRelease

function getRelease (callback) {
  release(function (err, data) {
    if (err) return callback(err)
    callback(null, extend(data, {
      browser: true
    }))
  })
}
