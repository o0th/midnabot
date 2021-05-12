require('dotenv').config()

const { Telegraf } = require('telegraf')

const { logs } = require('./modules/logs')
const { spam } = require('./modules/spam')
const { about } = require('./modules/about')
const { crypto } = require('./modules/crypto')
const { midnacoin } = require('./modules/midnacoin')

const bot = new Telegraf(process.env.TELEGRAM)

bot.use(logs)
bot.use(spam)
bot.command('about', about)
bot.command('crypto', crypto)
bot.command('midnacoin', midnacoin)

/** Start bot in development mode (polling) */
const development = () => {
  process.stdout.write('Bot starting in development mode...\n')
  bot.launch()
}

/** Start bot in production mode (webhook) */
const production = () => {
  process.stdout.write('Bot starting in production mode...\n')
  const domain = process.env.PUBLIC_URL
  const port = process.env.PORT
  bot.launch({ webhook: { domain, port } })
}

process.env.NODE_ENV === 'production'
  ? production()
  : development()

/** Graceful stop */
process.once('SIGINT', () => bot.stop('SIGINT'))
process.once('SIGTERM', () => bot.stop('SIGTERM'))
