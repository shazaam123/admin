import http from '../../http'

export default {
  get(courseId) {
    if (courseId) {
      return http.get(`/courses/${courseId}`)
    }
    else {
      return http.get('/courses' + location.search)
    }
  },
  create(data) {
    if (data) {
      return http.post('/courses', data)
    }
    else {
      return http.get('/courses/create')
    }
  },
  edit(courseId, data) {
    if (data) {
      return http.put(`/courses/${courseId}`, data)
    }
    else {
      return http.get(`/courses/${courseId}/edit`)
    }
  },
  delete(courseId, data) {
    if (data) {
      return http.delete(`/courses/${courseId}`)
    }
    else {
      return http.get(`/courses/${courseId}/delete`)
    }
  }
}