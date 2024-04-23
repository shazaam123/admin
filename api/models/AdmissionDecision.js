const Sequelize = require('sequelize')
const { db } = require('../db')

module.exports = db.define('AdmissionDecision', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true
  },
  application: Sequelize.INTEGER,
  decision_date: Sequelize.DATEONLY,
  decision: Sequelize.STRING,
})