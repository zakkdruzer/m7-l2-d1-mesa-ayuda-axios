import { ref, computed } from 'vue'
import { login as loginRequest } from '../services/authService'

const token = ref(localStorage.getItem('token') || null)

const usuarioGuardado = localStorage.getItem('usuario')
const usuario = ref(usuarioGuardado ? JSON.parse(usuarioGuardado) : null)

const cargandoLogin = ref(false)
const errorLogin = ref('')

function decodePayload(jwt) {
  try {
    const payload = jwt.split('.')[1]
    return JSON.parse(atob(payload))
  } catch {
    return null
  }
}

if (token.value && !usuario.value) {
  const payload = decodePayload(token.value)

  if (payload) {
    usuario.value = {
      username: payload.username ?? payload.usuario ?? '',
      rol: payload.rol ?? payload.role ?? '',
    }
  }
}

export function useAuth() {
  const estaAutenticado = computed(() => !!token.value)

  async function iniciarSesion({ username, password, duracionMinutos }) {
    cargandoLogin.value = true
    errorLogin.value = ''

    try {
      const { data } = await loginRequest(username, password, duracionMinutos)

      token.value = data.token
      localStorage.setItem('token', data.token)

      if (data.usuario) {
        usuario.value = {
          username: data.usuario.username,
          rol: data.usuario.rol,
        }
      } else {
        const payload = decodePayload(data.token)
        usuario.value = payload
          ? {
              username: payload.username ?? payload.usuario ?? '',
              rol: payload.rol ?? payload.role ?? '',
            }
          : null
      }

      if (usuario.value) {
        localStorage.setItem('usuario', JSON.stringify(usuario.value))
      }

      return { ok: true }
    } catch (error) {
      if (error.response?.status === 401) {
        errorLogin.value = 'Usuario o contraseña incorrectos.'
      } else {
        errorLogin.value = 'No se pudo iniciar sesión.'
      }

      return { ok: false, error }
    } finally {
      cargandoLogin.value = false
    }
  }

  function cerrarSesion() {
    token.value = null
    usuario.value = null
    errorLogin.value = ''
    localStorage.removeItem('token')
    localStorage.removeItem('usuario')
  }

  return {
    token,
    usuario,
    cargandoLogin,
    errorLogin,
    estaAutenticado,
    iniciarSesion,
    cerrarSesion,
  }
}