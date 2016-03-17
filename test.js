'use strict'

const test = require('tape')
const child = require('child_process')
const path = require('path')
const release = require('./')

test('setup', function (t) {
  child.execSync('mkdir tmp')
  run([
    'git init',
    'echo "hi" > empty',
    'git add empty',
    'git commit -m "msg"',
    'git tag -am v1.0.0 v1.0.0'
  ])
  t.end()
})

test(function (t) {
  t.plan(3)

  const cwd = path.resolve(__dirname, 'tmp')

  release({cwd}, function (err, release) {
    if (err) return t.end(err)
    t.ok(release)
    t.equal(release.commit.length, 7, 'has short sha')
    t.equal(release.tag, 'v1.0.0', 'has tag')
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
