require('dotenv').load()

const { telegraf } = require('./telegraf')

telegraf.startPolling()
