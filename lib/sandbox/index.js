const Sandbox = require('sandbox')

const sandbox = new Sandbox()

const middleware = () => (ctx) => {
  const username = ctx.update.message.from.username
  const message = ctx.update.message
  message.entities.map((pre) => {
    if (pre.type === 'pre') {
      const code = message.text.substring(pre.offset, pre.offset + pre.length)
      sandbox.run(code, (output) => {
        let message = `@${username}\n\n` + '```\n'
        message += `[ Code ]\n`
        message += code
        if (output.result !== 'null') {
          message += `\n\n[ Result ]\n`
          message += `${output.result}`
        }
        if (output.console.length) {
          message += `\n\n[ Logs ]\n`
          output.console.map((logs) => { message += `${logs}\n` })
        }
        message += '```'
        ctx.response(ctx.replyWithMarkdown, message)
      })
    }
  })
}

module.exports = { sandbox: middleware }
