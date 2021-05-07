require('dotenv').config()
const { Telegraf } = require('telegraf')

const bot = new Telegraf(process.env.TELEGRAM)

bot.start((ctx) => ctx.reply('Welcome'))

/** Start bot in development mode (polling) */
const development = () => {
  process.stdout.write('Bot starting in development mode...\n')
  bot.telegram.deleteWebhook()
  bot.startPolling()
}

/** Start bot in production mode (webhook) */
const production = () => {
  process.stdout.write('Bot starting in production mode...\n')
  process.stdout.write(`Webhook: ${process.env.PUBLIC_URL}\n`)
  process.stdout.write(`Port: ${process.env.PORT}\n`)
  bot.launch({
    webhook: {
      domain: process.env.PUBLIC_URL,
      port: process.env.PORT
    }
  })
}

process.env.NODE_ENV === 'production'
  ? production()
  : development()

/** Graceful stop */
process.once('SIGINT', () => bot.stop('SIGINT'))
process.once('SIGTERM', () => bot.stop('SIGTERM'))
