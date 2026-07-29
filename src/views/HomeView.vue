<script setup>
import { onMounted } from 'vue'
import { useTickets } from '../composables/useTickets'

const {
  tickets,
  meta,
  cargandoLista,
  errorLista,
  cargarTickets,
} = useTickets()

onMounted(() => {
  cargarTickets()
})
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

    <p>DEBUG loading: {{ cargandoLista }}</p>
    <p>DEBUG error: {{ errorLista }}</p>
    <p>DEBUG tickets length: {{ tickets.length }}</p>
    <p>DEBUG total meta: {{ meta?.total }}</p>

    <p v-if="cargandoLista">Cargando tickets...</p>

    <p v-else-if="errorLista" class="mensaje-error">
      {{ errorLista }}
    </p>

    <p v-else-if="tickets.length === 0">
      No hay tickets para mostrar.
    </p>

    <div v-else class="ticket-grid">
      <article
        v-for="ticket in tickets"
        :key="ticket.id ?? ticket.codigo"
        style="border:1px solid red; padding:12px; margin-bottom:12px; background:white;"
      >
        <p>ID: {{ ticket.id ?? ticket.codigo }}</p>
        <p>Asunto: {{ ticket.asunto }}</p>
        <p>Prioridad: {{ ticket.prioridad }}</p>
        <p>Estado: {{ ticket.estado }}</p>
        <p>Solicitante: {{ ticket.solicitante }}</p>
      </article>
    </div>
  </section>
</template>