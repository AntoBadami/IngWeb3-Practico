
<template>
  <v-container class="pa-4">
    <v-row>
      <v-col cols="12">
        <v-card elevation="2" class="pa-4">
          <v-card-title>Bienvenido</v-card-title>
          <v-card-text>
            <div v-if="auth.state.user">
              Estás autenticado como: <strong>{{ auth.state.user.email }}</strong>
            </div>
            <div v-else>
              No estás autenticado. Ir a <router-link to="/login">login</router-link>.
            </div>

            <p class="mt-4">
              Aquí va tu pantalla principal (productos, etc.). Reemplazá este contenido por lo tuyo.
            </p>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { useAuth } from '../composables/useAuth'
const auth = useAuth()
</script>

<style scoped>
</style>
