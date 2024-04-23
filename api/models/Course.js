const Sequelize = require('sequelize');
const { db } = require('../database');

module.exports = db.define('Course', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true
  },
  course_name: Sequelize.STRING,
  department: Sequelize.STRING,
  credits: Sequelize.INTEGER,
})