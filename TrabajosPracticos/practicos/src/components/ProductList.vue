<template>

  <AddProduct v-model:showForm="showForm" v-model:products="products"/>

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
        <v-btn variant="outlined" icon @click="$emit('go-add')">
          <v-icon>mdi-plus</v-icon>
        </v-btn>
      </v-col>
    </v-row>

    <!-- Products List -->
    <v-list>
      <template v-if="products.length > 0">
      <v-list-item v-for="product in filteredProducts" :key="product.id">
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
  import { ref, onMounted, computed } from 'vue';
  import { PRODUCTS_LIST_KEY} from '@/config/Constants.js';

  const search = ref('');
  const products = ref([]);

  const showForm = ref(false)

  onMounted(getProductList)

  function getProductList()
  {
    products.value = JSON.parse(localStorage.getItem(PRODUCTS_LIST_KEY)) || []
  }

  // Computed property to filter products based on search input
  const filteredProducts = computed(() => {
    if (!search.value) return products.value
    return products.value.filter(product =>
      product.name.toLowerCase().includes(search.value.toLowerCase())
    )
  })
  
</script>