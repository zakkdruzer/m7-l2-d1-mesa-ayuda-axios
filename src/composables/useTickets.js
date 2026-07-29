import { ref } from 'vue'
import { getTickets, getTicketById, createTicket } from '@/services/ticketsService'

export function useTickets() {
  const tickets        = ref([])
  const meta           = ref(null)   // { total, pagina, totalPaginas, ... }
  const ticket         = ref(null)   // detalle del ticket seleccionado
  const cargandoLista  = ref(false)
  const cargandoDetalle= ref(false)
  const errorLista     = ref(null)
  const errorDetalle   = ref(null)

  async function cargarTickets(params = {}) {
    cargandoLista.value = true
    errorLista.value    = null
    try {
      const { data } = await getTickets(params)
      tickets.value = data.datos   // ← leer la propiedad correcta
      meta.value    = data.meta
    } catch {
      errorLista.value = 'No se pudo cargar la lista. Revisa la conexión.'
    } finally {
      cargandoLista.value = false  // se apaga siempre, haya error o no
    }
  }
  // ... (cargarDetalle y enviarTicket abajo)
  return { tickets, meta, ticket, cargandoLista, cargandoDetalle,
           errorLista, errorDetalle, cargarTickets }
}