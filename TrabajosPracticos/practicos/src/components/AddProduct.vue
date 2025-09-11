<template>
    <v-container>
        <v-text-field label="Nombre" v-model="productName"></v-text-field>
        <v-text-field label="Precio" v-model="productPrice"></v-text-field>
        <v-text-field label="Stock" v-model="productStock"></v-text-field>
        <v-btn variant="outlined" @click="addProduct" >Guardar</v-btn>
        <v-alert v-if="errorMSG" type="error" title="Error">{{errorMSG}}</v-alert>
    </v-container>
</template>
<script setup>
    import { ref } from 'vue';
    import { PRODUCTS_LIST_KEY } from '@/config/Constants.js';

    const productName = ref('');
    const productPrice = ref('');
    const productStock = ref('');

    const errorMSG = ref('');

    function addProduct()
    {

        if(validInputs())
        {
            const storedClients = JSON.parse(localStorage.getItem(PRODUCTS_LIST_KEY)) || []
            storedClients.push({ id: Date.now(), name: productName.value,
            price:parseFloat(productPrice.value),
            stock: parseInt(productStock.value)})     
            localStorage.setItem(PRODUCTS_LIST_KEY, JSON.stringify(storedClients))
        }
        
    }

    function validInputs()
    {
        if (productName.value.trim() === '' || productPrice.value.trim() === '' || productStock.value.trim() === '') {
            errorMSG.value ='Por favor, complete todos los campos.';
            return false;
        }
        if (isNaN(productPrice.value) || isNaN(productStock.value)) {
            errorMSG.value='Por favor, ingrese un valor numérico válido para precio y stock.';
            return false;
        }
        if (parseFloat(productPrice.value) < 0 || parseInt(productStock.value) < 0) {
            errorMSG.value='Por favor, ingrese valores positivos para precio y stock.';
            return false;
        }
        errorMSG.value='';
        return true;
    }
    

</script>