require('dotenv').load()

const { koa } = require('./koa')
const { configs } = require('./configs')

koa.listen(configs.port)
