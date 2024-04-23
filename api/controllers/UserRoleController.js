const { knex, db } = require('../db')
const util = require('../util')
const UserRole = require('../models/UserRole')

exports.index = (req, res, next) => {
  let page = req.query.page || 1
  let size = req.query.size || 10
  let sort = req.query.sort || 'UserRole.user_id'
  let sortDirection = req.query.sort ? (req.query.desc ? 'desc' : 'asc') : 'asc'
  let column = req.query.sc
  let query = knex('UserRole')
    .select('UserRole.user_id', 'UserRole.role_id')
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
  ]).then(([count, userRoles]) => {
    let last = Math.ceil(count.count / size)
    res.send({ userRoles, last })
  }).catch(next)
}

exports.getCreate = (req, res, next) => {
  res.end()
}

exports.create = (req, res, next) => {
  let userRole = util.parseData(UserRole, { ...req.body })
  UserRole.create(userRole).then(() => {
    res.end()
  }).catch(next)
}

exports.get = (req, res, next) => {
  let sqlUserRole = knex('UserRole')
    .select('UserRole.user_id', 'UserRole.role_id')
    .where('UserRole.user_id', req.params.userId)
    .where('UserRole.role_id', req.params.roleId)
    .toString()
  db.query(sqlUserRole, { type: 'SELECT', plain: true }).then(userRole => {
    res.send({ userRole })
  }).catch(next)
}

exports.edit = (req, res, next) => {
  let sqlUserRole = knex('UserRole')
    .select('UserRole.user_id', 'UserRole.role_id')
    .where('UserRole.user_id', req.params.userId)
    .where('UserRole.role_id', req.params.roleId)
    .toString()
  db.query(sqlUserRole, { type: 'SELECT', plain: true }).then(userRole => {
    res.send({ userRole })
  }).catch(next)
}

exports.update = (req, res, next) => {
  let userRole = util.parseData(UserRole, { ...req.body })
  UserRole.update(userRole, { where: { user_id: req.params.userId, role_id: req.params.roleId }}).then(() => {
    res.end()
  }).catch(next)
}

exports.getDelete = (req, res, next) => {
  let sqlUserRole = knex('UserRole')
    .select('UserRole.user_id', 'UserRole.role_id')
    .where('UserRole.user_id', req.params.userId)
    .where('UserRole.role_id', req.params.roleId)
    .toString()
  db.query(sqlUserRole, { type: 'SELECT', plain: true }).then(userRole => {
    res.send({ userRole })
  }).catch(next)
}

exports.delete = (req, res, next) => {
  UserRole.destroy({ where: { user_id: req.params.userId, role_id: req.params.roleId }}).then(() => {
    res.end()
  }).catch(next)
}