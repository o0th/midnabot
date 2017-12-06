const debug = require('debug')('Midna:about')

const { name, version, author, homepage } = require('../../package.json')

const about = () => (ctx) => {
  const username = ctx.update.message.from.username
  const text = ctx.update.message.text
  debug(`${username}: ${text}`)

  return ctx.replyWithMarkdown(`*${name} ${version}*\n${author}\n${homepage}`)
}

module.exports = { about }
