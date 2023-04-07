import { actionText, dim } from 'src/utils/log-style'
import { eslintDoc } from 'src/app/eslint'
import { stylelintDoc } from 'src/app/stylelint'
import { githookDoc } from 'src/app/githook'

function header() {
  console.log(`\n           .${actionText('\tCode-config CLI')}`)
  console.log('          / V\\')
  console.log('        / `  /')
  console.log('       <<   |\tCommand-line tools to setup and manage')
  console.log('       /    |\tproject configurations.')
  console.log('     /      |')
  console.log('   /        |\tGo Bravely')
  console.log(' /    \\  \\ /')
  console.log('(      ) | |')
  console.log('|   _/_  | |')
  console.log('_\\______)\\__)\n')
}

function synopsis() {
  console.log('\nSynopsis:\n')
  console.log('\tcode-config [command]')
}

function helpDoc() {
  console.log(`\n\t${actionText('help')}\t\t- Show this help screen`)
  console.log(`\n\t\t\t  ${dim('code-config help')}`)
}

function help() {
  header()
  synopsis()

  console.log('\nAvailable commands:')

  helpDoc()
  eslintDoc()
  stylelintDoc()
  githookDoc()

  console.log()
}

export const helpPrompt = {
  name: 'help',
  message: 'ℹ️  Show help screen',
  hint: 'code-config help',
  action: help
}

export default help
