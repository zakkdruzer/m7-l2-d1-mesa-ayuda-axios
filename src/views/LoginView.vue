<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useAuth } from '@/composables/useAuth'

const router = useRouter()
const auth = useAuth()

const username = ref('')
const password = ref('')
const cargando = ref(false)
const errorMsg = ref('')

const formularioValido = computed(() => {
  return username.value.trim() !== '' && password.value.trim() !== ''
})

async function handleSubmit() {
  if (!formularioValido.value || cargando.value) return

  cargando.value = true
  errorMsg.value = ''

  try {
    await auth.iniciarSesion(username.value, password.value)
    password.value = ''
    router.push('/')
  } catch (error) {
    errorMsg.value =
      error.response?.status === 401
        ? 'Usuario o contraseña incorrectos.'
        : 'No se pudo iniciar sesión.'
  } finally {
    cargando.value = false
  }
}
</script>

<template>
  <section class="auth-page">
    <form class="auth-form" @submit.prevent="handleSubmit">
      <h1>Iniciar sesión</h1>

      <label for="username">Usuario</label>
      <input id="username" v-model="username" type="text" autocomplete="username" />

      <label for="password">Contraseña</label>
      <input id="password" v-model="password" type="password" autocomplete="current-password" />

      <p v-if="errorMsg" class="mensaje-error">{{ errorMsg }}</p>

      <button
        type="submit"
        class="btn btn--primary"
        :disabled="!formularioValido || cargando"
      >
        {{ cargando ? 'Ingresando...' : 'Ingresar' }}
      </button>
    </form>
  </section>
</template>