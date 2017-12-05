const Telegraf = require('telegraf')

const { sandbox } = require('./lib/sandbox')
const { roll } = require('./lib/roll')

const { configs } = require('./lib/configs')
const { name, version, author, homepage } = require('./package.json')

const bot = new Telegraf(configs.token, { username: configs.username })

bot.command('sandbox', sandbox())
bot.command('roll', roll())

bot.command('about', (ctx) => {
  return ctx.replyWithMarkdown(`*${name} v.${version}*\n${author}\n${homepage}`)
})

bot.startPolling()
