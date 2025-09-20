
import { reactive, computed } from 'vue'
import * as authService from '../services/authService'

const STATE_KEY = 'app_auth_v1'

const state = reactive({
  user: null,
  token: null,
  loading: false
})

/**
 * Restaurar estado desde localStorage.
 * Si el token no es válido según authService.validateToken => limpiar storage.
 */
function restore() {
  try {
    const raw = localStorage.getItem(STATE_KEY)
    if (!raw) {
      console.debug('[auth] no hay estado en localStorage')
      return
    }

    const parsed = JSON.parse(raw)
    if (!parsed || !parsed.token) {
      console.debug('[auth] formato inesperado en localStorage, limpiando')
      localStorage.removeItem(STATE_KEY)
      return
    }

    // Validar token con el servicio (mock)
    const valid = authService.validateToken(parsed.token)
    if (!valid) {
      console.debug('[auth] token inválido según authService.validateToken, limpiando localStorage')
      localStorage.removeItem(STATE_KEY)
      // asegurarse de que state esté limpio
      state.user = null
      state.token = null
      return
    }

    // Token válido: restaurar estado
    state.user = parsed.user
    state.token = parsed.token
    console.debug('[auth] sesión restaurada desde localStorage:', state.user?.email ?? '(sin email)')
  } catch (err) {
    console.debug('[auth] error al parsear localStorage, limpiando:', err)
    localStorage.removeItem(STATE_KEY)
    state.user = null
    state.token = null
  }
}

async function login(email, password) {
  state.loading = true
  try {
    const res = await authService.loginApi({ email, password })
    state.user = res.user
    state.token = res.token
    localStorage.setItem(STATE_KEY, JSON.stringify({ user: state.user, token: state.token }))
    state.loading = false
    console.debug('[auth] login OK:', state.user.email)
    return state.user
  } catch (e) {
    state.loading = false
    console.debug('[auth] login FAILED:', e?.message ?? e)
    throw e
  }
}

function logout() {
  state.user = null
  state.token = null
  localStorage.removeItem(STATE_KEY)
  console.debug('[auth] logout: estado limpio')
}

const isAuthenticated = computed(() => !!state.user && !!state.token)

export function useAuth() {
  return {
    state,
    restore,
    login,
    logout,
    isAuthenticated
  }
}
