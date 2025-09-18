<template>
  <v-navigation-drawer v-model="localOpen" right temporary>
    <v-sheet class="pa-4" elevation="0">
      <div class="d-flex align-center justify-space-between mb-3">
        <div class="text-h6">Carrito</div>
        <v-btn text small @click="$emit('clear')" v-if="cartDetails.length">Vaciar</v-btn>
      </div>

      <div v-if="cartDetails.length === 0">No hay productos en el carrito.</div>

      <v-list v-else dense>
        <CartItem
          v-for="item in cartDetails"
          :key="item.id"
          :item="item"
          @increment="$emit('increment', $event)"
          @decrement="$emit('decrement', $event)"
          @remove="$emit('remove', $event)"
        />
      </v-list>

      <v-divider class="my-3"></v-divider>

      <div class="d-flex justify-space-between mb-2">
        <div><strong>Total:</strong></div>
        <div><strong>${{ totalPrice }}</strong></div>
      </div>

      <v-btn block :disabled="cartDetails.length === 0" @click="$emit('checkout')">Finalizar compra</v-btn>
    </v-sheet>
  </v-navigation-drawer>
</template>

<script setup>
import { ref, watch } from 'vue';
import CartItem from '@/components/CartItem.vue';

const props = defineProps({
  open: { type: Boolean, default: false },
  cartDetails: { type: Array, default: () => [] },
  totalPrice: { type: Number, default: 0 }
});
const emit = defineEmits(['update:open','increment','decrement','remove','clear','checkout']);

const localOpen = ref(props.open);

// Mantener v-model-like
watch(localOpen, (v) => emit('update:open', v));
watch(() => props.open, (v) => (localOpen.value = v));
</script>
