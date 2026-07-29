<script setup>
defineProps({
  ticket: {
    type: Object,
    required: true,
  },
})

defineEmits(['ver-detalle'])
</script>

<template>
  <article class="ticket-card">
    <p><strong>ID:</strong> {{ ticket.id ?? ticket.codigo }}</p>
    <p><strong>Asunto:</strong> {{ ticket.asunto }}</p>
    <p><strong>Prioridad:</strong> {{ ticket.prioridad }}</p>
    <p><strong>Estado:</strong> {{ ticket.estado }}</p>
    <p><strong>Solicitante:</strong> {{ ticket.solicitante }}</p>

    <button class="btn btn--secondary" @click="$emit('ver-detalle', ticket.id)">
      Ver detalle
    </button>
  </article>
</template>