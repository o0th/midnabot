const { name, version, author, homepage } = require('../../package.json')

const about = () => (ctx) => {
  const message = `*${name} ${version}*\n${author}\n${homepage}`
  return ctx.response(ctx.replyWithMarkdown, message)
}

module.exports = { about }
