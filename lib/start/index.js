const debug = require('debug')('midnabot:start')

const { Starts } = require('../starts')

const start = () => (ctx) => {
  const name = (ctx.update.message.chat.type === 'private')
    ? ctx.update.message.from.username
    : ctx.update.message.chat.title

  const reply = (ctx.update.message.chat.type === 'private')
    ? `midnabot is now listening in this chat`
    : `midnabot is now listening in this channel`

  Starts.upsert({ name, start: true })
    .then(() => ctx.response(ctx.reply, reply))
    .catch((error) => {
      debug(error)
      return ctx.response(ctx.reply, `Ooops, something went wrong`)
    })
}

module.exports = { start }
