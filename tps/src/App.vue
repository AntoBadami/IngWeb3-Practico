<template>
  <main>
    <ListadoProduct @add-to-cart="handleAddToCart" />
    <Cart 
      :cart="cart"
      @increment="handleIncrement"
      @decrement="handleDecrement"
      @remove="handleRemove"
    />
  </main>
</template>

<script setup>
/* importá los componentes para que la plantilla los reconozca */
import ListadoProduct from './components/ListadoProduct.vue'
import Cart from './components/Cart.vue'

/* importá el estado y handlers (exportados desde App.setup.js) */
import { cart, handleAddToCart, handleIncrement, handleDecrement, handleRemove } from './App.setup.js'
</script>

<style scoped src="./App.css"></style>
