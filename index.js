require('dotenv').config()
const debug = require('debug')('midnabot')

const Telegraf = require('telegraf')

const { configs } = require('./lib/configs')
const { request } = require('./lib/request')
const { response } = require('./lib/response')
const { sandbox } = require('./lib/sandbox')
const { about } = require('./lib/about')
const { roll } = require('./lib/roll')

const bot = new Telegraf(configs.token, { username: configs.username })

bot.use(request())
bot.context.response = response()
bot.command('sandbox', sandbox())
bot.command('about', about())
bot.command('roll', roll())

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
