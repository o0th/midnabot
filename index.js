require('dotenv').config()
const debug = require('debug')('midnabot')

const Telegraf = require('telegraf')

const { core } = require('./lib/core')
const { configs, sequelize } = require('./lib/modules')
const { sandbox, roll, about } = require('./lib/commands')

const bot = new Telegraf(configs.token, { username: configs.username })
sequelize.sync({ force: true }).then(() => debug(`Database connected`))

bot
  .use(core())
  .command('sandbox', sandbox())
  .command('roll', roll())
  .command('about', about())

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
