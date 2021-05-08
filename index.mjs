import dotenv from 'dotenv'

import { Telegraf } from 'telegraf'
import { requests } from './modules/requests/index.mjs'
import { about } from './modules/about/index.mjs'
import { crypto } from './modules/crypto/index.mjs'

dotenv.config()

const bot = new Telegraf(process.env.TELEGRAM)

bot.use(requests)
bot.command('about', about)
bot.command('crypto', crypto)

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
