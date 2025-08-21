<template>
  <div class="registro-cliente">
    <h2>Registro Rápido de Clientes</h2>

    <!-- Campo de texto con v-model -->
    <input
      v-model="nombre"
      type="text"
      placeholder="Ingrese nombre del cliente"
    />

    <!-- Botón de registro -->
    <button @click="registrarCliente">Registrar</button>

    <!-- Mensaje de confirmación -->
    <p v-if="mensaje" class="mensaje">{{ mensaje }}</p>
  </div>
</template>

<script setup>
import { ref } from 'vue'

// Estado con ref()
const nombre = ref('')
const mensaje = ref('')

// Función para registrar cliente
function registrarCliente() {
  if (nombre.value.trim() !== '') {
    // Simulación de "guardar en BD"
    console.log('Cliente registrado:', nombre.value)

    // Mostrar mensaje de confirmación
    mensaje.value = `¡Bienvenido/a, ${nombre.value}!`

    // Reiniciar input
    nombre.value = ''
  } else {
    mensaje.value = 'Por favor ingrese un nombre válido.'
  }
}
</script>

<style scoped>
.registro-cliente {
  max-width: 400px;
  margin: auto;
  padding: 20px;
  border: 2px solid #4caf50;
  border-radius: 10px;
  text-align: center;
  font-family: Arial, sans-serif;
  background-color: #f9fff9;
}

input {
  padding: 8px;
  width: 80%;
  margin-bottom: 10px;
  border: 1px solid #aaa;
  border-radius: 5px;
}

button {
  background-color: #4caf50;
  color: white;
  padding: 8px 15px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

button:hover {
  background-color: #45a049;
}

.mensaje {
  margin-top: 15px;
  font-weight: bold;
  color: #2e7d32;
}
</style>
