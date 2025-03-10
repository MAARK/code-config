import fs from 'fs'
import path from 'path'
import stylelint from 'stylelint'
import { getDirectoriesRecursive } from './utils/file-system.mjs'

const [, , option] = process.argv
const fix = option === '--fix'
const DEFAULT_PATTERNS = '**/*.{css,scss,sass,less}'
const STYLELINT_CONFIGS = path.join('.', 'configs', 'stylelint')

function getAbsolutePath(stylelintPath) {
  return path.join(process.cwd(), stylelintPath)
}

function getConfigFile(stylelintPath) {
  return path.join(getAbsolutePath(stylelintPath), 'index.cjs')
}

async function lint(stylelintPath) {
  const { report } = await stylelint.lint({
    fix,
    formatter: 'string',
    configFile: getConfigFile(stylelintPath),
    cwd: getAbsolutePath(stylelintPath),
    files: [DEFAULT_PATTERNS],
  })

  if (report) {
    console.log(report)
  }
}

function lintAll() {
  const stylelintDirs = getDirectoriesRecursive(STYLELINT_CONFIGS).filter(
    (stylelintPath) => fs.existsSync(getConfigFile(stylelintPath)),
  )
  return Promise.all(stylelintDirs.map((stylelintPath) => lint(stylelintPath)))
}

lintAll().catch((errors) => {
  process.exitCode = 1
  console.error(errors)
})
