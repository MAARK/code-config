import { spawn } from 'child_process'
import { runCommand } from './npm'

jest.mock('child_process', () => ({
  spawn: jest.fn(() => ({
    on: jest.fn(),
    stderr: {
      on: jest.fn(),
    },
  })),
}))

describe('Testing npm utility file', () => {
  it('Should run command', () => {
    const promise = runCommand({ command: 'echo test' })

    expect(promise).toBeInstanceOf(Promise)
    expect(spawn).toHaveBeenCalledWith('echo test', {
      shell: true,
      stdio: [0, 1, 2],
    })
  })

  it('Should run command with path', () => {
    runCommand({ command: 'echo test', path: 'path-to-test' })

    expect(spawn).toHaveBeenCalledWith('cd path-to-test && echo test', {
      shell: true,
      stdio: [0, 1, 2],
    })
  })

  it('Should run command silently', () => {
    runCommand({ command: 'echo test', silent: true })

    expect(spawn).toHaveBeenCalledWith('echo test', {
      shell: true,
      stdio: null,
    })
  })

  it('Should run command and pipeline error', () => {
    runCommand({ command: 'echo test', pipeError: true })

    expect(spawn).toHaveBeenCalledWith('echo test', {
      shell: true,
      stdio: [0, 1, 'pipe'],
    })
  })
})
