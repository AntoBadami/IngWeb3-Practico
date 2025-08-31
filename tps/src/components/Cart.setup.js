// src/components/Cart.setup.js
import { computed } from 'vue'

const props = defineProps({ cart: { type: Array, required: true } })

const total = computed(() => props.cart.reduce((s, it) => s + it.precio * it.cantidad, 0))
