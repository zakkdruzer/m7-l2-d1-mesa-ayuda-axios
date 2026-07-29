import api from './api'

export function login(username, password, duracionMinutos) {
  return api.post('/login', {
    username,
    password,
    duracionMinutos,
  })
}