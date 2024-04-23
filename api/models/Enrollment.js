const Sequelize = require('sequelize')
const { db } = require('../db')

module.exports = db.define('Enrollment', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true
  },
  student: Sequelize.INTEGER,
  course: Sequelize.INTEGER,
  enrollment_date: Sequelize.DATEONLY,
  grade: Sequelize.STRING,
})