import fs from 'fs'
import { spawn } from 'child_process'
import { dim } from './log-style'
import { readJsonFile, writeJsonFile, readFile } from './file-system'

export function runCommand({ command, path, silent, pipeError }) {
  return new Promise((resolve) => {
    const endCommand = path ? `cd ${path} && ${command}` : command

    if (!silent) {
      console.log(`\n💬 Executing: ${dim(endCommand)}\n`)
    }

    const p = spawn(endCommand, {
      shell: true,
      stdio: silent ? null : [0, 1, pipeError ? 'pipe' : 2],
    })

    let errorOutput = ''

    if (pipeError) {
      p.stderr.on('data', (data) => {
        errorOutput += data.toString()
      })
    }

    p.on('close', () => {
      resolve(errorOutput)
    })
  })
}

export async function createPackageJson() {
  if (!fs.existsSync('package.json')) {
    await runCommand({
      command: 'npm init -y',
    })
  }
}

export function checkCodeConfigScripts(scripts = 'code-config:') {
  const fileContent = readFile({ filepath: 'package.json' })

  return fileContent.includes(scripts)
}

export function addScripts(scripts) {
  const packageJson = readJsonFile({ filepath: 'package.json' })

  packageJson.scripts = {
    ...packageJson.scripts,
    ...scripts,
  }

  writeJsonFile({ filepath: 'package.json', data: packageJson })
}

export async function installDependencies(dependencies) {
  const allDependencies = [
    ['@maarkllc/code-config', 'latest'],
    ...Object.entries(dependencies),
  ]
  const parsedDependencies = allDependencies
    .map(([name, version]) => `${name}@${version}`)
    .join(' ')

  await runCommand({
    command: `npm i --save-dev ${parsedDependencies}`,
  })
}
