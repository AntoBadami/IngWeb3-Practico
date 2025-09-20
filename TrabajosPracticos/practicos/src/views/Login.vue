
<template>
  <v-container class="fill-height d-flex align-center justify-center">
    <v-row>
      <v-col cols="12">
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

                <v-btn text small @click="fillTestCredentials" aria-label="Rellenar credenciales">
                  Usar credenciales
                </v-btn>
              </div>
            </form>
          </v-card-text>

          <v-card-actions class="justify-center">
            <small class="text-muted">Si no tenés cuenta usá: <strong>test@example.com / secret123</strong></small>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useAuth } from '../composables/useAuth'

const auth = useAuth()
const router = useRouter()
const route = useRoute()

const email = ref('')
const password = ref('')
const submitError = ref('')

const emailError = computed(() => {
  if (!email.value) return 'El email es obligatorio'
  // validación simple de email
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!re.test(email.value)) return 'Formato de email inválido'
  return ''
})

const passwordError = computed(() => {
  if (!password.value) return 'La contraseña es obligatoria'
  if (password.value.length < 6) return 'La contraseña debe tener al menos 6 caracteres'
  return ''
})

const formIsValid = computed(() => !emailError.value && !passwordError.value)

async function onSubmit() {
  submitError.value = ''
  if (!formIsValid.value) return
  try {
    await auth.login(email.value.trim(), password.value)
    // redirigir al destino original si existe
    const redirect = route.query.redirect || '/'
    router.replace(redirect)
  } catch (e) {
    // mostrar mensaje legible
    submitError.value = e?.message || 'Error al autenticarse'
  }
}

function fillTestCredentials() {
  email.value = 'juan@gmail.com'
  password.value = '12345678'
}
</script>

<style scoped>
.v-card { border-radius: 1.25rem; } /* radius 2xl feel */
</style>
