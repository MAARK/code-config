import fs from 'fs'
import path from 'path'
import { actionText, dim } from 'src/utils/log-style'
import {
  askHookChoices,
  getHookChoices,
  askCustomGitFolderPath
} from 'src/utils/prompts'
import { checkCodeConfigScripts } from 'src/utils/npm'

function haveOptions(array) {
  return array && array.length && array[0]
}

async function copyFiles(options) {
  const destiationPathDefault = '.git/'
  const prepushPath = 'hooks/pre-push'
  const hookPath = path.join(__dirname, '../src/app/githook/templates/pre-push')
  let customPath = ''
  let destiationPath = ''
  let templates = ''
  let optionPath = ''
  let fileContent = ''

  customPath = await askCustomGitFolderPath()
  if (customPath.gitPath === '') {
    destiationPath = destiationPathDefault + prepushPath
  } else {
    destiationPath = customPath.gitPath + prepushPath
  }

  if (checkCodeConfigScripts()) {
    console.log('code-config scripts detected')
    templates = path.join(__dirname, '../src/app/githook/templates/code-config')
  } else {
    console.log('code-config scripts not detected')
    templates = path.join(__dirname, '../src/app/githook/templates/generic')
  }

  if (!fs.existsSync(customPath.gitPath)) {
    console.log('\n ⚠️  Git directory not found. ⚠️')
    console.log(' ‼️  Aborted command ‼️')
  } else {
    if (!fs.existsSync(destiationPath)) {
      fs.copyFileSync(hookPath, destiationPath)
      console.log(`Added githook file!`)
    }

    fs.readFile(destiationPath, 'utf8', (err, fileString) => {
      fileContent = fileString
    })

    const writer = fs.createWriteStream(destiationPath, { flags: 'a' })
    // Read and display the file data on console
    options.hookChoice.forEach((option) => {
      optionPath = path.join(templates, option)
      fs.readFile(optionPath, 'utf8', (err, dataToWrite) => {
        if (fileContent.includes(dataToWrite)) {
          console.log(`${option} command already installed, Skipping...`)
        } else {
          writer.write(dataToWrite)
          console.log(`${option} command added`)
        }
      })
    })
  }
}

async function githook(defaultOption) {
  let options = []

  if (!haveOptions(defaultOption)) {
    const folderPath = path.join(
      __dirname,
      '../src/app/githook/templates/code-config'
    )
    const hookChoices = await getHookChoices({ folderPath })
    options = await askHookChoices(hookChoices)
  } else {
    options = { hookChoice: defaultOption }
  }

  copyFiles(options)
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
