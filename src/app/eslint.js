import fs from 'fs'
import path from 'path'
import { askESLintConfig } from 'src/prompts'
import { createPackageJson, runCommand, addScripts } from 'src/utils/npm'
import { actionText, dim } from 'src/utils/log-style'
import eslintChoices from 'src/prompts/choices/eslint'

const DEPENDENCIES = [
  '@maarkllc/code-config@1.1.0',
  'eslint@8.35.0',
  'prettier@2.8.4',
  'eslint-config-prettier@8.7.0',
  'eslint-plugin-prettier@4.2.1'
]

async function installDependencies(configChoice) {
  const dependencies = [...DEPENDENCIES, ...configChoice.dependencies]

  await runCommand({
    command: `npm i --save-dev ${dependencies.join(' ')}`
  })
}

function copyFiles(eslintConfig) {
  const templates = path.join(__dirname, '..', 'src', 'templates')
  const prettierPath = path.join(templates, 'prettier.js')
  const eslintPath = path.join(templates, 'eslint.js')
  const eslintContent = fs.readFileSync(eslintPath, 'utf8')

  fs.copyFileSync(prettierPath, '.prettierrc.js')
  fs.writeFileSync(
    '.eslintrc.js',
    eslintContent.replace('{config}', eslintConfig),
    'utf8'
  )
}

async function eslint() {
  const { eslintConfig } = await askESLintConfig()

  await createPackageJson()

  await installDependencies(
    eslintChoices.find((choice) => choice.name === eslintConfig)
  )

  copyFiles(eslintConfig)

  addScripts({
    'howl:lint': "eslint '**/*.js'",
    'howl:lint-fix': "eslint '**/*.js' --fix"
  })
}

export function eslintDoc() {
  console.log(
    `\n\t${actionText(
      'eslint'
    )}\t\t- Load ESLint configuration following Maark's guidelines`
  )
  console.log(`\n\t\t\t  ${dim('e.g. howl eslint')}`)
}

export default eslint
