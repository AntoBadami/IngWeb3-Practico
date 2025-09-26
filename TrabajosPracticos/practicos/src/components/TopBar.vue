<template>
  <v-app-bar color="primary" dark app elevation="2">
    <v-container>
      <v-row no-gutters class="fill-height align-center">
        <v-col cols="auto" class="d-flex align-center">
          <img src="../assets/logo.png" alt="logo" style="height:48px; margin-right:8px;" />
          <span class="text-h6">Shop</span>
        </v-col>

        <v-spacer />

        <!-- acciones (no se muestran en /login ni /register) -->
        <div v-if="showActions" class="d-flex align-center">
          <v-btn text small class="ml-2" @click="onLogout">Salir</v-btn>
        </div>
      </v-row>
    </v-container>
  </v-app-bar>
</template>

<script setup>
import { inject, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useAuth } from '@/composables/useAuth' 

const cart = inject('cart') 
const route = useRoute()
const router = useRouter()
const auth = useAuth()

const showActions = computed(() => {
  const hide = ['/login', '/register']
  return !hide.includes(route.path)
})


function onLogout() {
  auth.logout && auth.logout()
  router.replace({ path: '/login' })
}
</script>

<style scoped>
/* estilos simples */
.v-app-bar { padding-left: 12px; padding-right: 12px; }
</style>
