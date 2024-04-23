const express = require('express')
const util = require('./util')
const authorize = require('./middleware/authorize')
const system = require('./controllers/SystemController.js')
const authen = require('./controllers/LoginController.js')
const userAccount = require('./controllers/UserAccountController.js')
const student = require('./controllers/StudentController.js')
const course = require('./controllers/CourseController.js')
const applications = require('./controllers/ApplicationsController.js')
const userRole = require('./controllers/UserRoleController.js')
const admissionDecision = require('./controllers/AdmissionDecisionController.js')
const enrollment = require('./controllers/EnrollmentController.js')
const program = require('./controllers/ProgramController.js')
const faculty = require('./controllers/FacultyController.js')

module.exports = express.Router()
  .post('/login', authen.login)
  .get('/logout', authen.logout)
  .post('/resetPassword', authen.resetPassword)
  .get('/changePassword/:token', authen.getChangePassword)
  .post('/changePassword/:token', authen.changePassword)
  .get('/user', authen.user)
  .get('/profile', system.profile)
  .post('/updateProfile', system.updateProfile)
  .get('/stack', system.stack)
  .use('/userAccounts', authorize('ADMIN'), express.Router()
    .get('/', userAccount.index)
    .post('/', userAccount.create)
    .get('/create', userAccount.getCreate)
    .get('/:id', userAccount.get)
    .get('/:id/edit', userAccount.edit)
    .put('/:id', userAccount.update)
    .get('/:id/delete', userAccount.getDelete)
    .delete('/:id', userAccount.delete)
  )
  .use('/students', authorize('ADMIN,USER'), express.Router()
    .get('/', student.index)
    .post('/', student.create)
    .get('/create', student.getCreate)
    .get('/:id', student.get)
    .get('/:id/edit', student.edit)
    .put('/:id', student.update)
    .get('/:id/delete', student.getDelete)
    .delete('/:id', student.delete)
  )
  .use('/courses', authorize('ADMIN,USER'), express.Router()
    .get('/', course.index)
    .post('/', course.create)
    .get('/create', course.getCreate)
    .get('/:id', course.get)
    .get('/:id/edit', course.edit)
    .put('/:id', course.update)
    .get('/:id/delete', course.getDelete)
    .delete('/:id', course.delete)
  )
  .use('/applicationses', authorize('ADMIN,USER'), express.Router()
    .get('/', applications.index)
    .post('/', applications.create)
    .get('/create', applications.getCreate)
    .get('/:id', applications.get)
    .get('/:id/edit', applications.edit)
    .put('/:id', applications.update)
    .get('/:id/delete', applications.getDelete)
    .delete('/:id', applications.delete)
  )
  .use('/userRoles', authorize('ADMIN,USER'), express.Router()
    .get('/', userRole.index)
    .post('/', userRole.create)
    .get('/create', userRole.getCreate)
    .get('/:userId/:roleId', userRole.get)
    .get('/:userId/:roleId/edit', userRole.edit)
    .put('/:userId/:roleId', userRole.update)
    .get('/:userId/:roleId/delete', userRole.getDelete)
    .delete('/:userId/:roleId', userRole.delete)
  )
  .use('/admissionDecisions', authorize('ADMIN,USER'), express.Router()
    .get('/', admissionDecision.index)
    .post('/', admissionDecision.create)
    .get('/create', admissionDecision.getCreate)
    .get('/:id', admissionDecision.get)
    .get('/:id/edit', admissionDecision.edit)
    .put('/:id', admissionDecision.update)
    .get('/:id/delete', admissionDecision.getDelete)
    .delete('/:id', admissionDecision.delete)
  )
  .use('/enrollments', authorize('ADMIN,USER'), express.Router()
    .get('/', enrollment.index)
    .post('/', enrollment.create)
    .get('/create', enrollment.getCreate)
    .get('/:id', enrollment.get)
    .get('/:id/edit', enrollment.edit)
    .put('/:id', enrollment.update)
    .get('/:id/delete', enrollment.getDelete)
    .delete('/:id', enrollment.delete)
  )
  .use('/programs', authorize('ADMIN,USER'), express.Router()
    .get('/', program.index)
    .post('/', program.create)
    .get('/create', program.getCreate)
    .get('/:id', program.get)
    .get('/:id/edit', program.edit)
    .put('/:id', program.update)
    .get('/:id/delete', program.getDelete)
    .delete('/:id', program.delete)
  )
  .use('/faculties', authorize('ADMIN,USER'), express.Router()
    .get('/', faculty.index)
    .post('/', faculty.create)
    .get('/create', faculty.getCreate)
    .get('/:id', faculty.get)
    .get('/:id/edit', faculty.edit)
    .put('/:id', faculty.update)
    .get('/:id/delete', faculty.getDelete)
    .delete('/:id', faculty.delete)
  )