const { knex, db } = require('../db')
const util = require('../util')
const Faculty = require('../models/Faculty')

exports.index = (req, res, next) => {
  let page = req.query.page || 1
  let size = req.query.size || 10
  let sort = req.query.sort || 'Faculty.id'
  let sortDirection = req.query.sort ? (req.query.desc ? 'desc' : 'asc') : 'asc'
  let column = req.query.sc
  let query = knex('Faculty')
    .select('Faculty.id', 'Faculty.facultyName', 'Faculty.email', 'Faculty.phone')
    .orderBy(sort, sortDirection)
  let columns = query._statements.find(e => e.grouping == 'columns').value
  if (util.isInvalidSearch(columns, column)) {
    return res.sendStatus(403)
  }
  if (req.query.sw) {
    let search = req.query.sw
    let operator = util.getOperator(req.query.so)
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
  ]).then(([count, faculties]) => {
    let last = Math.ceil(count.count / size)
    res.send({ faculties, last })
  }).catch(next)
}

exports.getCreate = (req, res, next) => {
  res.end()
}

exports.create = (req, res, next) => {
  let faculty = util.parseData(Faculty, { ...req.body })
  Faculty.create(faculty).then(() => {
    res.end()
  }).catch(next)
}

exports.get = (req, res, next) => {
  let sqlFaculty = knex('Faculty')
    .select('Faculty.id', 'Faculty.facultyName', 'Faculty.email', 'Faculty.phone')
    .where('Faculty.id', req.params.id)
    .toString()
  db.query(sqlFaculty, { type: 'SELECT', plain: true }).then(faculty => {
    res.send({ faculty })
  }).catch(next)
}

exports.edit = (req, res, next) => {
  let sqlFaculty = knex('Faculty')
    .select('Faculty.id', 'Faculty.facultyName', 'Faculty.email', 'Faculty.phone')
    .where('Faculty.id', req.params.id)
    .toString()
  db.query(sqlFaculty, { type: 'SELECT', plain: true }).then(faculty => {
    res.send({ faculty })
  }).catch(next)
}

exports.update = (req, res, next) => {
  let faculty = util.parseData(Faculty, { ...req.body })
  Faculty.update(faculty, { where: { id: req.params.id }}).then(() => {
    res.end()
  }).catch(next)
}

exports.getDelete = (req, res, next) => {
  let sqlFaculty = knex('Faculty')
    .select('Faculty.id', 'Faculty.facultyName', 'Faculty.email', 'Faculty.phone')
    .where('Faculty.id', req.params.id)
    .toString()
  db.query(sqlFaculty, { type: 'SELECT', plain: true }).then(faculty => {
    res.send({ faculty })
  }).catch(next)
}

exports.delete = (req, res, next) => {
  Faculty.destroy({ where: { id: req.params.id }}).then(() => {
    res.end()
  }).catch(next)
}