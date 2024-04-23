import http from '../../http'

export default {
  get(id) {
    if (id) {
      return http.get(`/programs/${id}`)
    }
    else {
      return http.get('/programs' + location.search)
    }
  },
  create(data) {
    if (data) {
      return http.post('/programs', data)
    }
    else {
      return http.get('/programs/create')
    }
  },
  edit(id, data) {
    if (data) {
      return http.put(`/programs/${id}`, data)
    }
    else {
      return http.get(`/programs/${id}/edit`)
    }
  },
  delete(id, data) {
    if (data) {
      return http.delete(`/programs/${id}`)
    }
    else {
      return http.get(`/programs/${id}/delete`)
    }
  }
}