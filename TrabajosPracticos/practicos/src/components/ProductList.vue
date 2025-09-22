<template>
  <v-container>
    <v-row class="mb-4">
      <v-col cols="8">
        <v-text-field
          label="Buscar"
          v-model="search"
          clearable
          prepend-inner-icon="mdi-magnify"
          aria-label="Buscar productos"
        />
      </v-col>

      <v-col cols="auto" class="d-flex align-center">
        <v-btn icon @click="drawer = !drawer" :title="drawer ? 'Cerrar carrito' : 'Abrir carrito'">
          <v-icon>{{ drawer ? 'mdi-cart-off' : 'mdi-cart' }}</v-icon>
        </v-btn>

        <v-btn text small class="ml-2" @click="onLogout">Salir</v-btn>
      </v-col>
    </v-row>

    <v-row dense>
      <v-col
        v-for="product in filteredProducts"
        :key="product.id"
        cols="12"
        sm="6"
      >
        <ProductCard
          :product="product"
          :cartQty="cartQty(product.id)"
          @add-to-cart="addToCart"
          @view-detail="goToDetail"
        />
      </v-col>

      <v-col cols="12" v-if="filteredProducts.length === 0">
        <v-alert type="info">
          <span v-if="products.length === 0">No hay productos registrados.</span>
          <span v-else>No se encontraron productos que coincidan con la búsqueda.</span>
        </v-alert>
      </v-col>
    </v-row>

    <!-- Drawer del carrito -->
    <CartDrawer
      v-model:open="drawer"
      :cartDetails="cartDetails"
      :totalPrice="totalPrice"
      @increment="incrementQty"
      @decrement="decrementQty"
      @remove="removeItem"
      @clear="clearCart"
    />
  </v-container>
</template>

<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'
import { useRouter } from 'vue-router'
import ProductCard from './ProductCard.vue'
import CartDrawer from './CartDrawer.vue'
import productsData from '../data/exampleProducts' 

const products = ref(productsData || [])
const search = ref('')
const drawer = ref(false)

const cart = ref([]) // {id, qty, price, name}

// productos filtrados
const filteredProducts = computed(() => {
  const q = String(search.value || '').trim().toLowerCase()
  if (!q) return products.value
  return products.value.filter(p => String(p.name).toLowerCase().includes(q))
})

function cartQty(id) {
  const it = cart.value.find(i => i.id === id)
  return it ? it.qty : 0
}

function addToCart(id) {
  const existing = cart.value.find(i => i.id === id)
  const p = products.value.find(x => x.id === id)
  if (!p) return
  if (!existing) cart.value.push({ id: p.id, qty: 1, price: p.price, name: p.name })
  else existing.qty += 1
}

function incrementQty(id) {
  const it = cart.value.find(i => i.id === id)
  if (it) it.qty += 1
}

function decrementQty(id) {
  const it = cart.value.find(i => i.id === id)
  if (!it) return
  it.qty -= 1
  if (it.qty <= 0) {
    cart.value = cart.value.filter(x => x.id !== id)
  }
}

function removeItem(id) {
  cart.value = cart.value.filter(x => x.id !== id)
}
function clearCart() {
  cart.value = []
}

const cartDetails = computed(() => {
  return cart.value.map(i => ({ ...i }))
})

const totalPrice = computed(() => {
  return cart.value.reduce((acc, i) => acc + (i.price * i.qty), 0)
})

/* Navegación a detalle con conservación de scroll */
const router = useRouter()

function goToDetail(id) {
  try {
    sessionStorage.setItem('products_scroll', String(window.scrollY || 0))
  } catch (e) { }
  router.push({ name: 'ProductoDetalle', params: { id } })
}

/* Escuchar evento global desde el detalle para agregar al carrito */
function onAddFromDetail(e) {
  const id = e?.detail?.id
  if (typeof id !== 'undefined') addToCart(id)
}

onMounted(() => {
  window.addEventListener('add-to-cart-from-detail', onAddFromDetail)
})

onBeforeUnmount(() => {
  window.removeEventListener('add-to-cart-from-detail', onAddFromDetail)
})

/* Logout */
import { useAuth } from '../composables/useAuth'
const auth = useAuth()
function onLogout() {
  auth.logout()
  router.replace({ path: '/login' })
}
</script>

<style scoped>
</style>
