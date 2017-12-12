const debug = require('debug')('midnabot:after')

const { Starts } = require('../../models/starts')

const after = () => (ctx, next) => {
  const name = (ctx.update.message.chat.type === 'private')
    ? ctx.update.message.from.username
    : ctx.update.message.chat.title
  Starts.findOne({ where: { name } })
    .then((starts) => (starts.dataValues.start) ? next() : debug('not started'))
}

module.exports = { after }
