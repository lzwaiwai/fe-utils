var fs = require('fs'),
  path = require('path'),
  rollup = require('rollup'),
  resolve = require('rollup-plugin-node-resolve'),
  babel = require('rollup-plugin-babel')

var libsPath = path.resolve(__dirname, './libs')
var allLibs = getAllLibs(libsPath, function (lib) {
  return lib.split('.')[1] === 'js'
})

allLibs.forEach((function (item) {
  var itemName = item.split('.')[0]
  rollup.rollup({
    entry: './libs/' + item,
    plugins: [
      resolve(),
      babel({
        exclude: 'node_modules/**' // only transpile our source code
      })
    ]
  }).then(function (bundle) {
    bundle.write({
      dest: itemName !== 'main' ? item : 'fe-utils.js',
      format: itemName !== 'main' ? 'es' : 'umd',
      moduleName: itemName !== 'main' ? '' : 'feUtils'
    })
  })
}))


function getAllLibs (p, filter) {
  var res = [],
    dirs = fs.readdirSync(p)

  dirs.forEach(function (item) {
    if (filter) {
      filter(item) && res.push(item)
    } else {
      res.push(item)
    }
  })

  return res
}
