import { prompt } from 'enquirer'
import { actionText } from 'src/utils/log-style'
import eslint from 'src/app/eslint'
import help from 'src/app/help'
import stylelint from 'src/app/stylelint'

const CORE_COMMANDS = [
  {
    name: 'help',
    message: 'ℹ️  Show help screen',
    hint: 'code-config help',
    action: help
  },
  {
    name: 'eslint',
    message: '🧹 Create ESLint configuration',
    hint: 'code-config eslint',
    action: eslint
  },
  {
    name: 'stylelint',
    message: '🎨 Create Stylelint configuration',
    hint: 'code-config stylelint',
    action: stylelint
  }
]

function askCoreCommands() {
  console.log()
  return prompt([
    {
      type: 'autocomplete',
      name: 'coreCommands',
      message: 'What do you want to do?',
      choices: [...CORE_COMMANDS]
    }
  ])
}

async function init(params) {
  const all = await askCoreCommands()
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
