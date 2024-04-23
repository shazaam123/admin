const Sequelize = require('sequelize')
const { db } = require('../db')

module.exports = db.define('Faculty', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  facultyName: Sequelize.STRING,
  email: {
    type: Sequelize.STRING,
    allowNull: false
  },
  phone: Sequelize.STRING,
  facultyType: Sequelize.STRING,
})