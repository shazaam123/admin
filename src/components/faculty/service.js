import http from '../../http'

export default {
  get(id) {
    if (id) {
      return http.get(`/faculties/${id}`)
    }
    else {
      return http.get('/faculties' + location.search)
    }
  },
  create(data) {
    if (data) {
      return http.post('/faculties', data)
    }
    else {
      return http.get('/faculties/create')
    }
  },
  edit(id, data) {
    if (data) {
      return http.put(`/faculties/${id}`, data)
    }
    else {
      return http.get(`/faculties/${id}/edit`)
    }
  },
  delete(id, data) {
    if (data) {
      return http.delete(`/faculties/${id}`)
    }
    else {
      return http.get(`/faculties/${id}/delete`)
    }
  }
}