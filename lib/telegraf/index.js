const Telegraf = require('telegraf')

const { configs } = require('../configs')
const { sandbox } = require('../sandbox')
const { about } = require('../about')
const { roll } = require('../roll')

const bot = new Telegraf(configs.token, { username: configs.username })

bot.command('sandbox', sandbox())
bot.command('about', about())
bot.command('roll', roll())

module.exports = { telegraf: bot }
