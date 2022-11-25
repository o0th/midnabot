require('dotenv').config()

const { midnabot } = require('./bots/midnabot')

/** Start bots in development mode (polling) */
const development = () => {
  process.stdout.write('Bots starting in development mode...\n')
  midnabot.launch()
}

/** Start bots in production mode (webhook) */
const production = async () => {
  const app = require('express')()

  const domain = process.env.SERVICE_URL
  const port = Number(process.env.SERVICE_PORT)

  app.use(await midnabot.createWebhook({ domain }))
  app.get('/', (req, res) => res.send('OK'))

  app.listen(port, () => {
    process.stdout.write('Bots starting in production mode...\n')
  })
}

process.env.NODE_ENV === 'production'
  ? (async () => await production())()
  : development()

/** Graceful stop */
process.once('SIGINT', () => {
  midnabot.stop('SIGINT')
})

process.once('SIGTERM', () => {
  midnabot.stop('SIGTERM')
})
