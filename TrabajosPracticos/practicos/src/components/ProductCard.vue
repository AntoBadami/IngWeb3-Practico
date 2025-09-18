<template>
  <v-card :class="{ 'out-of-stock': product.stock === 0 }" elevation="2">
    <v-card-title class="text-h6">{{ product.name }}</v-card-title>
    <v-card-text>
      <div>Precio: ${{ product.price }}</div>
      <div v-if="product.stock > 0">Stock: {{ product.stock }}</div>
      <div v-else class="font-weight-bold">Sin stock</div>
    </v-card-text>

    <v-card-actions>
      <v-spacer />
      <v-btn
        small
        :disabled="product.stock === 0 || cartQty >= product.stock"
        @click="$emit('add-to-cart', product.id)"
      >
        Agregar al carrito
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script setup>
const props = defineProps({
  product: { type: Object, required: true },
  cartQty: { type: Number, default: 0 } // cantidad actual en el carrito para este producto
});
</script>

<style scoped>
.out-of-stock {
  opacity: 0.6;
  text-decoration: line-through;
}
</style>
