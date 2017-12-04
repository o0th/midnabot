const debug = require('debug')('Midna:sandbox')
const Sandbox = require('sandbox')

const sandbox = new Sandbox()

const middleware = () => (ctx) => {
  const username = ctx.update.message.from.username
  const text = ctx.update.message.text
  debug(`${username}: ${text}`)

  const message = ctx.update.message
  message.entities.map((entity) => {
    if (entity.type === 'pre') {
      const code = message.text.substring(entity.offset, entity.offset + entity.length)
      sandbox.run(code, (output) => {
        debug(output)
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
        ctx.replyWithMarkdown(message)
      })
    }
  })
}

module.exports = { sandbox: middleware }
