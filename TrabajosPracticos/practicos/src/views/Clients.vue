
<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <v-card class="pa-4">
          <v-card-title>Clientes registrados</v-card-title>
          <v-card-text>
            <div v-if="users.length === 0">
              <v-alert type="info" dense>No hay clientes registrados.</v-alert>
            </div>

            <v-list v-else dense>
              <v-list-item v-for="u in users" :key="u.email">
                <v-list-item-content>
                  <v-list-item-title>{{ u.name }}</v-list-item-title>
                  <v-list-item-subtitle>{{ u.email }}</v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
            </v-list>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import * as authService from '../services/authService'

const users = ref([])

onMounted(() => {
  // authService.getAllUsers() debe devolver array con {name,email,...}
  const all = typeof authService.getAllUsers === 'function' ? authService.getAllUsers() : []
  // filtrar duplicados por email
  const map = new Map()
  all.forEach(u => {
    if (!map.has(u.email)) map.set(u.email, u)
  })
  users.value = Array.from(map.values())
})
</script>

<style scoped>
</style>
