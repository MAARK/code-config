const fs = require('fs')
const path = require('path')
const stylelint = require('stylelint')
const { getDirectoriesRecursive } = require('./utils/file-system')

const [, , option] = process.argv
const fix = option === '--fix'
const DEFAULT_PATTERNS = '**/*.{css,scss,sass,less}'
const STYLELINT_CONFIGS = path.join('.', 'configs', 'stylelint')

function getAbsolutePath(stylelintPath) {
  return path.join(process.cwd(), stylelintPath)
}

function getConfigFile(stylelintPath) {
  return path.join(getAbsolutePath(stylelintPath), 'index.js')
}

async function lint(stylelintPath) {
  const { output } = await stylelint.lint({
    fix,
    formatter: 'string',
    configFile: getConfigFile(stylelintPath),
    cwd: getAbsolutePath(stylelintPath),
    files: [DEFAULT_PATTERNS]
  })

  console.log(output)
}

function lintAll() {
  const stylelintDirs = getDirectoriesRecursive(STYLELINT_CONFIGS).filter(
    (stylelintPath) => fs.existsSync(getConfigFile(stylelintPath))
  )
  return Promise.all(stylelintDirs.map((stylelintPath) => lint(stylelintPath)))
}

lintAll().catch((errors) => {
  process.exitCode = 1
  console.error(errors)
})
