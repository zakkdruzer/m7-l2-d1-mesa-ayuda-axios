<script setup>
import { useRouter } from 'vue-router'
import { useAuth } from '../composables/useAuth'

const router = useRouter()

const {
  usuario,
  estaAutenticado,
  cerrarSesion,
} = useAuth()

function salir() {
  cerrarSesion()
  router.push('/login')
}
</script>

<template>
  <nav class="navbar">
    <router-link to="/" class="navbar__brand">
      Mesa de Ayuda
    </router-link>

    <div class="navbar__right">
      <span v-if="usuario" class="navbar__user">
        {{ usuario.username }} ({{ usuario.rol }})
      </span>

      <template v-if="estaAutenticado">
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