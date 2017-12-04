const Telegraf = require('telegraf')

const { configs } = require('./lib/configs')
const { version, author } = require('./package.json')
const { js } = require('./lib/js')

const bot = new Telegraf(configs.token, { username: 'midnabot' })

bot.command('js', js())

bot.command('version', (ctx) => ctx.replyWithMarkdown(`\`${version}\``))
bot.command('author', (ctx) => ctx.replyWithMarkdown(`\`${author}\``))

bot.startPolling()
