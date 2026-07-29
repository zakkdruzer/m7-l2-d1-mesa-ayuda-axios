<script setup>
defineProps({
  ticket: {
    type: Object,
    required: true,
  },
})
</script>

<template>
  <article class="ticket-card">
    <p><strong>ID:</strong> {{ ticket.id ?? ticket.codigo }}</p>
    <p><strong>Asunto:</strong> {{ ticket.asunto }}</p>
    <p><strong>Prioridad:</strong> {{ ticket.prioridad }}</p>
    <p><strong>Estado:</strong> {{ ticket.estado }}</p>
    <p><strong>Solicitante:</strong> {{ ticket.solicitante }}</p>
  </article>
</template>