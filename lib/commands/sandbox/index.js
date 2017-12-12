const Sandbox = require('sandbox')

const sandbox = new Sandbox()

const middleware = () => (ctx) => {
  const message = ctx.update.message
  const username = ctx.update.message.from.username
  const entities = ctx.update.message.entities

  if (entities.length !== 2 || entities[1].type !== 'pre') {
    const reply = `@${username}: invalid syntax\n` +
      'Usage: /sandbox ```your code```'
    return ctx.response(ctx.reply, reply)
  }

  const code = message.text
    .substring(entities[1].offset, entities[1].offset + entities[1].length)

  sandbox.run(code, (output) => {
    let message = `@${username} your code:\n` + '```\n' + code + '\n```\n'

    if (output.console.length) {
      message += '*Output logs*:\n```\n'
      output.console.map((logs) => { message += `${logs}\n` })
      message += '```\n'
    }

    if (output.result !== 'null') {
      message += '*Output result:* `' + output.result + '`'
    }

    ctx.response(ctx.replyWithMarkdown, message)
  })
}

module.exports = { sandbox: middleware }
