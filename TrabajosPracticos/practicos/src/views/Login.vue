<template>
  <v-container class="fill-height d-flex align-center justify-center">
  <v-row>
    <v-col cols="12" class="d-flex justify-center">
      <v-card class="pa-6" elevation="6" max-width="420" style="border-radius: 1rem;">
          <v-card-title class="text-h6">Ingresar</v-card-title>

          <v-card-text>
            <form @submit.prevent="onSubmit" novalidate>
              <v-text-field
                v-model="email"
                label="Email"
                type="email"
                :error="!!emailError"
                :error-messages="emailError ? [emailError] : []"
                aria-label="Email"
                required
                clearable
                autocomplete="username"
              />

              <v-text-field
                v-model="password"
                label="Contraseña"
                type="password"
                :error="!!passwordError"
                :error-messages="passwordError ? [passwordError] : []"
                aria-label="Contraseña"
                required
                autocomplete="current-password"
              />

              <v-alert v-if="submitError" type="error" dense class="mb-4">
                {{ submitError }}
              </v-alert>

              <div class="d-flex align-center justify-space-between">
                <v-btn
                  :disabled="!formIsValid || auth.state.loading"
                  :loading="auth.state.loading"
                  type="submit"
                  elevation="2"
                >
                  Ingresar
                </v-btn>

                <v-btn text small @click="goRegister" aria-label="Registrar usuario">
                  Registrar usuario
                </v-btn>
              </div>
            </form>
          </v-card-text>

          <v-card-actions class="justify-center">
            <small class="text-muted">Contactá al administrador si no tenés credenciales.</small>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useAuth } from '../composables/useAuth'

const auth = useAuth()
const router = useRouter()
const route = useRoute()

const email = ref('')
const password = ref('')
const submitError = ref('')

// Nuevo flag: solo mostrar validaciones después de intentar enviar
const attempted = ref(false)

const emailValidationMessage = () => {
  if (!email.value) return 'El email es obligatorio'
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!re.test(email.value)) return 'Formato de email inválido'
  return ''
}

const passwordValidationMessage = () => {
  if (!password.value) return 'La contraseña es obligatoria'
  if (password.value.length < 6) return 'La contraseña debe tener al menos 6 caracteres'
  return ''
}

//devolver mensaje si ya se intentó enviar el formulario
const emailError = computed(() => {
  if (!attempted.value) return ''
  return emailValidationMessage()
})

const passwordError = computed(() => {
  if (!attempted.value) return ''
  return passwordValidationMessage()
})

const formIsValid = computed(() => {
  return !emailValidationMessage() && !passwordValidationMessage()
})

// función para ir a registro
function goRegister() {
  router.push({ path: '/register' })
}

// limpiar mensaje de error de submit cuando usuario edita campos
watch([email, password], () => {
  if (submitError.value) submitError.value = ''
})

async function onSubmit() {
  attempted.value = true
  submitError.value = ''

  if (!formIsValid.value) {
    return
  }

  try {
    await auth.login(email.value.trim(), password.value)
    // redirigir a la página de productos
    const redirect = route.query.redirect || '/'
    router.replace(redirect)
  } catch (e) {
    // mostrar error 
    submitError.value = e?.message || 'Error al autenticarse'
  }
}
</script>

<style scoped>
.v-card { border-radius: 1.25rem; }
</style>
