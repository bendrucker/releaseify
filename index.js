'use strict'

var parallel = require('run-parallel')
var child = require('child_process')

module.exports = gitRelease

function gitRelease (options, callback) {
  if (typeof options === 'function') {
    callback = options
    options = {}
  }

  parallel({commit, tag}, callback)

  function commit (callback) {
    child.execFile('git', ['rev-parse', '--short', 'HEAD'], options, trim(callback))
  }

  function tag (callback) {
    child.execFile('git', ['describe'], options, trim(callback))
  }
}

function trim (callback) {
  return function trimStdout (err, stdout) {
    if (err) return callback(err)
    callback(null, stdout.trim())
  }
}
