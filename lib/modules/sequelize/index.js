const Sequelize = require('sequelize')

const sequelize = new Sequelize('midnabot', null, null, {
  dialect: 'sqlite',
  storage: './database/midnabot.sqlite',
  operatorsAliases: false,
  logging: false
})

module.exports = { Sequelize, sequelize }
