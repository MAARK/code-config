import fs from 'fs'
import path from 'path'
import { actionText, dim } from 'src/utils/log-style'
import {
  addScripts,
  createPackageJson,
  installDependencies
} from 'src/utils/npm'
import {
  askLintChoices,
  getLintChoices,
  askHookConfirmation
} from 'src/utils/prompts'
import githook from 'src/app/githook/index'

function copyFiles(eslintConfig) {
  const templates = path.join(__dirname, '../src/app/stylelint/templates')
  const stylelintPath = path.join(templates, 'stylelint.js')
  const stylelintContent = fs.readFileSync(stylelintPath, 'utf8')

  fs.writeFileSync(
    '.stylelintrc.js',
    stylelintContent.replace('{config}', eslintConfig),
    'utf8'
  )
}

async function stylelint() {
  const baseConfigPath = path.join(__dirname, '../configs/stylelint')
  const stylelintChoices = getLintChoices({ baseConfigPath })
  const { lintChoice } = await askLintChoices(stylelintChoices)
  const choice = stylelintChoices.find(
    (stylelintChoice) => stylelintChoice.name === lintChoice
  )
  const { hookChoice } = await askHookConfirmation()

  await createPackageJson()

  await installDependencies(choice.devDependencies)

  copyFiles(lintChoice)

  addScripts({
    'code-config:stylelint': "stylelint '**/*.{css,scss}'",
    'code-config:stylelint-fix': "stylelint '**/*.{css,scss}' --fix"
  })

  if (hookChoice) {
    githook(['stylelint'])
  }
}

export function stylelintDoc() {
  console.log(
    `\n\t${actionText(
      'stylelint'
    )}\t- Load Stylelint configuration following Maark's guidelines`
  )
  console.log(`\n\t\t\t  ${dim('code-config stylelint')}`)
}

export const stylelintPrompt = {
  name: 'stylelint',
  message: '🎨 Create Stylelint configuration',
  hint: 'code-config stylelint',
  action: stylelint
}

export default stylelint
