import fs from 'fs'
import path from 'path'
import { actionText, dim } from 'src/utils/log-style'
import { askHookChoices, getHookChoices } from 'src/utils/prompts'

function haveOptions(array) {
  if (!Array.isArray(array)) {
    return false
  }

  if (array.length !== 0 && array[0] !== undefined) {
    return true
  }
  return false
}

function copyFiles(options) {
  const templates = path.join(__dirname, '../src/app/githook/templates')
  const hookPath = path.join(__dirname, '../src/app/githook/pre-push')
  let optionPath = ''

  fs.copyFileSync(hookPath, '.git/hooks/pre-push')

  const writer = fs.createWriteStream('.git/hooks/pre-push', { flags: 'a' })
  // Read and display the file data on console
  options.hookChoice.forEach((option) => {
    optionPath = path.join(templates, option)
    fs.readFile(optionPath, 'utf8', (err, data) => {
      writer.write(data)
    })
  })
}

export async function githook(defaultOption) {
  let options = []

  if (!haveOptions(defaultOption)) {
    const folderPath = path.join(__dirname, '../src/app/githook/templates')
    const hookChoices = await getHookChoices({ folderPath })
    options = await askHookChoices(hookChoices)
  } else {
    options = { hookChoice: defaultOption }
  }

  copyFiles(options)

  console.log(`\n  Added githook file! `)
}

export function githookDoc() {
  console.log(
    `\n\t${actionText(
      'githook'
    )}\t\t- Load GitHook configuration following Maark's guidelines`
  )
  console.log(`\n\t\t\t  ${dim('code-config githook')}`)
}

export const githookPrompt = {
  name: 'githook',
  message: '🪝  Create githook file',
  hint: 'code-config githook',
  action: githook
}

export default githook
