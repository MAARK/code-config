const fs = require('fs')
const { ESLint } = require('eslint')
const { getDirectoriesRecursive } = require('./utils/file-system')

const [, , option] = process.argv
const fix = option === '--fix'
const DEFAULT_PATTERNS = '**/*.{js,jsx,ts,tsx}'
const ESLINT_CONFIGS = './configs/eslint'

function getEslintConfig(path) {
  return `./${path}/index.js`
}

async function lint(eslintPath) {
  // 1. Create an instance with the `fix` option.
  const eslint = new ESLint({
    fix,
    cache: false,
    ignore: false,
    overrideConfigFile: getEslintConfig(eslintPath)
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
  const eslintDirs = getDirectoriesRecursive(ESLINT_CONFIGS).filter((path) =>
    fs.existsSync(getEslintConfig(path))
  )
  return Promise.all(eslintDirs.map((eslintPath) => lint(eslintPath)))
}

lintAll().catch((errors) => {
  process.exitCode = 1
  console.error(errors)
})
