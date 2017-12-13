const debug = require('debug')('midnabot:engine')
const { Composer } = require('telegraf')

const { Sequelize, sequelize } = require('../modules/sequelize')

const Starts = sequelize.define('starts', {
  name: { type: Sequelize.STRING, allowNull: false, unique: true },
  start: { type: Sequelize.BOOLEAN, defaultValue: false }
})

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
  ctx.state.starts.start(true, `Sup`)

const check = () => (ctx, next) =>
  Starts.findOne({ where: { name: ctx.state.starts.name } })
    .then((starts) => (starts.dataValues.start) ? next() : debug('not started'))

const stop = () => (ctx) =>
  ctx.state.starts.start(false, `Bye`)

const engine = () => new Composer()
  .use(starts(), request(), response())
  .command('start', start())
  .use(check())
  .command('stop', stop())

module.exports = { engine }
