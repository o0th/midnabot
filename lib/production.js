require('dotenv').load()

const { application } = require('./koa')
const { configs } = require('./configs')

application.listen(configs.port)
