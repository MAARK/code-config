const { ESLint } = require('eslint')
const { getDirectoriesRecursive } = require('./utils/file-system')

const [, , option] = process.argv
const fix = option === '--fix'
const defaultPattern = '**/*.{js,jsx,ts,tsx}'

function getOptions(eslintPath) {
  const override = {
    overrideConfigFile: `./${eslintPath}/index.js`,
    ignore: false
  }

  return {
    fix,
    cache: false,
    ...(eslintPath ? override : {})
  }
}

async function lint(eslintPath) {
  // 1. Create an instance with the `fix` option.
  const eslint = new ESLint(getOptions(eslintPath))

  // 2. Lint files. This doesn't modify target files.
  const patterns = eslintPath
    ? [`./${eslintPath}/${defaultPattern}`]
    : [defaultPattern]
  const results = await eslint.lintFiles(patterns)

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
  const eslintDirs = [
    ...getDirectoriesRecursive('./js')
    // ...getDirectoriesRecursive('./ts')
  ].filter((dir) => dir.includes('eslint'))

  return Promise.all([
    lint(),
    ...eslintDirs.map((eslintPath) => lint(eslintPath))
  ])
}

lintAll().catch((errors) => {
  process.exitCode = 1
  console.error(errors)
})
