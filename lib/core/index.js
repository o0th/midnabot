const debug = require('debug')('midnabot:core')
const { Composer } = require('telegraf')

const { Sequelize, sequelize } = require('../modules/sequelize')

const Chats = sequelize.define('starts', {
  id: { type: Sequelize.INTEGER, primaryKey: true },
  isActive: { type: Sequelize.BOOLEAN, defaultValue: false }
})

const core = () => (ctx, next) => {
  const active = (isActive, reply) =>
    Chats.upsert({ id: ctx.update.message.chat.id, isActive })
      .then(() => ctx.response(ctx.reply, reply))
      .catch((error) => {
        debug(error)
        return ctx.response(ctx.reply, `Ooops, something went wrong`)
      })

  ctx.state.core = { active }
  next()
}

const request = () => (ctx, next) => {
  const user = ctx.update.message.from.username
  const text = ctx.update.message.text
  const type = ctx.update.message.chat.type
  const chat = ctx.update.message.chat.title

  debug((type === 'private')
    ? `Request from "${user}" in "${type}": ${text}`
    : `Request from "${user}" in "${chat}" (${type}): ${text}`)

  return next()
}

const response = () => (ctx, next) => {
  ctx.response = (callback, message) => {
    debug(`Response: ${message}`)
    return callback(message)
  }

  return next()
}

const start = () => (ctx) =>
  ctx.state.core.active(true, `Sup`)

const check = () => (ctx, next) =>
  Chats.findOne({ where: { id: ctx.update.message.chat.id } })
    .then((chat) => (chat && chat.dataValues.isActive)
      ? next()
      : debug('not started'))

const stop = () => (ctx) =>
  ctx.state.core.active(false, `Bye`)

module.exports = { core: () => new Composer()
  .use(core(), request(), response())
  .command('start', start())
  .use(check())
  .command('stop', stop())
}
