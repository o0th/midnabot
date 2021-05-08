const info = require('../../package.json')

const about = (ctx) => {
  const about = `*Midnabot* v${info.version}\n` +
    `${info.homepage}`
  ctx.replyWithMarkdown(about)
}

module.exports = { about }
