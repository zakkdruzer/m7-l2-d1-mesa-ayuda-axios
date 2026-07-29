<script setup>
import { onMounted, ref } from 'vue'
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

const mostrarDetalle = ref(false)

onMounted(() => {
  cargarTickets()
})

async function verDetalle(id) {
  mostrarDetalle.value = true
  await cargarDetalle(id)
}

function cerrarDetalle() {
  mostrarDetalle.value = false
  limpiarDetalle()
}
</script>

<template>
  <section class="page">
    <div class="page__header">
      <h1>Tickets</h1>

      <div class="page__actions">
        <span>Total: {{ meta?.total ?? 0 }}</span>

        <button
          class="btn btn--primary"
          :disabled="cargandoLista"
          @click="cargarTickets()"
        >
          {{ cargandoLista ? 'Cargando...' : 'Recargar' }}
        </button>
      </div>
    </div>

    <p v-if="cargandoLista">Cargando tickets...</p>

    <p v-else-if="errorLista" class="mensaje-error">
      {{ errorLista }}
    </p>

    <p v-else-if="tickets.length === 0">
      No hay tickets para mostrar.
    </p>

    <div v-else class="ticket-grid">
      <TicketCard
        v-for="ticket in tickets"
        :key="ticket.id ?? ticket.codigo"
        :ticket="ticket"
        @ver-detalle="verDetalle"
      />
    </div>

    <TicketDetalle
      v-if="mostrarDetalle"
      :ticket="ticketDetalle"
      :cargando="cargandoDetalle"
      :error="errorDetalle"
      @cerrar="cerrarDetalle"
    />
  </section>
</template>