// src/App.setup.js
import { ref } from 'vue'

/* datos iniciales (puedes moverlos si querés) */
const products = [
  { id: 1, nombre: 'Manzana', precio: 50, stock: 10 },
  { id: 2, nombre: 'Banana',  precio: 30, stock: 0  },
  { id: 3, nombre: 'Naranja', precio: 40, stock: 5  },
  { id: 4, nombre: 'Pera',    precio: 60, stock: 3  }
]

/* estado reactivo del carrito */
const cart = ref([]) // array de { id, nombre, precio, cantidad }

/* handlers que modifican el carrito */
function handleAddToCart(id) {
  const p = products.find(x => x.id === id)
  if (!p) return
  const found = cart.value.find(i => i.id === id)
  if (found) found.cantidad += 1
  else cart.value.push({ id: p.id, nombre: p.nombre, precio: p.precio, cantidad: 1 })
}

function handleIncrement(id) {
  const it = cart.value.find(i => i.id === id)
  if (it) it.cantidad += 1
}

function handleDecrement(id) {
  const it = cart.value.find(i => i.id === id)
  if (!it) return
  it.cantidad -= 1
  if (it.cantidad <= 0) handleRemove(id)
}

function handleRemove(id) {
  cart.value = cart.value.filter(i => i.id !== id)
}

/* exportá lo que el App.vue importa */
export { cart, handleAddToCart, handleIncrement, handleDecrement, handleRemove }
