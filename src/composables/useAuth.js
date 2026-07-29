import { ref, computed } from 'vue'
import { login as loginRequest } from '../services/authService'

const token = ref(localStorage.getItem('token') || null)
const usuario = ref(null)

function decodePayload(jwt) {
  try {
    const payload = jwt.split('.')[1]
    return JSON.parse(atob(payload))
  } catch {
    return null
  }
}

if (token.value) {
  const payload = decodePayload(token.value)

  if (payload) {
    usuario.value = {
      username: payload.username,
      rol: payload.rol,
    }
  }
}

export function useAuth() {
  const estaAutenticado = computed(() => !!token.value)

  async function iniciarSesion(username, password) {
    const { data } = await loginRequest(username, password)

    token.value = data.token
    localStorage.setItem('token', data.token)

    const payload = decodePayload(data.token)

    usuario.value = {
      username: payload?.username ?? data.usuario?.username,
      rol: payload?.rol ?? data.usuario?.rol,
    }
  }

  function cerrarSesion() {
    token.value = null
    usuario.value = null
    localStorage.removeItem('token')
  }

  return {
    token,
    usuario,
    estaAutenticado,
    iniciarSesion,
    cerrarSesion,
  }
}