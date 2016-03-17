'use strict'

const test = require('tape')
const child = require('child_process')
const path = require('path')
const browserify = require('browserify')
const vm = require('vm')
const release = require('./')

const cwd = path.resolve(__dirname, 'tmp')

test('setup', function (t) {
  child.execSync('mkdir tmp')
  child.execSync('cp ./fixture.js ./tmp/fixture.js')
  run([
    'git init',
    'git add fixture.js',
    'git commit -m "add module"',
    'git tag -am v1.0.0 v1.0.0'
  ])
  t.end()
})

test(function (t) {
  t.plan(3)

  release({cwd}, function (err, release) {
    if (err) return t.end(err)
    t.ok(release)
    t.equal(release.commit.length, 7, 'has short sha')
    t.equal(release.tag, 'v1.0.0', 'has tag')
  })
})

test('browserify', function (t) {
  t.plan(3)

  browserify()
    .require('./tmp/fixture', {expose: 'fixture'})
    .transform(path.resolve(__dirname, 'transform.js'), {cwd})
    .bundle(function (err, buffer) {
      if (err) return t.end(err)
      const code = buffer.toString()
      const context = {
        setTimeout,
        clearTimeout
      }

      vm.runInNewContext(code, context)('fixture')(function (err, release) {
        if (err) return t.end(err)
        t.ok(release)
        t.equal(release.commit.length, 7, 'has short sha')
        t.equal(release.tag, 'v1.0.0', 'has tag')
      })
    })
})

test('teardown', function (t) {
  child.execSync('rm -rf tmp')
  t.end()
})

function run (commands) {
  commands.forEach(function (command) {
    child.execSync(command, {
      cwd: 'tmp'
    })
  })
}
