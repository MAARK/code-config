import fs from 'fs'
import path from 'path'

export function readFile({ filepath }) {
  try {
    return fs.readFileSync(filepath, 'utf8')
  } catch (error) {
    return false
  }
}

export function readJsonFile({ filepath }) {
  try {
    return JSON.parse(readFile({ filepath }))
  } catch (error) {
    return false
  }
}

export function writeJsonFile({ filepath, data }) {
  try {
    fs.writeFileSync(filepath, JSON.stringify(data, null, 2))
  } catch (error) {
    return false
  }

  return true
}

function flatten(lists) {
  return lists.reduce((a, b) => a.concat(b), [])
}

function getDirectory(srcPath) {
  return fs
    .readdirSync(srcPath)
    .map((file) => path.join(srcPath, file))
    .filter((filePath) => fs.statSync(filePath).isDirectory())
}

export function getDirectories(srcPath) {
  return [srcPath, ...flatten(getDirectory(srcPath).map(getDirectories))]
}
