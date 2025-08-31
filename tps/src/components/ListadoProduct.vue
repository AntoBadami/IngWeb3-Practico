<template>
  <div class="productos-card">
    <div class="card-header">
      <h2>Listado de Productos</h2>

      <div class="search-wrap">
        <input
          v-model="busqueda"
          type="search"
          placeholder="Buscar producto..."
          aria-label="Buscar producto"
        />
        <button v-if="busqueda" class="clear" @click="busqueda = ''" aria-label="Limpiar búsqueda">✕</button>
      </div>
    </div>

    <ul v-if="productosFiltrados.length" class="lista">
      <li
        v-for="producto in productosFiltrados"
        :key="producto.id"
        :class="{ 'sin-stock': producto.stock === 0 }"
      >
        <div class="left">
          <div class="nombre">{{ producto.nombre }}</div>
          <div class="meta">
            ${{ producto.precio }} ·
            <span class="badge" :class="{ 'agotado': producto.stock === 0 }">
              {{ producto.stock === 0 ? 'Agotado' : `Stock: ${producto.stock}` }}
            </span>
          </div>
        </div>

        <button
          class="add-btn"
          :disabled="producto.stock === 0"
          @click="onAdd(producto.id)"
        >
          Agregar al carrito
        </button>
      </li>
    </ul>

    <p v-else class="vacio">No se encontraron productos.</p>
  </div>
</template>

<script setup>
/* -> Importa la lógica desde el composable (archivo .js separado) */
import { ListadoProduct } from '../components/ListadoProduct.js'

/* defineEmits es una macro del compilador: úsala SIN importarla */
const emit = defineEmits(['add-to-cart'])

const { productos, busqueda, productosFiltrados } = ListadoProduct()

function onAdd(id) {
  emit('add-to-cart', id)
  console.log('ListadoProduct: emit add-to-cart', id)
}
</script>

<style scoped src="./ListadoProduct.css"></style>
