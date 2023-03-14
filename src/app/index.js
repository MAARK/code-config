import { askCoreCommands } from 'src/prompts'
import { actionText } from 'src/utils/log-style'
import eslint from './eslint'
import help from './help'
import stylelint from './stylelint'

const CORE_COMMANDS = [
  {
    name: 'help',
    message: 'ℹ️  Show help screen',
    hint: 'howl help',
    action: help
  },
  {
    name: 'eslint',
    message: '🧹 Create ESLint configuration',
    hint: 'howl eslint',
    action: eslint
  },
  {
    name: 'stylelint',
    message: '🎨 Create Stylelint configuration',
    hint: 'howl stylelint',
    action: stylelint
  }
]

async function init(params) {
  const all = await askCoreCommands(CORE_COMMANDS)
  const { coreCommands } = all
  const command = CORE_COMMANDS.find(({ name }) => coreCommands === name)

  if (command.hint) {
    console.log(`\nNow running ${actionText(command.hint)}\n`)
  }

  await command.action(params)
}

export default {
  eslint,
  stylelint,
  help,
  init
}
