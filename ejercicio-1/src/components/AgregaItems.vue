<template>
    <div>
        <button type="button" @click="btnCrea()">Crear</button>

    </div>
</template>

<script setup>
import { crearItem } from '../services/ItemsApi';


const btnCrea= async()=>{
  const resp= await crearItem({
        "name": "Nuevo Item",
        "price": 1000,
        "description": "Prueba desde Postman",
        "category": "Test"
    });

    console.log(resp);
    
}

</script>

<style scoped>

</style>