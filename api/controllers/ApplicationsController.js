const { knex, db } = require('../db')
const util = require('../util')
const Applications = require('../models/Applications')

exports.index = (req, res, next) => {
  let page = req.query.page || 1
  let size = req.query.size || 10
  let sort = req.query.sort || 'Applications.id'
  let sortDirection = req.query.sort ? (req.query.desc ? 'desc' : 'asc') : 'asc'
  let column = req.query.sc
  let query = knex('Applications')
    .select('Applications.id', 'Applications.student', 'Applications.course', 'Applications.application_date', 'Applications.status')
    .orderBy(sort, sortDirection)
  let columns = query._statements.find(e => e.grouping == 'columns').value
  if (util.isInvalidSearch(columns, column)) {
    return res.sendStatus(403)
  }
  if (req.query.sw) {
    let search = req.query.sw
    let operator = util.getOperator(req.query.so)
    if (column == 'Applications.application_date') {
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
  ]).then(([count, applicationses]) => {
    let last = Math.ceil(count.count / size)
    res.send({ applicationses, last })
  }).catch(next)
}

exports.getCreate = (req, res, next) => {
  res.end()
}

exports.create = (req, res, next) => {
  let applications = util.parseData(Applications, { ...req.body })
  Applications.create(applications).then(() => {
    res.end()
  }).catch(next)
}

exports.get = (req, res, next) => {
  let sqlApplications = knex('Applications')
    .select('Applications.id', 'Applications.student', 'Applications.course', 'Applications.application_date', 'Applications.status')
    .where('Applications.id', req.params.id)
    .toString()
  db.query(sqlApplications, { type: 'SELECT', plain: true }).then(applications => {
    res.send({ applications })
  }).catch(next)
}

exports.edit = (req, res, next) => {
  let sqlApplications = knex('Applications')
    .select('Applications.id', 'Applications.student', 'Applications.course', 'Applications.application_date', 'Applications.status')
    .where('Applications.id', req.params.id)
    .toString()
  db.query(sqlApplications, { type: 'SELECT', plain: true }).then(applications => {
    res.send({ applications })
  }).catch(next)
}

exports.update = (req, res, next) => {
  let applications = util.parseData(Applications, { ...req.body })
  Applications.update(applications, { where: { id: req.params.id }}).then(() => {
    res.end()
  }).catch(next)
}

exports.getDelete = (req, res, next) => {
  let sqlApplications = knex('Applications')
    .select('Applications.id', 'Applications.student', 'Applications.course', 'Applications.application_date', 'Applications.status')
    .where('Applications.id', req.params.id)
    .toString()
  db.query(sqlApplications, { type: 'SELECT', plain: true }).then(applications => {
    res.send({ applications })
  }).catch(next)
}

exports.delete = (req, res, next) => {
  Applications.destroy({ where: { id: req.params.id }}).then(() => {
    res.end()
  }).catch(next)
}