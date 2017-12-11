require('dotenv').config()
const debug = require('debug')('midnabot')

const Telegraf = require('telegraf')

const { sequelize } = require('./lib/sequelize')
const { configs } = require('./lib/configs')
const { request } = require('./lib/request')
const { response } = require('./lib/response')
const { start } = require('./lib/start')
const { after } = require('./lib/after')
const { sandbox } = require('./lib/sandbox')
const { roll } = require('./lib/roll')
const { about } = require('./lib/about')
const { stop } = require('./lib/stop')

const bot = new Telegraf(configs.token, { username: configs.username })
sequelize.sync().then(() => debug(`sQlite connected`))

bot.use(request())
bot.use(response())
bot.command('start', start())
bot.use(after())
bot.command('sandbox', sandbox())
bot.command('roll', roll())
bot.command('about', about())
bot.command('stop', stop())

const production = () => {
  debug(`${configs.username} setting webhook: ${configs.webhook}`)
  bot.telegram.setWebhook(configs.webhook)
  debug(`${configs.username} starting webhook on port: ${configs.port}`)
  bot.startWebhook('/', null, configs.port)
}

const development = () => {
  debug(`${configs.username} deliting webhook`)
  bot.telegram.deleteWebhook()
  debug(`${configs.username} starting polling`)
  bot.startPolling()
}

(process.env.NODE_ENV === 'production')
  ? production()
  : development()
