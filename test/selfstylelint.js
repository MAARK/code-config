const fs = require('fs')
const stylelint = require('stylelint')
const { getDirectoriesRecursive } = require('./utils/file-system')

const [, , option] = process.argv
const fix = option === '--fix'
const DEFAULT_PATTERNS = '**/*.{css,scss,sass,less}'
const STYLELINT_CONFIGS = './configs/stylelint'

function getAbsolutePath(path) {
  return `${process.cwd()}/${path}`
}

function getConfigFile(path) {
  return `${getAbsolutePath(path)}/index.js`
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
    (path) => fs.existsSync(getConfigFile(path))
  )
  return Promise.all(stylelintDirs.map((stylelintPath) => lint(stylelintPath)))
}

lintAll().catch((errors) => {
  process.exitCode = 1
  console.error(errors)
})
