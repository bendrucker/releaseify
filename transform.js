'use strict'

var Static = require('static-module')
var Readable = require('stream').Readable
var release = require('./')

var staticModule = Static({
  releaseify: function (options, callback) {
    var stream = Readable()

    release(function (err, release) {
      if (err) return stream.emit('error', err)
      stream.end(JSON.stringify(release))
    })

    return stream
  }
})

module.exports = staticModule
