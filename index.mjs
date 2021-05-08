import dotenv from 'dotenv'
import axios from 'axios'

import { Telegraf } from 'telegraf'
import { crypto } from './modules/crypto/index.mjs'

dotenv.config()
const pairs = await crypto.pairs()

const bot = new Telegraf(process.env.TELEGRAM)

bot.start((ctx) => ctx.reply('Welcome'))
bot.command('crypto', async (ctx) => {
  /** Assets pairs: https://api.kraken.com/0/public/AssetPairs */
  const message = ctx.message.text
  const pair = message.match(/\/crypto ([A-Za-z]+)/)[1].toUpperCase()
	if (pairs.includes(pair)) {
    const response = await axios.get(`https://api.kraken.com/0/public/Ticker?pair=${pair}`)
    const price = response.data.result[pair].a[0]
    const open = response.data.result[pair].o
    const perc = (price - open) / open * 100
    ctx.reply(`${pair}: ${price} (${(perc >= 0 ? '+' : '')}${perc.toFixed(2)}%)`)
  } else {
    ctx.reply('Pair not found')
  }
})

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
