const logs = (ctx, next) => {
  if (ctx.update.message) {
    const user = ctx.update.message.from.username
    const text = ctx.update.message.text
    const type = ctx.update.message.chat.type
    const chat = ctx.update.message.chat.title
    const log = (type === 'private')
      ? `Request from "${user}" in ${type}: ${text}\n`
      : `Request from "${user}" in ${type} "${chat}": ${text}\n`
    process.stdout.write(log)
  }

  return next()
}

module.exports = { logs }
