import { prompt } from 'enquirer'
import { actionText } from 'src/utils/log-style'
import help, { helpPrompt } from 'src/app/help'
import eslint, { eslintPrompt } from 'src/app/eslint'
import stylelint, { stylelintPrompt } from 'src/app/stylelint'

const CORE_COMMANDS = [helpPrompt, eslintPrompt, stylelintPrompt]

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
