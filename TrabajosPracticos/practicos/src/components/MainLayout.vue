
<template>
  <v-app>
    <v-app-bar app elevated>
      <v-toolbar-title class="mr-4">App</v-toolbar-title>

      <v-spacer />

      <div v-if="auth.state.user" class="d-flex align-center">
        <v-icon small class="mr-2">mdi-account-circle</v-icon>
        <div class="mr-4" aria-live="polite">{{ auth.state.user.email }}</div>

        <v-btn text @click="onLogout" aria-label="Salir">
          Salir
        </v-btn>
      </div>
    </v-app-bar>

    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { useAuth } from '../composables/useAuth'

const auth = useAuth()
const router = useRouter()

function onLogout() {
  auth.logout()
  router.replace({ path: '/login' })
}
</script>

<style scoped>
</style>
