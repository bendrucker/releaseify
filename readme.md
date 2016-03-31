# releaseify [![Build Status](https://travis-ci.org/bendrucker/releaseify.svg?branch=master)](https://travis-ci.org/bendrucker/releaseify)

> Get a project's current git commit/tag via Node and Browserify


## Install

```
$ npm install --save releaseify
```


## Usage

```js
var release = require('releaseify')

release(function (err, version) {
  //=> null, {commit, tag}  
})
```

```sh
$ browserify entry.js -t releasify/transform
```

In Node, the git data will be read at run time. When the transform is applied via Browserify, the data is statically inserted into the bundle.

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
