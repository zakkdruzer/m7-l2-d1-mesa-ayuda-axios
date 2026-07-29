<script setup>
import { reactive, ref } from 'vue'
import { useAuth } from '../composables/useAuth'
import { useTickets } from '../composables/useTickets'

const auth = useAuth()
const ticketsState = useTickets()

const formulario = reactive({
  asunto: '',
  descripcion: '',
  prioridad: '',
  solicitante: '',
})

const exito = ref('')
const errorGeneral = ref('')

async function handleSubmit() {
  if (ticketsState.creandoTicket) return

  exito.value = ''
  errorGeneral.value = ''
  ticketsState.limpiarErroresFormulario()

  const response = await ticketsState.crearNuevoTicket({ ...formulario })

  if (response.ok) {
    formulario.asunto = ''
    formulario.descripcion = ''
    formulario.prioridad = ''
    formulario.solicitante = ''
    exito.value = 'Ticket creado correctamente.'
    setTimeout(() => {
      exito.value = ''
    }, 3000)
    return
  }

  if (response.error.response?.status !== 422) {
    errorGeneral.value = 'No se pudo crear el ticket.'
  }
}
</script>

<template>
  <section class="page">
    <h1>Nuevo ticket</h1>

    <p v-if="!auth.estaAutenticado" class="mensaje-error">
      Debes iniciar sesión para crear tickets.
    </p>

    <form v-else class="ticket-form" @submit.prevent="handleSubmit">
      <div class="form-group">
        <label for="asunto">Asunto</label>
        <input id="asunto" v-model="formulario.asunto" type="text" />
        <small v-if="ticketsState.erroresFormulario.asunto" class="mensaje-error">
          {{ ticketsState.erroresFormulario.asunto }}
        </small>
      </div>

      <div class="form-group">
        <label for="descripcion">Descripción</label>
        <textarea id="descripcion" v-model="formulario.descripcion" rows="5" />
        <small v-if="ticketsState.erroresFormulario.descripcion" class="mensaje-error">
          {{ ticketsState.erroresFormulario.descripcion }}
        </small>
      </div>

      <div class="form-group">
        <label for="prioridad">Prioridad</label>
        <select id="prioridad" v-model="formulario.prioridad">
          <option disabled value="">Selecciona una prioridad</option>
          <option value="baja">baja</option>
          <option value="media">media</option>
          <option value="alta">alta</option>
        </select>
        <small v-if="ticketsState.erroresFormulario.prioridad" class="mensaje-error">
          {{ ticketsState.erroresFormulario.prioridad }}
        </small>
      </div>

      <div class="form-group">
        <label for="solicitante">Solicitante</label>
        <input id="solicitante" v-model="formulario.solicitante" type="text" />
        <small v-if="ticketsState.erroresFormulario.solicitante" class="mensaje-error">
          {{ ticketsState.erroresFormulario.solicitante }}
        </small>
      </div>

      <p v-if="errorGeneral" class="mensaje-error">{{ errorGeneral }}</p>
      <p v-if="exito" class="mensaje-ok">{{ exito }}</p>

      <button
        class="btn btn--primary"
        type="submit"
        :disabled="ticketsState.creandoTicket"
      >
        {{ ticketsState.creandoTicket ? 'Creando...' : 'Crear ticket' }}
      </button>
    </form>
  </section>
</template>