const debug = require('debug')('midnabot:request')

const request = () => (ctx, next) => {
  const user = ctx.update.message.from.username
  const text = ctx.update.message.text
  const type = ctx.update.message.chat.type
  const chat = ctx.update.message.chat.title

  if (type === 'private') {
    debug(`from "${user}" in "${type}": ${text}`)
  } else {
    debug(`from "${user}" in "${chat}" (${type}): ${text}`)
  }

  return next()
}

module.exports = { request }
