const { Telegraf } = require('telegraf')

const { logs } = require('../modules/logs')
const { spam } = require('../modules/spam')
const { version, homepage } = require('../package.json')

const midnabot = new Telegraf(process.env.TELEGRAM_TOKEN)

midnabot.use(logs('midnabot'))
midnabot.use(spam)

midnabot.command('about', (ctx) => {
  const about = `*Midnabot* v${version}\n` + `${homepage}`
  ctx.replyWithMarkdown(about)
})

module.exports = { midnabot }
