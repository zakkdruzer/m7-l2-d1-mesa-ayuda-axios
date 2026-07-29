import { ref } from 'vue'
import { getTickets, getTicketById, createTicket } from '../services/ticketsService'

const tickets = ref([])
const meta = ref(null)
const ticketDetalle = ref(null)

const cargandoLista = ref(false)
const cargandoDetalle = ref(false)
const creandoTicket = ref(false)

const errorLista = ref('')
const errorDetalle = ref('')
const erroresFormulario = ref({})

export function useTickets() {
  async function cargarTickets(params = {}) {
    cargandoLista.value = true
    errorLista.value = ''

    try {
      const { data } = await getTickets(params)
      tickets.value = data.datos
      meta.value = data.meta
    } catch (error) {
      errorLista.value = 'No se pudo cargar la lista de tickets.'
    } finally {
      cargandoLista.value = false
    }
  }

  async function cargarDetalle(id) {
    cargandoDetalle.value = true
    errorDetalle.value = ''
    ticketDetalle.value = null

    try {
      const { data } = await getTicketById(id)
      ticketDetalle.value = data
    } catch (error) {
      if (error.response?.status === 404) {
        errorDetalle.value = `No existe el ticket con id ${id}.`
      } else {
        errorDetalle.value = 'No se pudo cargar el detalle del ticket.'
      }
    } finally {
      cargandoDetalle.value = false
    }
  }

  function limpiarDetalle() {
    ticketDetalle.value = null
    errorDetalle.value = ''
  }

  async function crearNuevoTicket(payload) {
    creandoTicket.value = true
    erroresFormulario.value = {}

    try {
      const { data } = await createTicket(payload)
      tickets.value.unshift(data)

      if (meta.value) {
        meta.value.total += 1
      }

      return { ok: true, data }
    } catch (error) {
      if (error.response?.status === 422) {
        erroresFormulario.value = error.response.data.errores ?? {}
      }

      return { ok: false, error }
    } finally {
      creandoTicket.value = false
    }
  }

  function limpiarErroresFormulario() {
    erroresFormulario.value = {}
  }

  return {
    tickets,
    meta,
    ticketDetalle,
    cargandoLista,
    cargandoDetalle,
    creandoTicket,
    errorLista,
    errorDetalle,
    erroresFormulario,
    cargarTickets,
    cargarDetalle,
    limpiarDetalle,
    crearNuevoTicket,
    limpiarErroresFormulario,
  }
}