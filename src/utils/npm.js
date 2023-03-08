import fs from 'fs'
import { spawn } from 'child_process'
import { dim } from './log-style'
import { readJsonFile, writeJsonFile } from './file-system'

export function runCommand({ command, path, silent, pipeError }) {
  return new Promise((resolve) => {
    const endCommand = path ? `cd ${path} && ${command}` : command

    if (!silent) {
      console.log(`\n💬 Executing: ${dim(endCommand)}\n`)
    }

    const p = spawn(endCommand, {
      shell: true,
      stdio: silent ? null : [0, 1, pipeError ? 'pipe' : 2]
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
      command: 'npm init -y'
    })
  }
}

export function addScripts(scripts) {
  const packageJson = readJsonFile({ filepath: 'package.json' })

  packageJson.scripts = {
    ...packageJson.scripts,
    ...scripts
  }

  writeJsonFile({ filepath: 'package.json', data: packageJson })
}
