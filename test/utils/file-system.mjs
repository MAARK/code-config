import fs from 'fs'
import path from 'path'

function flatten(lists) {
  return lists.reduce((a, b) => a.concat(b), [])
}

function getDirectories(srcPath) {
  return fs
    .readdirSync(srcPath)
    .map((file) => path.join(srcPath, file))
    .filter((filePath) => fs.statSync(filePath).isDirectory())
}

export function getDirectoriesRecursive(srcPath) {
  return [
    srcPath,
    ...flatten(getDirectories(srcPath).map(getDirectoriesRecursive)),
  ]
}
