import api from './api'

export const getTickets = (params = {}) => api.get('/tickets', { params })
export const getTicketById = (id) => api.get(`/tickets/${id}`)
export const createTicket = (payload) => api.post('/tickets', payload)