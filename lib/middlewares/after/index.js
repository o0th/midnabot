const debug = require('debug')('midnabot:after')

const { Starts } = require('../../models/starts')

const after = () => (ctx, next) => {
  Starts.findOne({ where: { name: ctx.state.starts.name } })
    .then((starts) => (starts.dataValues.start) ? next() : debug('not started'))
}

module.exports = { after }
