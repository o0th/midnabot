require('dotenv').config()

const { telegraf } = require('./lib/telegraf')
const { configs } = require('./lib/configs')

const production = () => {
  telegraf.telegram.setWebhook(configs.webhook)
  telegraf.startWebhook('/', null, configs.port)
}

const development = () => {
  telegraf.telegram.deleteWebhook()
  telegraf.startPolling()
}

(process.env.NODE_ENV === 'production')
  ? production()
  : development()
