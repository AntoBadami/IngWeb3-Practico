<template>
  <v-container class="d-flex flex-column align-center justify-center" style="height: 100vh;">
    <v-card class="pa-6" elevation="6" width="400">
      <h2 class="text-center mb-4">Registro Rápido de Cliente</h2>

      <!-- Campo de texto -->
      <v-text-field
        v-model="nombre"
        label="Nombre del cliente"
        outlined
        clearable
        prepend-inner-icon="mdi-account"
      ></v-text-field>

      <!-- Boton de registro -->
      <v-btn
        class="mt-4"
        color="primary"
        block
        @click="registrarCliente"
      >
        Registrar
      </v-btn>

      <!-- confirmacion -->
      <v-alert
        v-if="mensaje"
        type="success"
        class="mt-4"
        border="start"
        elevation="2"
      >
        {{ mensaje }}
      </v-alert>
    </v-card>
  </v-container>
</template>

<script setup>
import { ref } from 'vue'

const nombre = ref('')
const mensaje = ref('')

function registrarCliente() {
  if (nombre.value.trim() !== '') {
    mensaje.value = `Bienvenido/a, ${nombre.value}!`
    console.log(`Cliente registrado: ${nombre.value}`)
    nombre.value = '' // limpiar campo
  } else {
    mensaje.value = 'Por favor ingresa un nombre válido.'
  }
}
</script>
