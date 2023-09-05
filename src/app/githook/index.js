import fs from 'fs'
import path from 'path'
import { actionText, dim } from 'src/utils/log-style'
import {
  askHookChoices,
  getHookChoices,
  askSmartLinting
} from 'src/utils/prompts'
import { checkCodeConfigScripts } from 'src/utils/npm'

function haveOptions(array) {
  return array && array.length && array[0]
}

function copyFiles(options) {
  const gitPathDefault = '.git/'
  const prepushPath = 'hooks/pre-push'
  const maxFolderStep = 2
  let hookPath = path.join(__dirname, '../src/app/githook/templates/pre-push')
  let gitPath = gitPathDefault
  let destiationPath = gitPathDefault + prepushPath
  let templates = ''
  let optionPath = ''
  let fileContent = ''
  let folderStep = 0

  while (!fs.existsSync(gitPath) && folderStep < maxFolderStep) {
    console.log(
      { gitPath },
      !fs.existsSync(gitPath),
      folderStep < maxFolderStep
    )
    gitPath = `../${gitPath}`
    folderStep++
  }

  if (options.smartLinting) {
    console.log('code-config smart linting')
    templates = path.join(__dirname, '../src/app/githook/templates/smart')
    hookPath = path.join(
      __dirname,
      '../src/app/githook/templates/pre-push-smart'
    )
  } else if (checkCodeConfigScripts()) {
    console.log('code-config scripts detected')
    templates = path.join(__dirname, '../src/app/githook/templates/code-config')
  } else {
    console.log('code-config scripts not detected')
    templates = path.join(__dirname, '../src/app/githook/templates/generic')
  }

  if (!fs.existsSync(gitPath)) {
    console.log(`\n ⚠️  Git directory not found. ⚠️`)
    console.log(` Analized ${folderStep} folders up this folder 📁`)
    console.log(' ‼️  Aborted command ‼️')
  } else {
    destiationPath = gitPath + prepushPath
    if (!fs.existsSync(destiationPath)) {
      fs.copyFileSync(hookPath, destiationPath)
      try {
        fs.chmodSync(destiationPath, 0o754)
      } catch (error) {
        console.log(error)
      }
      console.log(`Added githook file! 🎉`)
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
  const smartLinting = await askSmartLinting()

  if (!haveOptions(defaultOption)) {
    const folderPath = path.join(
      __dirname,
      '../src/app/githook/templates/code-config'
    )
    const hookChoices = await getHookChoices({ folderPath })
    const selectedHookChoices = await askHookChoices(hookChoices)
    options = {
      hookChoice: selectedHookChoices.hookChoice,
      smartLinting: smartLinting.smartLinting
    }
  } else {
    options = {
      hookChoice: defaultOption,
      smartLinting: smartLinting.smartLinting
    }
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
