import { prompt } from 'enquirer'
import path from 'path'
import fs from 'fs'
import { actionText } from './log-style'
import { getDirectories } from './file-system'

export function getLintChoices({ baseConfigPath }) {
  const configPaths = getDirectories(baseConfigPath).filter((configPath) => {
    const indexPath = path.join(configPath, 'info.json')
    return fs.existsSync(indexPath)
  })

  return configPaths.map((configPath) => {
    const infoPath = path.join(configPath, 'info.json')
    return JSON.parse(fs.readFileSync(infoPath, 'utf8'))
  })
}

export function askLintChoices(choices) {
  const README = 'https://github.com/MAARK/code-config/blob/main/README.md'

  console.log(
    '\n⚠️  This action will overwrite existing Stylelint configuration files'
  )
  console.log(`For more info: ${actionText(README)}\n`)

  return prompt([
    {
      type: 'autocomplete',
      name: 'lintChoice',
      message: 'Which configuration do you want to install?',
      choices: [...choices]
    }
  ])
}