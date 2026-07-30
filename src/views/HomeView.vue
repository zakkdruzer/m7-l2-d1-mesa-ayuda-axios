<script setup>
import { computed, onMounted, ref } from 'vue'
import { useTickets } from '../composables/useTickets'
import TicketCard from '../components/TicketCard.vue'
import TicketDetalle from '../components/TicketDetalle.vue'

const {
  tickets,
  meta,
  ticketDetalle,
  cargandoLista,
  cargandoDetalle,
  errorLista,
  errorDetalle,
  cargarTickets,
  cargarDetalle,
  limpiarDetalle,
} = useTickets()

const busqueda = ref('')

const ticketsFiltrados = computed(() => {
  const texto = busqueda.value.trim().toLowerCase()

  if (!texto) return tickets.value

  return tickets.value.filter((ticket) => {
    const asunto = ticket.asunto?.toLowerCase() || ''
    const solicitante = ticket.solicitante?.toLowerCase() || ''
    return asunto.includes(texto) || solicitante.includes(texto)
  })
})

onMounted(() => {
  cargarTickets()
})
</script>

<template>
  <section class="page">
    <div class="page__header">
      <h1>Tickets</h1>

      <div class="page__actions">
        <span v-if="meta">Total: {{ meta.total }}</span>

        <button
          class="btn btn--primary"
          :disabled="cargandoLista"
          @click="cargarTickets"
        >
          {{ cargandoLista ? 'Recargando...' : 'Recargar' }}
        </button>
      </div>
    </div>

    <div class="toolbar">
      <input
        v-model="busqueda"
        type="text"
        class="input-busqueda"
        placeholder="Buscar por asunto o solicitante"
      />
    </div>

    <p v-if="meta" class="page__meta">
      Mostrando {{ ticketsFiltrados.length }} de {{ meta.total }} tickets — página
      {{ meta.pagina }} de {{ meta.totalPaginas }}
    </p>

    <p v-if="cargandoLista">Cargando tickets...</p>

    <p v-else-if="errorLista" class="mensaje-error">
      {{ errorLista }}
    </p>

    <p v-else-if="tickets.length === 0">
      No hay tickets disponibles.
    </p>

    <p v-else-if="ticketsFiltrados.length === 0">
      No se encontraron tickets para esa búsqueda.
    </p>

    <div v-else class="tickets-grid">
      <TicketCard
        v-for="ticket in ticketsFiltrados"
        :key="ticket.id"
        :ticket="ticket"
        @ver-detalle="cargarDetalle"
      />
    </div>

    <TicketDetalle
      v-if="ticketDetalle || cargandoDetalle || errorDetalle"
      :ticket="ticketDetalle"
      :cargando="cargandoDetalle"
      :error="errorDetalle"
      @cerrar="limpiarDetalle"
    />
  </section>
</template>