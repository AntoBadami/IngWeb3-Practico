<template>
  <div class="cart-card">
    <h3>Carrito</h3>

    <p v-if="cart.length === 0" class="vacio">El carrito está vacío.</p>

    <table v-else class="cart-table">
      <thead>
        <tr>
          <th>Producto</th>
          <th>Cantidad</th>
          <th>Precio</th>
          <th>Subtotal</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in cart" :key="item.id">
          <td>{{ item.nombre }}</td>
          <td class="qty-ctrl">
            <button @click="$emit('decrement', item.id)">−</button>
            <span class="qty">{{ item.cantidad }}</span>
            <button @click="$emit('increment', item.id)">+</button>
          </td>
          <td>${{ item.precio }}</td>
          <td>${{ (item.precio * item.cantidad).toFixed(2) }}</td>
          <td><button class="rm" @click="$emit('remove', item.id)">Eliminar</button></td>
        </tr>
      </tbody>
    </table>

    <div v-if="cart.length" class="total-row">
      <div>Total:</div>
      <div class="total-value">${{ total.toFixed(2) }}</div>
    </div>
  </div>
</template>

<script setup>
/* Props y computed para total */
const props = defineProps({
  cart: { type: Array, required: true }
})

import { computed } from 'vue'
const total = computed(() => {
  return props.cart.reduce((sum, it) => sum + (it.precio * it.cantidad), 0)
})
</script>

<!-- CSS separado sólo para este componente -->
<style scoped src="./Cart.css"></style>
