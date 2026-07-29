import { ref, computed } from 'vue'
import { login as loginRequest } from '@/services/authService'

// Estado fuera de la función → es compartido entre todos los componentes
// que importen este composable (singleton)
const token   = ref(localStorage.getItem('token') || null)
const usuario = ref(null)

// Rehidrata el usuario si ya había sesión al recargar
function decodePayload(t) {
  try { return JSON.parse(atob(t.split('.')[1])) }
  catch { return null }
}

if (token.value) {
  const p = decodePayload(token.value)
  if (p) usuario.value = { username: p.username, rol: p.rol }
}

export function useAuth() {
  const estaAutenticado = computed(() => !!token.value)

  async function iniciarSesion(username, password) {
    const { data } = await loginRequest(username, password)
    token.value = data.token
    localStorage.setItem('token', data.token)
    const p = decodePayload(data.token)
    usuario.value = { username: p?.username, rol: p?.rol }
  }

  function cerrarSesion() {
    token.value   = null
    usuario.value = null
    localStorage.removeItem('token')
  }

  return { token, usuario, estaAutenticado, iniciarSesion, cerrarSesion }
}