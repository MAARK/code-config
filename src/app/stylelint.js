import fs from 'fs'
import path from 'path'
import { actionText, dim } from 'src/utils/log-style'
import { askStylelintConfig } from 'src/prompts'
import { addScripts, createPackageJson, runCommand } from 'src/utils/npm'
import stylelintChoices from 'src/prompts/choices/stylelint'

const DEPENDENCIES = ['@maarkllc/code-config@2.0.0', 'stylelint@15.2.0']

async function installDependencies(configChoice) {
  const dependencies = [...DEPENDENCIES, ...configChoice.dependencies]

  await runCommand({
    command: `npm i --save-dev ${dependencies.join(' ')}`
  })
}

function copyFiles(eslintConfig) {
  const templates = path.join(__dirname, '..', 'src', 'templates')
  const prettierPath = path.join(templates, 'prettier.js')
  const stylelintPath = path.join(templates, 'stylelint.js')
  const stylelintContent = fs.readFileSync(stylelintPath, 'utf8')

  fs.copyFileSync(prettierPath, '.prettierrc.js')
  fs.writeFileSync(
    '.stylelintrc.js',
    stylelintContent.replace('{config}', eslintConfig),
    'utf8'
  )
}

async function stylelint() {
  const { stylelintConfig } = await askStylelintConfig()

  await createPackageJson()

  await installDependencies(
    stylelintChoices.find((choice) => choice.name === stylelintConfig)
  )

  copyFiles(stylelintConfig)

  addScripts({
    'howl:stylelint': "stylelint '**/*.{css,scss}'",
    'howl:stylelint-fix': "stylelint '**/*.{css,scss}' --fix"
  })
}

export function stylelintDoc() {
  console.log(
    `\n\t${actionText(
      'stylelint'
    )}\t- Load Stylelint configuration following Maark's guidelines`
  )
  console.log(`\n\t\t\t  ${dim('e.g. howl stylelint')}`)
}

export default stylelint
