<template>
  <v-list-item>
    <v-list-item-content>
      <v-list-item-title>{{ item.name }}</v-list-item-title>
      <v-list-item-subtitle>
        ${{ item.price }} × {{ item.qty }} = ${{ item.subtotal }}
      </v-list-item-subtitle>
    </v-list-item-content>

    <v-list-item-action>
      <v-btn icon small @click="$emit('decrement', item.id)">
        -
      </v-btn>
      <v-btn icon small @click="$emit('increment', item.id)" :disabled="item.qty >= item.stock">
        +
      </v-btn>
      
      <v-btn text small @click="$emit('remove', item.id)">
        quitar
      </v-btn>
    </v-list-item-action>
  </v-list-item>
</template>

<script setup>
const props = defineProps({
  item: { type: Object, required: true } // {id, name, price, qty, stock, subtotal}
});
</script>
