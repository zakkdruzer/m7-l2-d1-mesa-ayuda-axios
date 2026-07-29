<script setup>
import { onMounted, ref } from 'vue'
import { useTickets } from '@/composables/useTickets'
import TicketCard from '@/components/TicketCard.vue'
import TicketDetalle from '@/components/TicketDetalle.vue'

const ticketsState = useTickets()
const mostrarDetalle = ref(false)

onMounted(() => {
  ticketsState.cargarTickets()
})

async function verDetalle(id) {
  mostrarDetalle.value = true
  await ticketsState.cargarDetalle(id)
}

function cerrarDetalle() {
  mostrarDetalle.value = false
  ticketsState.limpiarDetalle()
}
</script>

<template>
  <section class="page">
    <div class="page__header">
      <h1>Tickets</h1>

      <div class="page__actions">
        <span v-if="ticketsState.meta">
          Total: {{ ticketsState.meta.total }}
        </span>

        <button
          class="btn btn--primary"
          :disabled="ticketsState.cargandoLista"
          @click="ticketsState.cargarTickets()"
        >
          {{ ticketsState.cargandoLista ? 'Cargando...' : 'Recargar' }}
        </button>
      </div>
    </div>

    <p v-if="ticketsState.cargandoLista">Cargando tickets...</p>

    <p v-else-if="ticketsState.errorLista" class="mensaje-error">
      {{ ticketsState.errorLista }}
    </p>

    <p v-else-if="ticketsState.tickets.length === 0">
      No hay tickets para mostrar.
    </p>

    <div v-else class="ticket-grid">
      <TicketCard
        v-for="ticket in ticketsState.tickets"
        :key="ticket.id"
        :ticket="ticket"
        @ver-detalle="verDetalle"
      />
    </div>

    <TicketDetalle
      v-if="mostrarDetalle"
      :ticket="ticketsState.ticketDetalle"
      :cargando="ticketsState.cargandoDetalle"
      :error="ticketsState.errorDetalle"
      @cerrar="cerrarDetalle"
    />
  </section>
</template>