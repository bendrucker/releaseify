'use strict'

var Static = require('static-module')
var PassThrough = require('stream').PassThrough
var release = require('./')

module.exports = transform

function transform (file, options) {
  options = options || {}

  var staticModule = Static({
    releaseify: asStream
  })

  return staticModule

  function asStream (opts, callback) {
    if (typeof opts === 'function') callback = opts
    var passThrough = new PassThrough()

    release(options, function (err, release) {
      if (err) return staticModule.emit('error', err)
      passThrough.write('process.nextTick(function(){(' + callback + ')(null,' + JSON.stringify(release) + ')})')
      passThrough.end()
    })

    return passThrough
  }
}
