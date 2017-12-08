const debug = require('debug')('midnabot:response')

const response = () => (callback, message) => {
  debug(message)
  return callback(message)
}

module.exports = { response }
