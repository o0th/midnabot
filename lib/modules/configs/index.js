const configs = require('./configs.json')

module.exports = { configs: (process.env.NODE_ENV === 'production')
  ? configs.production
  : configs.development
}
