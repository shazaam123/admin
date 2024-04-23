import http from '../../http'

export default {
  get(id) {
    if (id) {
      return http.get(`/students/${id}`)
    }
    else {
      return http.get('/students' + location.search)
    }
  },
  create(data) {
    if (data) {
      return http.post('/students', data)
    }
    else {
      return http.get('/students/create')
    }
  },
  edit(id, data) {
    if (data) {
      return http.put(`/students/${id}`, data)
    }
    else {
      return http.get(`/students/${id}/edit`)
    }
  },
  delete(id, data) {
    if (data) {
      return http.delete(`/students/${id}`)
    }
    else {
      return http.get(`/students/${id}/delete`)
    }
  }
}