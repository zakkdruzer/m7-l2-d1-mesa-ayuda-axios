<script setup>
import { useRouter } from 'vue-router'
import { useAuth } from '@/composables/useAuth'

const router = useRouter()
const auth = useAuth()

function salir() {
  auth.cerrarSesion()
  router.push('/login')
}
</script>

<template>
  <nav class="navbar">
    <router-link to="/" class="navbar__brand">Mesa de Ayuda</router-link>

    <div class="navbar__right">
      <template v-if="auth.estaAutenticado">
        <span class="navbar__user">
          {{ auth.usuario?.username }} ({{ auth.usuario?.rol }})
        </span>
        <router-link to="/nuevo-ticket" class="btn btn--secondary">
          Nuevo ticket
        </router-link>
        <button class="btn btn--ghost" @click="salir">
          Cerrar sesión
        </button>
      </template>

      <template v-else>
        <router-link to="/login" class="btn btn--primary">
          Iniciar sesión
        </router-link>
      </template>
    </div>
  </nav>
</template>