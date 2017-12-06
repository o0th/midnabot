require('dotenv').config()

const Telegraf = require('telegraf')

const { configs } = require('./lib/configs')
const { sandbox } = require('./lib/sandbox')
const { about } = require('./lib/about')
const { roll } = require('./lib/roll')

const bot = new Telegraf(configs.token, { username: configs.username })

bot.command('sandbox', sandbox())
bot.command('about', about())
bot.command('roll', roll())

const production = () => {
  bot.telegram.setWebhook(configs.webhook)
  bot.startWebhook('/', null, configs.port)
}

const development = () => {
  bot.telegram.deleteWebhook()
  bot.startPolling()
}

(process.env.NODE_ENV === 'production')
  ? production()
  : development()
