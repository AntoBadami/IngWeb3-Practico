<template>
  <v-container>
    <v-row>

      <!-- Search -->
      <v-col cols="8">
        <v-text-field
          label="Buscar"
          variant="outlined"
          prepend-inner-icon="mdi-magnify"
          v-model="search"
        />
      </v-col>

      <!-- Button + -->
      <v-col cols="auto">
        <v-btn variant="outlined" icon>
          <v-icon>mdi-plus</v-icon>
        </v-btn>
      </v-col>
    </v-row>

    <!-- Products List -->
    <v-list>
      <template v-if="products.length > 0">
      <v-list-item v-for="product in products" :key="product.id">
        <v-list-item-content>
          <v-list-item-title>{{ product.name }}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
  </template>

  <v-list-item v-else>
    <v-list-item-content>
      <v-list-item-title>No hay productos registrados</v-list-item-title>
    </v-list-item-content>
  </v-list-item>
  </v-list>

</v-container>
</template>

<script setup>
import { ref } from 'vue';
const search = ref('');

/* Mock products data */
const products = ref([
  { id: 1, name: 'Producto 1' },
  { id: 2, name: 'Producto 2' },
  { id: 3, name: 'Producto 3' },
]);



</script>