import fs from 'fs'

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
