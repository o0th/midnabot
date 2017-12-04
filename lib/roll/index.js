const debug = require('debug')('Midna:roll')

const Roll = require('roll')
const dices = new Roll()

const roll = () => (ctx) => {
  const username = ctx.update.message.from.username
  const text = ctx.update.message.text
  debug(`${username}: ${text}`)

  const message = text.replace('/roll ', '')
  return (!dices.validate(message))
    ? ctx.replyWithMarkdown(`@${username}: invalid syntax`)
    : ctx.replyWithMarkdown(`@${username}: ${dices.roll(message).result}`)
}

module.exports = { roll }
