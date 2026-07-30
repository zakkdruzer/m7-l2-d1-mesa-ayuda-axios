<script setup>
import { computed } from 'vue'

const props = defineProps({
  ticket: {
    type: Object,
    required: true,
  },
})

defineEmits(['ver-detalle'])

const prioridadInfo = computed(() => {
  const prioridad = props.ticket.prioridad?.toLowerCase()

  if (prioridad === 'alta') {
    return {
      texto: '▲ Alta',
      clase: 'badge badge--alta',
    }
  }

  if (prioridad === 'media') {
    return {
      texto: '■ Media',
      clase: 'badge badge--media',
    }
  }

  return {
    texto: '● Baja',
    clase: 'badge badge--baja',
  }
})
</script>

<template>
  <article class="ticket-card">
    <p><strong>ID:</strong> {{ ticket.id }}</p>
    <p><strong>Asunto:</strong> {{ ticket.asunto }}</p>

    <p class="ticket-card__priority-row">
      <strong>Prioridad:</strong>
      <span :class="prioridadInfo.clase">
        {{ prioridadInfo.texto }}
      </span>
    </p>

    <p><strong>Estado:</strong> {{ ticket.estado }}</p>
    <p><strong>Solicitante:</strong> {{ ticket.solicitante }}</p>

    <button class="btn btn--secondary" @click="$emit('ver-detalle', ticket.id)">
      Ver detalle
    </button>
  </article>
</template>