import http from '../../http'

export default {
  get(id) {
    if (id) {
      return http.get(`/admissionDecisions/${id}`)
    }
    else {
      return http.get('/admissionDecisions' + location.search)
    }
  },
  create(data) {
    if (data) {
      return http.post('/admissionDecisions', data)
    }
    else {
      return http.get('/admissionDecisions/create')
    }
  },
  edit(id, data) {
    if (data) {
      return http.put(`/admissionDecisions/${id}`, data)
    }
    else {
      return http.get(`/admissionDecisions/${id}/edit`)
    }
  },
  delete(id, data) {
    if (data) {
      return http.delete(`/admissionDecisions/${id}`)
    }
    else {
      return http.get(`/admissionDecisions/${id}/delete`)
    }
  }
}