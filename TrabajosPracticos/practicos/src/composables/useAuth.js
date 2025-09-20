
import { reactive, computed } from 'vue'
import * as authService from '../services/authService'

const STATE_KEY = 'app_auth_v1'

const state = reactive({
  user: null,
  token: null,
  loading: false
})

function restore() {
  const raw = localStorage.getItem(STATE_KEY)
  if (!raw) return
  try {
    const parsed = JSON.parse(raw)
    if (parsed?.user && parsed?.token && authService.validateToken(parsed.token)) {
      state.user = parsed.user
      state.token = parsed.token
    }
  } catch (e) {
    // si el JSON está corrupto, limpiar
    localStorage.removeItem(STATE_KEY)
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
    return state.user
  } catch (e) {
    state.loading = false
    throw e
  }
}

function logout() {
  state.user = null
  state.token = null
  localStorage.removeItem(STATE_KEY)
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
