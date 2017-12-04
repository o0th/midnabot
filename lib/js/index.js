const debug = require('debug')('Midna:js')
const Sandbox = require('sandbox')

const { configs } = require('../configs')

const sandbox = new Sandbox()

const js = () => (ctx) => {
  const username = ctx.update.message.from.username
  const text = ctx.update.message.text
  const message = ctx.update.message
  debug(`${username}: ${text}`)

  message.entities.map((entity) => {
    if (entity.type === 'code' || entity.type === 'pre') {
      const code = message.text.substring(entity.offset, entity.offset + entity.length)
      sandbox.run(code, (output) => {
        let message = `@${username}:\n`
        message += '```\n'
        output.console.map((cons) => message += `${cons}\n`)
        message += '```'
        ctx.replyWithMarkdown(message)
        if (output.result !== 'null') {
          ctx.replyWithMarkdown(`\`${output.result}\``)
        }
      })
    }
  })
}

module.exports = { js }
