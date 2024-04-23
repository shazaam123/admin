const Sequelize = require('sequelize')
const { db } = require('../db')

module.exports = db.define('Applications', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true
  },
  student: Sequelize.INTEGER,
  course: Sequelize.INTEGER,
  application_date: Sequelize.DATEONLY,
  status: Sequelize.STRING,
})