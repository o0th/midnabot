const debug = require('debug')('Midna:js')
const Sandbox = require('sandbox')

const { configs } = require('../configs')

const sandbox = new Sandbox()

const js = () => (ctx) => {
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
        message += `Code ----------------------------------------------`
        message += code
        if (output.result !== 'null') {
          message += `\n\nResult --------------------------------------------\n`
          message += `${output.result}`
        }
        if (output.console.length) {
          message += `\n\nLogs ----------------------------------------------\n`
          output.console.map((logs) => message += `${logs}\n`)
        }
        message += '```'
        ctx.replyWithMarkdown(message)
      })
    }
  })
}

module.exports = { js }
