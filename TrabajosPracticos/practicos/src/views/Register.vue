
<template>
  <v-container class="fill-height d-flex align-center justify-center">
  <v-row>
    <v-col cols="12" class="d-flex justify-center">
      <v-card class="pa-6" elevation="6" max-width="420" style="border-radius: 1rem;">
          <v-card-title class="text-h6">Registro rápido</v-card-title>

          <v-card-text>
            <!-- Mensaje de éxito -->
            <v-alert v-if="submitSuccess" type="success" dense class="mb-4">
              {{ submitSuccess }}
            </v-alert>

            <!-- Mensaje de error -->
            <v-alert v-if="submitError" type="error" dense class="mb-4">
              {{ submitError }}
            </v-alert>

            <form v-if="!submitSuccess" @submit.prevent="onSubmit" novalidate>
              <v-text-field
                v-model="name"
                label="Nombre"
                :error="!!nameError && attempted"
                :error-messages="attempted && nameError ? [nameError] : []"
                aria-label="Nombre completo"
                required
                clearable
              />

              <v-text-field
                v-model="email"
                label="Email"
                type="email"
                :error="!!emailError && attempted"
                :error-messages="attempted && emailError ? [emailError] : []"
                aria-label="Email"
                required
                clearable
                autocomplete="email"
              />

              <v-text-field
                v-model="password"
                label="Contraseña"
                type="password"
                :error="!!passwordError && attempted"
                :error-messages="attempted && passwordError ? [passwordError] : []"
                aria-label="Contraseña"
                required
                clearable
                autocomplete="new-password"
              />

              <div class="d-flex align-center justify-space-between mt-4">
                <v-btn
                  :disabled="authLoading || !formIsValid"
                  :loading="authLoading"
                  type="submit"
                  elevation="2"
                >
                  Registrarme
                </v-btn>

                <v-btn text small @click="goLogin">Volver al login</v-btn>
              </div>
            </form>

            <!-- Si hay submitSuccess, muestra un botón para volver al login -->
            <div v-else class="mt-4 d-flex justify-center">
              <v-btn color="primary" @click="goLogin">Ir al login</v-btn>
            </div>
          </v-card-text>

        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import * as authService from '../services/authService'

const router = useRouter()

const name = ref('')
const email = ref('')
const password = ref('')
const attempted = ref(false)
const submitError = ref('')
const submitSuccess = ref('')
const authLoading = ref(false)

const nameError = computed(() => {
  if (!name.value) return 'El nombre es obligatorio'
  if (String(name.value).trim().length < 3) return 'El nombre debe tener al menos 3 caracteres'
  return ''
})

const emailError = computed(() => {
  if (!email.value) return 'El email es obligatorio'
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!re.test(email.value)) return 'Formato de email inválido'
  return ''
})

const passwordError = computed(() => {
  if (!password.value) return 'La contraseña es obligatoria'
  if (password.value.length < 6) return 'La contraseña debe tener al menos 6 caracteres'
  return ''
})

const formIsValid = computed(() => {
  return !nameError.value && !emailError.value && !passwordError.value
})

async function onSubmit() {
  attempted.value = true
  submitError.value = ''
  submitSuccess.value = ''

  // Validar todos los campos 
  if (!formIsValid.value) {
    submitError.value = 'Por favor completá correctamente todos los campos.'
    return
  }

  authLoading.value = true
  try {
    // valida duplicados y guarda en localStorage
    const user = await authService.registerApi({
      name: name.value,
      email: email.value,
      password: password.value
    })

    console.log('[Registro] usuario creado:', user)

    // Mostrar mensaje de éxito 
    submitSuccess.value = `¡Registro exitoso! Bienvenido, ${user.name}.`
  } catch (e) {
    submitError.value = e?.message || 'Error al registrar'
  } finally {
    authLoading.value = false
  }
}

function goLogin() {
  router.push({ path: '/login' })
}
</script>

<style scoped>
.v-card { border-radius: 1.25rem; }
</style>
