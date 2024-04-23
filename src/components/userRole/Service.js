import http from '../../http'

export default {
  get(userId, roleId) {
    if (userId) {
      return http.get(`/userRoles/${userId}/${roleId}`)
    }
    else {
      return http.get('/userRoles' + location.search)
    }
  },
  create(data) {
    if (data) {
      return http.post('/userRoles', data)
    }
    else {
      return http.get('/userRoles/create')
    }
  },
  edit(userId, roleId, data) {
    if (data) {
      return http.put(`/userRoles/${userId}/${roleId}`, data)
    }
    else {
      return http.get(`/userRoles/${userId}/${roleId}/edit`)
    }
  },
  delete(userId, roleId, data) {
    if (data) {
      return http.delete(`/userRoles/${userId}/${roleId}`)
    }
    else {
      return http.get(`/userRoles/${userId}/${roleId}/delete`)
    }
  }
}