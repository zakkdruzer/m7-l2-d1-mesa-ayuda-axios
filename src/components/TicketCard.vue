<script setup>
defineProps({
  ticket: {
    type: Object,
    required: true,
  },
})

defineEmits(['ver-detalle'])

function badgeClass(prioridad) {
  return {
    alta: 'badge badge--alta',
    media: 'badge badge--media',
    baja: 'badge badge--baja',
  }[prioridad] || 'badge'
}
</script>

<template>
  <article class="ticket-card">
    <header class="ticket-card__header">
      <span>#{{ ticket.id ?? ticket.codigo }}</span>
      <span :class="badgeClass(ticket.prioridad)">
        Prioridad: {{ ticket.prioridad }}
      </span>
    </header>

    <h2>{{ ticket.asunto }}</h2>
    <p><strong>Estado:</strong> {{ ticket.estado }}</p>
    <p><strong>Solicitante:</strong> {{ ticket.solicitante }}</p>

    <button class="btn btn--secondary" @click="$emit('ver-detalle', ticket.id)">
      Ver detalle
    </button>
  </article>
</template>