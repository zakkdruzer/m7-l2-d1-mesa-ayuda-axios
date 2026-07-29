<script setup>
defineProps({
  ticket: Object,
  cargando: Boolean,
  error: String,
})

defineEmits(['cerrar'])

function formatearFecha(fecha) {
  if (!fecha) return ''
  return new Date(fecha).toLocaleString('es-CL')
}
</script>

<template>
  <aside class="detalle">
    <button class="btn btn--ghost" @click="$emit('cerrar')">Cerrar</button>

    <p v-if="cargando">Cargando detalle...</p>
    <p v-else-if="error" class="mensaje-error">{{ error }}</p>

    <template v-else-if="ticket">
      <h3>{{ ticket.asunto }}</h3>
      <p><strong>ID:</strong> {{ ticket.id ?? ticket.codigo }}</p>
      <p><strong>Estado:</strong> {{ ticket.estado }}</p>
      <p><strong>Prioridad:</strong> {{ ticket.prioridad }}</p>
      <p><strong>Solicitante:</strong> {{ ticket.solicitante }}</p>
      <p><strong>Creado:</strong> {{ formatearFecha(ticket.creadoEn) }}</p>
      <p><strong>Descripción:</strong> {{ ticket.descripcion }}</p>
    </template>
  </aside>
</template>