require('dotenv').config()

const { Telegraf } = require('telegraf')
const Koa = require('koa')

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
  const domain = process.env.SERVICE_URL
  const port = Number(process.env.SERVICE_PORT)
  const app = new Koa()
  app.use(async (ctx, next) => (await bot.createWebhook({ domain }))(ctx.req, ctx.res, next))
  app.use(ctx => { ctx.body = 'Hello' })
  app.listen(port, () => process.stdout.write('Bot starting in production mode...\n'))
}

process.env.NODE_ENV === 'production'
  ? production()
  : development()

/** Graceful stop */
process.once('SIGINT', () => bot.stop('SIGINT'))
process.once('SIGTERM', () => bot.stop('SIGTERM'))
