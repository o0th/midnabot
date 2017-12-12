const debug = require('debug')('midnabot:response')

const response = () => (ctx, next) => {
  ctx.response = (callback, message) => {
    debug(message)
    return callback(message)
  }

  next()
}

module.exports = { response }
