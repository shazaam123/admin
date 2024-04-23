import http from '../../http'

export default {
  get(id) {
    if (id) {
      return http.get(`/enrollments/${id}`)
    }
    else {
      return http.get('/enrollments' + location.search)
    }
  },
  create(data) {
    if (data) {
      return http.post('/enrollments', data)
    }
    else {
      return http.get('/enrollments/create')
    }
  },
  edit(id, data) {
    if (data) {
      return http.put(`/enrollments/${id}`, data)
    }
    else {
      return http.get(`/enrollments/${id}/edit`)
    }
  },
  delete(id, data) {
    if (data) {
      return http.delete(`/enrollments/${id}`)
    }
    else {
      return http.get(`/enrollments/${id}/delete`)
    }
  }
}