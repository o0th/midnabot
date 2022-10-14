require('dotenv').config()

const { Telegraf } = require('telegraf')

const { logs } = require('./modules/logs')
const { spam } = require('./modules/spam')
const { about } = require('./modules/about')

const bot = new Telegraf(process.env.TELEGRAM_TOKEN)

bot.use(logs)
bot.use(spam)

bot.command('about', about)

/** Start bot in development mode (polling) */
const development = () => {
  process.stdout.write('Bot starting in development mode...\n')
  bot.launch()
}

/** Start bot in production mode (webhook) */
const production = () => {
  process.stdout.write('Bot starting in production mode...\n')
  const domain = process.env.SERVICE_URL
  const port = Number(process.env.SERVICE_PORT)
  bot.launch({ webhook: { domain, port } })
}

process.env.NODE_ENV === 'production'
  ? production()
  : development()

/** Graceful stop */
process.once('SIGINT', () => bot.stop('SIGINT'))
process.once('SIGTERM', () => bot.stop('SIGTERM'))
