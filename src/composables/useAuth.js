import { ref, computed } from 'vue'
import { login as loginRequest } from '../services/authService'

const token = ref(localStorage.getItem('token') || null)
const usuario = ref(null)
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

  async function iniciarSesion({ username, password, duracionMinutos }) {
    console.log('1. iniciarSesion ejecutada')
    cargandoLogin.value = true
    errorLogin.value = ''

    try {
      console.log('2. antes del loginRequest')

      const { data } = await loginRequest(username, password, duracionMinutos)

      console.log('3. respuesta login:', data)

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
              username: payload.username,
              rol: payload.rol,
            }
          : null
      }

      return { ok: true }
    } catch (error) {
      console.log('4. error login:', error)

      if (error.response?.status === 401) {
        errorLogin.value = 'Usuario o contraseña incorrectos.'
      } else {
        errorLogin.value = 'No se pudo iniciar sesión.'
      }

      return { ok: false, error }
    } finally {
      console.log('5. finally login')
      cargandoLogin.value = false
    }
  }

  function cerrarSesion() {
    token.value = null
    usuario.value = null
    errorLogin.value = ''
    localStorage.removeItem('token')
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