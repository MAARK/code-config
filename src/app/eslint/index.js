import fs from 'fs'
import path from 'path'
import {
  addScripts,
  createPackageJson,
  installDependencies
} from 'src/utils/npm'
import { actionText, dim } from 'src/utils/log-style'
import { askLintChoices, getLintChoices } from 'src/utils/prompts'

function copyFiles(eslintConfig) {
  const templates = path.join(__dirname, '../src/app/eslint/templates')
  const eslintPath = path.join(templates, 'eslint.js')
  const prettierPath = path.join(templates, 'prettier.js')
  const eslintContent = fs.readFileSync(eslintPath, 'utf8')

  fs.copyFileSync(prettierPath, '.prettierrc.js')
  fs.writeFileSync(
    '.eslintrc.js',
    eslintContent.replace('{config}', eslintConfig),
    'utf8'
  )
}

async function eslint() {
  const baseConfigPath = path.join(__dirname, '../configs/eslint')
  const eslintChoices = getLintChoices({ baseConfigPath })
  const { lintChoice } = await askLintChoices(eslintChoices)
  const choice = eslintChoices.find(
    (eslintChoice) => eslintChoice.name === lintChoice
  )

  await createPackageJson()

  await installDependencies(choice.devDependencies)

  copyFiles(lintChoice)

  addScripts({
    'code-config:lint': "eslint '**/*.js'",
    'code-config:lint-fix': "eslint '**/*.js' --fix"
  })
}

export function eslintDoc() {
  console.log(
    `\n\t${actionText(
      'eslint'
    )}\t\t- Load ESLint configuration following Maark's guidelines`
  )
  console.log(`\n\t\t\t  ${dim('e.g. code-config eslint')}`)
}

export default eslint
