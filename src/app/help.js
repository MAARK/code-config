import { actionText, dim } from 'src/utils/log-style'
import { eslintDoc } from './eslint'
import { stylelintDoc } from './stylelint'

function header() {
  console.log(`\n           .${actionText('\tHowl-CLI')}`)
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
  console.log('\thowl [command] [...parameters]')
}

function help() {
  header()
  synopsis()

  console.log('\nAvailable commands:')

  // Help
  console.log(`\n\t${actionText('help')}\t\t- Show this help screen`)
  console.log(`\n\t\t\t  ${dim('howl help')}`)

  eslintDoc()
  stylelintDoc()

  console.log()
}

export default help
