import fs from 'fs'
import path from 'path'
import { actionText, dim } from 'src/utils/log-style'

function copyFiles() {
  const templates = path.join(__dirname, '../src/app/githook/templates')
  const hookPath = path.join(templates, 'pre-push')

  fs.copyFileSync(hookPath, '.git/hooks/pre-push')
}

async function githook() {
  copyFiles()
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
