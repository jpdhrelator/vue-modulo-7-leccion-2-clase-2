<template>
    <div>
        <p v-if="cargando">Cargando...</p>
        <ul v-else>
            <li v-for="item in listado" :key="item.id"> {{ item.name }}</li>
        </ul>
    </div>
</template>

<script setup>
import { ref,onMounted } from 'vue';
import { obtenerListadoItems } from '../services/ItemsApi';
const listado= ref([]);
const cargando= ref(true);


const asyncFunc = () => new Promise((resolve) => {

  setTimeout(resolve, 5000);

});
onMounted(async () => {

    await asyncFunc();
     throw new Error('Error al obtener los datos del servidor');
    const data= await obtenerListadoItems();
    listado.value= data;
    cargando.value=false;
   
})



</script>

