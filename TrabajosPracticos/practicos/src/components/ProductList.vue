<template>
  <v-container>
    <v-row class="mb-4">
      <v-col cols="8">
        <v-text-field
          label="Buscar"
          variant="outlined"
          prepend-inner-icon="mdi-magnify"
          v-model="search"
        />
      </v-col>

      <v-col cols="auto" class="d-flex align-center">
        <v-btn icon @click="drawer = !drawer" :title="drawer ? 'Cerrar carrito' : 'Abrir carrito'">
          <v-icon>mdi-cart</v-icon>
        </v-btn>
        <v-badge :content="cartTotalItems" bordered v-if="cartTotalItems > 0" class="ml-2"/>
      </v-col>
    </v-row>

    <v-row dense>
      <v-col
        v-for="product in filteredProducts"
        :key="product.id"
        cols="12"
        sm="6"
        md="4"
      >
        <ProductCard
          :product="product"
          :cartQty="cartQty(product.id)"
          @add-to-cart="addToCart"
        />
      </v-col>
    </v-row>

    <v-row v-if="filteredProducts.length === 0">
      <v-col cols="12">
        <v-alert type="info">
          <span v-if="products.length === 0">No hay productos registrados.</span>
          <span v-else>No se encontraron productos que coincidan con "{{ search }}".</span>
        </v-alert>
      </v-col>
    </v-row>

    <!-- Drawer: carrito -->
    <CartDrawer
      v-model:open="drawer"
      :cartDetails="cartDetails"
      :totalPrice="cartTotalPrice"
      @increment="incrementQty"
      @decrement="decrementQty"
      @remove="removeFromCart"
      @clear="clearCart"
      @checkout="checkout"
    />
  </v-container>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue';
import productsData from '@/data/exampleProducts.js';
import ProductCard from '@/components/ProductCard.vue';
import CartDrawer from '@/components/CartDrawer.vue';

const STORAGE_KEY_CART = 'example-cart';

const products = ref([...productsData]); // copia de los ejemplos
const search = ref('');
const cart = ref([]); // [{id, qty}]
const drawer = ref(false);

// load cart
onMounted(() => {
  const raw = localStorage.getItem(STORAGE_KEY_CART);
  cart.value = raw ? JSON.parse(raw) : [];
});

// persist
watch(cart, (c) => {
  localStorage.setItem(STORAGE_KEY_CART, JSON.stringify(c));
}, { deep: true });

// filtered
const filteredProducts = computed(() => {
  const q = String(search.value || '').trim().toLowerCase();
  if (!q) return products.value;
  return products.value.filter(p => String(p.name).toLowerCase().includes(q));
});

// cart helpers
function findCartItem(id) { return cart.value.find(i => i.id === id); }
function cartQty(id) { const it = findCartItem(id); return it ? it.qty : 0; }

function addToCart(id) {
  const product = products.value.find(p => p.id === id);
  if (!product) return;
  const existing = findCartItem(id);
  if (existing) {
    if (existing.qty < product.stock) existing.qty += 1;
  } else {
    if (product.stock > 0) cart.value.push({ id, qty: 1 });
  }
}

function incrementQty(id) {
  const product = products.value.find(p => p.id === id);
  const existing = findCartItem(id);
  if (!product || !existing) return;
  if (existing.qty < product.stock) existing.qty += 1;
}
function decrementQty(id) {
  const existing = findCartItem(id);
  if (!existing) return;
  existing.qty -= 1;
  if (existing.qty <= 0) cart.value = cart.value.filter(i => i.id !== id);
}
function removeFromCart(id) {
  cart.value = cart.value.filter(i => i.id !== id);
}
function clearCart() { cart.value = []; }
function checkout() {
  alert(`Compra finalizada. Total: $${cartTotalPrice.value}`);
  clearCart();
}

// cartDetails & totals
const cartDetails = computed(() => {
  return cart.value.map(item => {
    const p = products.value.find(pp => pp.id === item.id) || {};
    const subtotal = (p.price || 0) * item.qty;
    return {
      id: item.id,
      name: p.name || 'Producto',
      price: p.price || 0,
      qty: item.qty,
      stock: p.stock || 0,
      subtotal
    };
  });
});
const cartTotalPrice = computed(() => cartDetails.value.reduce((s, it) => s + it.subtotal, 0));
const cartTotalItems = computed(() => cart.value.reduce((s, it) => s + it.qty, 0));
</script>

<style scoped>
/* estilos mínimos */
</style>
