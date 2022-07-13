const stylelint = require('stylelint')
const { getDirectoriesRecursive } = require('./file-system')

const [, , option] = process.argv
const fix = option === '--fix'

async function lint(stylelintPath) {
  const { output } = await stylelint.lint({
    fix,
    formatter: 'verbose',
    cwd: `${process.cwd()}/${stylelintPath}`,
    files: ['**/*.css', '**/*.scss']
  })

  console.log(output)
}

function lintAll() {
  const stylelintDirs = [
    ...getDirectoriesRecursive('./css')
    // ...getDirectoriesRecursive('./scss')
  ].filter((dir) => dir.includes('stylelint'))

  return Promise.all(stylelintDirs.map((stylelintPath) => lint(stylelintPath)))
}

lintAll().catch((errors) => {
  process.exitCode = 1
  console.error(errors)
})
