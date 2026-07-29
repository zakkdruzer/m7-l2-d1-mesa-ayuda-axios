<script setup>
import { computed, reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuth } from '../composables/useAuth'
import { useTickets } from '../composables/useTickets'

const router = useRouter()
const { estaAutenticado } = useAuth()
const {
  crearNuevoTicket,
  creandoTicket,
  erroresFormulario,
  limpiarErroresFormulario,
} = useTickets()

const mensajeExito = ref('')

const form = reactive({
  asunto: '',
  descripcion: '',
  prioridad: 'baja',
  solicitante: '',
})

const formularioCompleto = computed(() => {
  return (
    form.asunto.trim() !== '' &&
    form.descripcion.trim() !== '' &&
    form.prioridad.trim() !== '' &&
    form.solicitante.trim() !== ''
  )
})

async function handleSubmit() {
  if (!estaAutenticado.value || !formularioCompleto.value || creandoTicket.value) return

  mensajeExito.value = ''
  limpiarErroresFormulario()

  const resultado = await crearNuevoTicket({
    asunto: form.asunto,
    descripcion: form.descripcion,
    prioridad: form.prioridad,
    solicitante: form.solicitante,
  })

  if (resultado.ok) {
    mensajeExito.value = 'Ticket creado correctamente.'

    form.asunto = ''
    form.descripcion = ''
    form.prioridad = 'baja'
    form.solicitante = ''

    setTimeout(() => {
      mensajeExito.value = ''
      router.push('/')
    }, 1200)
  }
}
</script>

<template>
  <section class="page">
    <h1>Nuevo ticket</h1>

    <p v-if="!estaAutenticado" class="mensaje-error">
      Debes iniciar sesión para crear un ticket.
    </p>

    <form v-else class="ticket-form" @submit.prevent="handleSubmit">
      <div class="campo">
        <label for="asunto">Asunto</label>
        <input id="asunto" v-model="form.asunto" type="text" />
        <p v-if="erroresFormulario.asunto" class="campo__error">
          {{ erroresFormulario.asunto }}
        </p>
      </div>

      <div class="campo">
        <label for="descripcion">Descripción</label>
        <textarea id="descripcion" v-model="form.descripcion" rows="5" />
        <p v-if="erroresFormulario.descripcion" class="campo__error">
          {{ erroresFormulario.descripcion }}
        </p>
      </div>

      <div class="campo">
        <label for="prioridad">Prioridad</label>
        <select id="prioridad" v-model="form.prioridad">
          <option value="baja">baja</option>
          <option value="media">media</option>
          <option value="alta">alta</option>
        </select>
        <p v-if="erroresFormulario.prioridad" class="campo__error">
          {{ erroresFormulario.prioridad }}
        </p>
      </div>

      <div class="campo">
        <label for="solicitante">Solicitante</label>
        <input id="solicitante" v-model="form.solicitante" type="text" />
        <p v-if="erroresFormulario.solicitante" class="campo__error">
          {{ erroresFormulario.solicitante }}
        </p>
      </div>

      <p v-if="mensajeExito" class="mensaje-exito">
        {{ mensajeExito }}
      </p>

      <button
        class="btn btn--primary"
        type="submit"
        :disabled="!formularioCompleto || creandoTicket"
      >
        {{ creandoTicket ? 'Guardando...' : 'Crear ticket' }}
      </button>
    </form>
  </section>
</template>