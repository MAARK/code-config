const fs = require('fs')
const path = require('path')

function flatten(lists) {
  return lists.reduce((a, b) => a.concat(b), [])
}

function getDirectories(srcPath) {
  return fs
    .readdirSync(srcPath)
    .map((file) => path.join(srcPath, file))
    .filter((filePath) => fs.statSync(filePath).isDirectory())
}

function getDirectoriesRecursive(srcPath) {
  return [
    srcPath,
    ...flatten(getDirectories(srcPath).map(getDirectoriesRecursive))
  ]
}

module.exports = {
  getDirectoriesRecursive
}
