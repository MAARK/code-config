import { actionText } from 'src/utils/log-style'
import help, { helpPrompt } from 'src/app/help'
import eslint, { eslintPrompt } from 'src/app/eslint'
import stylelint, { stylelintPrompt } from 'src/app/stylelint'
import githook, { githookPrompt } from 'src/app/githook'
import gobravely from 'src/app/gobravely'
import { askCoreCommands } from 'src/utils/prompts'

const CORE_COMMANDS = [helpPrompt, eslintPrompt, stylelintPrompt, githookPrompt]

async function init(params) {
  const { coreCommands } = await askCoreCommands(CORE_COMMANDS)
  const command = CORE_COMMANDS.find(({ name }) => coreCommands === name)

  if (command.hint) {
    console.log(`\nNow running ${actionText(command.hint)}\n`)
  }

  await command.action(params)
}

export default {
  eslint,
  stylelint,
  githook,
  help,
  gobravely,
  init
}
