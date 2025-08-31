
import { ref, computed } from 'vue'

export function ListadoProduct(initial = null) {
  const productos = ref(initial ?? [
    { id: 1, nombre: 'Manzana', precio: 50, stock: 10 },
    { id: 2, nombre: 'Banana',  precio: 30, stock: 0  },
    { id: 3, nombre: 'Naranja', precio: 40, stock: 5  },
    { id: 4, nombre: 'Pera',    precio: 60, stock: 3  }
  ])

  const busqueda = ref('')

  const productosFiltrados = computed(() => {
    const q = busqueda.value.trim().toLowerCase()
    if (!q) return productos.value
    return productos.value.filter(p => p.nombre.toLowerCase().includes(q))
  })

  return { productos, busqueda, productosFiltrados }
}
