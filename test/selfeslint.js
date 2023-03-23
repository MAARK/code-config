const fs = require('fs')
const path = require('path')
const { ESLint } = require('eslint')
const { getDirectoriesRecursive } = require('./utils/file-system')

const [, , option] = process.argv
const fix = option === '--fix'
const DEFAULT_PATTERNS = '**/*.{js,jsx,ts,tsx}'
const ESLINT_CONFIGS = path.join('.', 'configs', 'eslint')

function getEslintConfig(eslintPath) {
  return path.join('.', eslintPath, 'index.js')
}

function getEslintMock(eslintPath) {
  const infoPath = path.join('.', eslintPath, 'info.json')

  if (!fs.existsSync(infoPath)) return {}

  const json = fs.readFileSync(infoPath, 'utf8')

  return JSON.parse(json).mockConfig || {}
}

async function lint(eslintPath) {
  // 1. Create an instance with the `fix` option.
  const eslint = new ESLint({
    fix,
    cache: false,
    ignore: false,
    overrideConfigFile: getEslintConfig(eslintPath),
    overrideConfig: getEslintMock(eslintPath)
  })

  // 2. Lint files. This doesn't modify target files.
  const results = await eslint.lintFiles([
    `./${eslintPath}/${DEFAULT_PATTERNS}`
  ])

  // 3. Modify the files with the fixed code.
  if (fix === true) {
    await ESLint.outputFixes(results)
  }

  // 4. Format the results.
  const formatter = await eslint.loadFormatter('stylish')
  const resultText = formatter.format(results)

  // 5. Output it.
  if (resultText) {
    console.log(resultText)
  }
}

function lintAll() {
  const eslintDirs = getDirectoriesRecursive(ESLINT_CONFIGS).filter(
    (eslintPath) => fs.existsSync(getEslintConfig(eslintPath))
  )
  return Promise.all(eslintDirs.map((eslintPath) => lint(eslintPath)))
}

lintAll().catch((errors) => {
  process.exitCode = 1
  console.error(errors)
})
