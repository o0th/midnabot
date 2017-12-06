const Koa = require('koa')
const body = require('koa-body')

const { configs } = require('../configs')
const { telegraf } = require('../telegraf')

const application = new Koa()

telegraf.telegram.setWebhook(configs.webhook)
application.use(body())
application.use((ctx, next) => {
  return (ctx.method === 'POST' || ctx.url === configs.path)
    ? telegraf.handleUpdate(ctx.request.body, ctx.response)
    : next()
})

module.exports = { koa: application }
