const Sequelize = require('sequelize')
const { db } = require('../db')

module.exports = db.define('Student', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true
  },
  first_name: Sequelize.STRING,
  last_name: Sequelize.STRING,
  email: Sequelize.STRING,
  date_of_birth: Sequelize.DATEONLY,
  phone: Sequelize.STRING,
})