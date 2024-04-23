import http from '../../http'

export default {
  get(id) {
    if (id) {
      return http.get(`/applicationses/${id}`)
    }
    else {
      return http.get('/applicationses' + location.search)
    }
  },
  create(data) {
    if (data) {
      return http.post('/applicationses', data)
    }
    else {
      return http.get('/applicationses/create')
    }
  },
  edit(id, data) {
    if (data) {
      return http.put(`/applicationses/${id}`, data)
    }
    else {
      return http.get(`/applicationses/${id}/edit`)
    }
  },
  delete(id, data) {
    if (data) {
      return http.delete(`/applicationses/${id}`)
    }
    else {
      return http.get(`/applicationses/${id}/delete`)
    }
  }
}