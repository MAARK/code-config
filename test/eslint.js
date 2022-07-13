const { ESLint } = require('eslint')
const { getDirectoriesRecursive } = require('./file-system')

const [, , option] = process.argv
const fix = option === '--fix'
const defaultPattern = '**/*.js'

async function lint(eslintPath) {
  const override = {
    overrideConfigFile: `./${eslintPath}/index.js`,
    ignore: false
  }
  const patterns = eslintPath
    ? [`./${eslintPath}/${defaultPattern}`]
    : defaultPattern

  // 1. Create an instance with the `fix` option.
  const eslint = new ESLint({
    fix,
    cache: false,
    ...(eslintPath ? override : {})
  })

  // 2. Lint files. This doesn't modify target files.
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
