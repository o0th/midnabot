const Roll = require('roll')
const dices = new Roll()

const roll = () => (ctx) => {
  const username = ctx.update.message.from.username
  const message = ctx.update.message.text.replace('/roll ', '')
  return (!dices.validate(message))
    ? ctx.response(ctx.replyWithMarkdown, `@${username}: invalid syntax`)
    : ctx.response(ctx.replyWithMarkdown, `@${username}: ${dices.roll(message).result}`)
}

module.exports = { roll }
