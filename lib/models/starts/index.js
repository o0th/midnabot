const { Sequelize, sequelize } = require('../../modules/sequelize')

const Starts = sequelize.define('starts', {
  name: { type: Sequelize.STRING, allowNull: false, unique: true },
  start: { type: Sequelize.BOOLEAN, defaultValue: false }
})

module.exports = { Starts }
