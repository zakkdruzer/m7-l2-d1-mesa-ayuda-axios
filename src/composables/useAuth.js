import { ref, computed } from 'vue'
import { login as loginRequest } from '../services/authService'

const token = ref(localStorage.getItem('token') || null)

const usuarioGuardado = localStorage.getItem('usuario')
const usuario = ref(usuarioGuardado ? JSON.parse(usuarioGuardado) : null)

const cargandoLogin = ref(false)
const errorLogin = ref('')
const segundosRestantes = ref(0)

let timerId = null

function decodePayload(jwt) {
  try {
    const payload = jwt.split('.')[1]
    return JSON.parse(atob(payload))
  } catch {
    return null
  }
}

function actualizarTiempoRestante() {
  if (!token.value) {
    segundosRestantes.value = 0
    return
  }

  const payload = decodePayload(token.value)

  if (!payload?.exp) {
    segundosRestantes.value = 0
    return
  }

  const ahoraEnSegundos = Math.floor(Date.now() / 1000)
  const restante = payload.exp - ahoraEnSegundos

  segundosRestantes.value = restante > 0 ? restante : 0
}

function detenerTimerSesion() {
  if (timerId) {
    clearInterval(timerId)
    timerId = null
  }
}

function cerrarSesionInterno() {
  detenerTimerSesion()
  token.value = null
  usuario.value = null
  errorLogin.value = ''
  segundosRestantes.value = 0
  localStorage.removeItem('token')
  localStorage.removeItem('usuario')
}

function iniciarTimerSesion() {
  detenerTimerSesion()
  actualizarTiempoRestante()

  timerId = setInterval(() => {
    actualizarTiempoRestante()

    if (segundosRestantes.value <= 0 && token.value) {
      cerrarSesionInterno()
    }
  }, 1000)
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

if (token.value) {
  iniciarTimerSesion()
}

export function useAuth() {
  const estaAutenticado = computed(() => !!token.value)

  const tiempoSesionFormateado = computed(() => {
    const minutos = Math.floor(segundosRestantes.value / 60)
    const segundos = segundosRestantes.value % 60
    return `${minutos}:${String(segundos).padStart(2, '0')}`
  })

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

      iniciarTimerSesion()

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
    cerrarSesionInterno()
  }

  return {
    token,
    usuario,
    cargandoLogin,
    errorLogin,
    estaAutenticado,
    segundosRestantes,
    tiempoSesionFormateado,
    iniciarSesion,
    cerrarSesion,
  }
}