# releaseify [![Build Status](https://travis-ci.org/bendrucker/releaseify.svg?branch=master)](https://travis-ci.org/bendrucker/releaseify) [![Greenkeeper badge](https://badges.greenkeeper.io/bendrucker/releaseify.svg)](https://greenkeeper.io/)

> Get a project's current git commit/tag via Node and Browserify


## Install

```
$ npm install --save releaseify
```


## Usage

```js
var release = require('releaseify')

release(function (err, data) {
  //=> null, {commit, tag}  
})
```

```sh
$ browserify entry.js -t releasify/transform
```

In Node, the git data will be read at run time. When the transform is applied via Browserify, the data is statically inserted into the bundle.

The Browserify transform works by statically analyzing your code and transforming releasify calls with inline shims. Static analysis is fragile and you'll want to write your code so that static analysis can detect your function calls.

:white_check_mark: **Good**

```js
var releaseify = require('releaseify')

releasify(function (err, data) {
  // => ...  
})
```

:x: **Bad**

```js
var releaseify = require('releaseify')

releaseify.bind(null).call(console.log.bind(console))
```

## API

#### `release([options], callback)` -> `undefined`

##### options

Type: `object`  
Default: `{}`

Options that will be passed directly to `child_process`.

#### `callback`

*Required*  
Type: `function`  
Arguments: `err, release`

A function that receives an error (from git) or release data (`{commit, tag}`).

## License

MIT © [Ben Drucker](http://bendrucker.me)
