'use strict'

var nextTick = require('next-tick')

module.exports = noopGit

function noopGit (callback) {
  nextTick(function () {
    callback(new Error('git data is not available in the browser without the browserify transform'))
  })
}
