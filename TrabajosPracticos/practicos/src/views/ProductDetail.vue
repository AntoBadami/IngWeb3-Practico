
<template>
  <v-container>
    <v-row>
      <v-col cols="12" md="8" class="mx-auto">
        <v-card class="pa-4">
          <v-card-title>
            <div v-if="product">{{ product.name }}</div>
            <div v-else>Producto no encontrado</div>
          </v-card-title>

          <v-card-text>
            <div v-if="product">
              <p><strong>Precio:</strong> {{ formatCurrency(product.price) }}</p>
              <p><strong>Stock:</strong> {{ product.stock }}</p>
              <p><strong>ID:</strong> {{ product.id }}</p>
              <p v-if="product.description"><strong>Descripción:</strong> {{ product.description }}</p>
            </div>

            <div v-else>
              <v-alert type="error" dense>Producto no encontrado.</v-alert>
            </div>
          </v-card-text>

          <v-card-actions>
            <v-btn text @click="goBack">Volver</v-btn>
            <v-spacer />
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import productsData from '../data/exampleProducts'

const route = useRoute()
const router = useRouter()
const id = Number(route.params.id)
const product = ref(null)

function formatCurrency(v) {
  try {
    return new Intl.NumberFormat('es-AR', { style: 'currency', currency: 'ARS', maximumFractionDigits: 0 }).format(v)
  } catch {
    return '$' + v
  }
}

onMounted(() => {
  const p = productsData.find(x => Number(x.id) === Number(id))
  if (p) product.value = p
})

function goBack() {
  // Intentar volver a la lista restaurando scroll
  router.push({ name: 'Productos' })
}

function addToCart() {
  if (!product.value) return
  // Evento global simple que ProductList escucha
  window.dispatchEvent(new CustomEvent('add-to-cart-from-detail', { detail: { id: product.value.id } }))

  router.push({ name: 'Productos' })
}
</script>

<style scoped>
</style>
