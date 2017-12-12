const debug = require('debug')('midnabot:starts')

const { Starts } = require('../../models/starts')

const starts = () => (ctx, next) => {
  const name = (ctx.update.message.chat.type === 'private')
    ? ctx.update.message.from.username
    : ctx.update.message.chat.title
  const start = (value, reply) => {
    Starts.upsert({ name, start: value })
      .then(() => ctx.response(ctx.reply, reply))
      .catch((error) => {
        debug(error)
        return ctx.response(ctx.reply, `Ooops, something went wrong`)
      })
  }

  ctx.state.starts = { start, name }
  next()
}

module.exports = { starts }
