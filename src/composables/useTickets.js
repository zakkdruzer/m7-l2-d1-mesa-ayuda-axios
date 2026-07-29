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

      console.log('RESPUESTA /tickets:', data)

      tickets.value = data.datos
      meta.value = data.meta
    } catch (error) {
      console.error('ERROR EN /tickets:', error)
      errorLista.value = 'No se pudo cargar la lista de tickets.'
    } finally {
      cargandoLista.value = false
    }
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
  }
}