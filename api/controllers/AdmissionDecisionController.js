const { knex, db } = require('../db')
const util = require('../util')
const AdmissionDecision = require('../models/AdmissionDecision')

exports.index = (req, res, next) => {
  let page = req.query.page || 1
  let size = req.query.size || 10
  let sort = req.query.sort || 'AdmissionDecision.id'
  let sortDirection = req.query.sort ? (req.query.desc ? 'desc' : 'asc') : 'asc'
  let column = req.query.sc
  let query = knex('AdmissionDecision')
    .select('AdmissionDecision.id', 'AdmissionDecision.application', 'AdmissionDecision.decision_date', 'AdmissionDecision.decision')
    .orderBy(sort, sortDirection)
  let columns = query._statements.find(e => e.grouping == 'columns').value
  if (util.isInvalidSearch(columns, column)) {
    return res.sendStatus(403)
  }
  if (req.query.sw) {
    let search = req.query.sw
    let operator = util.getOperator(req.query.so)
    if (column == 'AdmissionDecision.decision_date') {
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
  ]).then(([count, admissionDecisions]) => {
    let last = Math.ceil(count.count / size)
    res.send({ admissionDecisions, last })
  }).catch(next)
}

exports.getCreate = (req, res, next) => {
  res.end()
}

exports.create = (req, res, next) => {
  let admissionDecision = util.parseData(AdmissionDecision, { ...req.body })
  AdmissionDecision.create(admissionDecision).then(() => {
    res.end()
  }).catch(next)
}

exports.get = (req, res, next) => {
  let sqlAdmissionDecision = knex('AdmissionDecision')
    .select('AdmissionDecision.id', 'AdmissionDecision.application', 'AdmissionDecision.decision_date', 'AdmissionDecision.decision')
    .where('AdmissionDecision.id', req.params.id)
    .toString()
  db.query(sqlAdmissionDecision, { type: 'SELECT', plain: true }).then(admissionDecision => {
    res.send({ admissionDecision })
  }).catch(next)
}

exports.edit = (req, res, next) => {
  let sqlAdmissionDecision = knex('AdmissionDecision')
    .select('AdmissionDecision.id', 'AdmissionDecision.application', 'AdmissionDecision.decision_date', 'AdmissionDecision.decision')
    .where('AdmissionDecision.id', req.params.id)
    .toString()
  db.query(sqlAdmissionDecision, { type: 'SELECT', plain: true }).then(admissionDecision => {
    res.send({ admissionDecision })
  }).catch(next)
}

exports.update = (req, res, next) => {
  let admissionDecision = util.parseData(AdmissionDecision, { ...req.body })
  AdmissionDecision.update(admissionDecision, { where: { id: req.params.id }}).then(() => {
    res.end()
  }).catch(next)
}

exports.getDelete = (req, res, next) => {
  let sqlAdmissionDecision = knex('AdmissionDecision')
    .select('AdmissionDecision.id', 'AdmissionDecision.application', 'AdmissionDecision.decision_date', 'AdmissionDecision.decision')
    .where('AdmissionDecision.id', req.params.id)
    .toString()
  db.query(sqlAdmissionDecision, { type: 'SELECT', plain: true }).then(admissionDecision => {
    res.send({ admissionDecision })
  }).catch(next)
}

exports.delete = (req, res, next) => {
  AdmissionDecision.destroy({ where: { id: req.params.id }}).then(() => {
    res.end()
  }).catch(next)
}