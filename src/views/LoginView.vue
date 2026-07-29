<script setup>
import { computed, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { useAuth } from '../composables/useAuth'

const router = useRouter()

const {
  iniciarSesion,
  cargandoLogin,
  errorLogin,
} = useAuth()

const form = reactive({
  username: '',
  password: '',
})

const formularioCompleto = computed(() => {
  return form.username.trim() !== '' && form.password.trim() !== ''
})

async function handleSubmit() {
  if (!formularioCompleto.value || cargandoLogin.value) return

  const resultado = await iniciarSesion({
    username: form.username,
    password: form.password,
  })

  if (resultado.ok) {
    router.push('/')
  }
}
</script>

<template>
  <section class="login-page">
    <h1>Iniciar sesión</h1>

    <form class="login-form" @submit.prevent="handleSubmit">
      <div class="campo">
        <label for="username">Usuario</label>
        <input
          id="username"
          v-model="form.username"
          type="text"
          autocomplete="username"
        />
      </div>

      <div class="campo">
        <label for="password">Contraseña</label>
        <input
          id="password"
          v-model="form.password"
          type="password"
          autocomplete="current-password"
        />
      </div>

      <p v-if="errorLogin" class="mensaje-error">
        {{ errorLogin }}
      </p>

      <button
        class="btn btn--primary"
        type="submit"
        :disabled="!formularioCompleto || cargandoLogin"
      >
        {{ cargandoLogin ? 'Ingresando...' : 'Entrar' }}
      </button>
    </form>
  </section>
</template>