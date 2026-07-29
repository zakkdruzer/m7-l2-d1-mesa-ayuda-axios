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
const paginaActual = ref(1)

onMounted(() => {
  cargarTickets({ pagina: paginaActual.value })
})

async function recargar() {
  await cargarTickets({ pagina: paginaActual.value })
}

async function irPagina(pagina) {
  paginaActual.value = pagina
  await cargarTickets({ pagina })
}

async function siguientePagina() {
  if (!meta.value?.haySiguiente) return
  await irPagina(paginaActual.value + 1)
}

async function paginaAnterior() {
  if (!meta.value?.hayAnterior) return
  await irPagina(paginaActual.value - 1)
}

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
          @click="recargar"
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

    <template v-else>
      <p class="paginacion__resumen">
        Mostrando {{ tickets.length }} de {{ meta?.total ?? 0 }} tickets
        — página {{ meta?.pagina ?? 1 }} de {{ meta?.totalPaginas ?? 1 }}
      </p>

      <div class="ticket-grid">
        <TicketCard
          v-for="ticket in tickets"
          :key="ticket.id ?? ticket.codigo"
          :ticket="ticket"
          @ver-detalle="verDetalle"
        />
      </div>

      <div class="paginacion">
        <button
          class="btn btn--secondary"
          :disabled="!meta?.hayAnterior || cargandoLista"
          @click="paginaAnterior"
        >
          Anterior
        </button>

        <span>Página {{ meta?.pagina ?? 1 }}</span>

        <button
          class="btn btn--secondary"
          :disabled="!meta?.haySiguiente || cargandoLista"
          @click="siguientePagina"
        >
          Siguiente
        </button>
      </div>
    </template>

    <TicketDetalle
      v-if="mostrarDetalle"
      :ticket="ticketDetalle"
      :cargando="cargandoDetalle"
      :error="errorDetalle"
      @cerrar="cerrarDetalle"
    />
  </section>
</template>