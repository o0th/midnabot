const debug = require('debug')('midnabot:stop')

const { Starts } = require('../starts')

const stop = () => (ctx) => {
  const name = (ctx.update.message.chat.type === 'private')
    ? ctx.update.message.from.username
    : ctx.update.message.chat.title

  const reply = (ctx.update.message.chat.type === 'private')
    ? `midnabot is not listening in this chat`
    : `midnabot is not listening in this channel`

  Starts.upsert({ name, start: false })
    .then(() => ctx.response(ctx.reply, reply))
    .catch((error) => {
      debug(error)
      return ctx.response(ctx.reply, `Ooops, something went wrong`)
    })
}

module.exports = { stop }
