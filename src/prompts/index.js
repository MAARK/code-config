import { prompt } from 'enquirer'
import { actionText } from 'src/utils/log-style'
import eslintChoices from './choices/eslint'
import stylelintChoices from './choices/stylelint'

const README = 'https://github.com/MAARK/code-config/blob/main/README.md'

export function askCoreCommands(choices) {
  console.log()
  return prompt([
    {
      type: 'autocomplete',
      name: 'coreCommands',
      message: 'What do you want to do?',
      choices: [...choices]
    }
  ])
}

export function askESLintConfig() {
  console.log(
    '\n⚠️  This action will overwrite existing ESLint configuration files'
  )
  console.log(`For more info: ${actionText(README)}\n`)
  return prompt([
    {
      type: 'autocomplete',
      name: 'eslintConfig',
      message: 'Which configuration do you want to install?',
      choices: [...eslintChoices]
    }
  ])
}

export function askStylelintConfig() {
  console.log(
    '\n⚠️  This action will overwrite existing Stylelint configuration files'
  )
  console.log(`For more info: ${actionText(README)}\n`)
  return prompt([
    {
      type: 'autocomplete',
      name: 'stylelintConfig',
      message: 'Which configuration do you want to install?',
      choices: [...stylelintChoices]
    }
  ])
}
