import fs from 'fs'
import path from 'path'
import {
  addScripts,
  createPackageJson,
  installDependencies
} from 'src/utils/npm'
import { actionText, dim } from 'src/utils/log-style'
import {
  askLintChoices,
  getLintChoices,
  askHookConfirmation
} from 'src/utils/prompts'
import githook from 'src/app/githook/index'

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

  const { hookChoice } = await askHookConfirmation()

  await createPackageJson()

  await installDependencies(choice.devDependencies)

  copyFiles(lintChoice)

  addScripts({
    'code-config:lint': "eslint '**/*.js'",
    'code-config:lint-fix': "eslint '**/*.js' --fix"
  })

  if (hookChoice) {
    githook(['eslint'])
  }
}

export function eslintDoc() {
  console.log(
    `\n\t${actionText(
      'eslint'
    )}\t\t- Load ESLint configuration following Maark's guidelines`
  )
  console.log(`\n\t\t\t  ${dim('code-config eslint')}`)
}

export const eslintPrompt = {
  name: 'eslint',
  message: '🧹 Create ESLint configuration',
  hint: 'code-config eslint',
  action: eslint
}

export default eslint
