require('dotenv').config()
const { Telegraf } = require('telegraf')

const bot = new Telegraf(process.env.TELEGRAM)

bot.start((ctx) => ctx.reply('Welcome'))

/** Start bot in development mode (polling) */
const development = () => {
  bot.telegram.deleteWebhook()
  bot.startPolling()
}

/** Start bot in production mode (webhook) */
const production = () => {
  bot.telegram.setWebhook(process.env.WEBHOOK)
  bot.startWebhook('/', null, process.env.PORT)
}

process.env.NODE_ENV === 'production'
  ? production()
  : development()

/** Graceful stop */
process.once('SIGINT', () => bot.stop('SIGINT'))
process.once('SIGTERM', () => bot.stop('SIGTERM'))
