const { knex, db } = require('../db')
const util = require('../util')
const Student = require('../models/Student')

exports.index = (req, res, next) => {
  let page = req.query.page || 1
  let size = req.query.size || 10
  let sort = req.query.sort || 'Student.id'
  let sortDirection = req.query.sort ? (req.query.desc ? 'desc' : 'asc') : 'asc'
  let column = req.query.sc
  let query = knex('Student')
    .select('Student.id', 'Student.first_name', 'Student.last_name', 'Student.email', 'Student.date_of_birth', 'Student.phone')
    .orderBy(sort, sortDirection)
  let columns = query._statements.find(e => e.grouping == 'columns').value
  if (util.isInvalidSearch(columns, column)) {
    return res.sendStatus(403)
  }
  if (req.query.sw) {
    let search = req.query.sw
    let operator = util.getOperator(req.query.so)
    if (column == 'Student.date_of_birth') {
      search = util.formatDateStr(search)
    }
    if (operator == 'like') {
      search = `%${search}%`
    }
    query.where(column, operator, search)
  }
  let sqlCount = query.clone().clearSelect().clearOrder().count('* as "count"').toString()
  let sqlQuery = query.offset((page - 1) * size).limit(size).toString()
  Promise.all([
    db.query(sqlCount, { type: 'SELECT', plain: true }),
    db.query(sqlQuery, { type: 'SELECT' })
  ]).then(([count, students]) => {
    let last = Math.ceil(count.count / size)
    res.send({ students, last })
  }).catch(next)
}

exports.getCreate = (req, res, next) => {
  res.end()
}

exports.create = (req, res, next) => {
  let student = util.parseData(Student, { ...req.body })
  Student.create(student).then(() => {
    res.end()
  }).catch(next)
}

exports.get = (req, res, next) => {
  let sqlStudent = knex('Student')
    .select('Student.id', 'Student.first_name', 'Student.last_name', 'Student.email', 'Student.date_of_birth', 'Student.phone')
    .where('Student.id', req.params.id)
    .toString()
  db.query(sqlStudent, { type: 'SELECT', plain: true }).then(student => {
    res.send({ student })
  }).catch(next)
}

exports.edit = (req, res, next) => {
  let sqlStudent = knex('Student')
    .select('Student.id', 'Student.first_name', 'Student.last_name', 'Student.email', 'Student.date_of_birth', 'Student.phone')
    .where('Student.id', req.params.id)
    .toString()
  db.query(sqlStudent, { type: 'SELECT', plain: true }).then(student => {
    res.send({ student })
  }).catch(next)
}

exports.update = (req, res, next) => {
  let student = util.parseData(Student, { ...req.body })
  Student.update(student, { where: { id: req.params.id }}).then(() => {
    res.end()
  }).catch(next)
}

exports.getDelete = (req, res, next) => {
  let sqlStudent = knex('Student')
    .select('Student.id', 'Student.first_name', 'Student.last_name', 'Student.email', 'Student.date_of_birth', 'Student.phone')
    .where('Student.id', req.params.id)
    .toString()
  db.query(sqlStudent, { type: 'SELECT', plain: true }).then(student => {
    res.send({ student })
  }).catch(next)
}

exports.delete = (req, res, next) => {
  Student.destroy({ where: { id: req.params.id }}).then(() => {
    res.end()
  }).catch(next)
}