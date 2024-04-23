const Sequelize = require('sequelize')
const { db } = require('../db')

module.exports = db.define('Program', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true
  },
  program_name: Sequelize.STRING,
  description: Sequelize.STRING,
  requirements: Sequelize.STRING,
  credits: Sequelize.STRING,
})