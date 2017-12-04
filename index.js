const Telegraf = require('telegraf')

const { js } = require('./lib/js')
const { roll } = require('./lib/roll')

const { configs } = require('./lib/configs')
const { version, author } = require('./package.json')

const bot = new Telegraf(configs.token, { username: configs.username })

bot.command('js', js())
bot.command('roll', roll())

bot.command('version', (ctx) => ctx.replyWithMarkdown(`\`${version}\``))
bot.command('author', (ctx) => ctx.replyWithMarkdown(`\`${author}\``))

bot.startPolling()
