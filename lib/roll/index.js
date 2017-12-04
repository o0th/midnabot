const debug = require('debug')('Midna:roll')

const Roll = require('roll')
const dices = new Roll()

const roll = () => (ctx) => {
  const username = ctx.update.message.from.username
  const text = ctx.update.message.text
  debug(`${username}: ${text}`)

  const message = ctx.update.message.text.replace('/roll ', '')
  const validation = dices.validate(message)
  if (!validation) {
    return ctx.replyWithMarkdown(`@${username}: invalid roll`)
  }
  return ctx.replyWithMarkdown(`@${username}: ${dices.roll(message).result}`)
}

module.exports = { roll }
