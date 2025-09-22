
<template>
  <v-card :class="{ 'out-of-stock': product.stock === 0 }" elevation="2">
    <v-card-title class="text-h6">{{ product.name }}</v-card-title>

    <v-card-text>
      <div>Precio: {{ formatCurrency(product.price) }}</div>
      <div v-if="product.stock > 0">Stock: {{ product.stock }}</div>
      <div v-else class="font-weight-bold">Sin stock</div>
    </v-card-text>

    <v-card-actions>
      <v-btn text small @click="$emit('view-detail', product.id)" :aria-label="`Ver detalle de ${product.name}`">Ver detalle</v-btn>
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
  cartQty: { type: Number, default: 0 }
});

function formatCurrency(value) {
  try {
    return new Intl.NumberFormat('es-AR', {
      style: 'currency',
      currency: 'ARS',
      maximumFractionDigits: 0
    }).format(value);
  } catch {
    return `$${value}`;
  }
}
</script>

<style scoped>
.out-of-stock {
  opacity: 0.65;
  border: 1px dashed rgba(211, 47, 47, 0.6);
  position: relative;
  transition: opacity 0.15s ease;
}
.out-of-stock::after {
  content: "Sin stock";
  position: absolute;
  right: 8px;
  top: 8px;
  background: rgba(211,47,47,0.95);
  color: white;
  font-size: 11px;
  padding: 3px 7px;
  border-radius: 6px;
}
</style>
