require('dotenv').config()

const Koa = require('koa')
const Router = require('@koa/router')
const koaBody = require('koa-body')

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
  const app = new Koa()
  const router = new Router()

  const domain = process.env.SERVICE_URL
  const port = Number(process.env.SERVICE_PORT)

  router.get('/', (ctx, next) => (ctx.status = 200))

  app.use(koaBody())
  app.use(router.routes())
  app.use(router.allowedMethods())
  app.use(async (ctx, next) => (await bot.createWebhook({ domain }))(ctx.req, ctx.res, next))
  app.listen(port)
}

process.env.NODE_ENV === 'production'
  ? production()
  : development()

/** Graceful stop */
process.once('SIGINT', () => bot.stop('SIGINT'))
process.once('SIGTERM', () => bot.stop('SIGTERM'))
