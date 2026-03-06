<script setup>
import { ref, onErrorCaptured } from 'vue';
import AgregaItems from './components/agregaItems.vue';
import { isLogin, login, logout } from './services/AuthApi';

const error = ref(null);

const loguearse = async()=>{
  await login('admin','admin123');
}
const salir = async()=>{
  await logout();
}

onErrorCaptured((err)=>{

  error.value = err;

  return true;
});

</script>

<template>
  <div>

    <button v-if="!isLogin()" type="button" @click="loguearse" >LogIn</button>
     <button v-if="isLogin()" type="button" @click="salir" >LogOut</button>

    <div v-if="error" class="mensaje-error">
      ¡Ups! Algo salió mal: {{ error.message }}
    </div>

    <!-- <Suspense v-else>
      <template #default>
         <ListadoItems/>
      </template>

      <template #fallback>
        Cargando...
      </template>
    </Suspense> -->
  <!-- <ListadoItems/> -->
<AgregaItems/>
  </div>
</template>

<style scoped>
.mensaje-error {
  color: red;
}
button {
  margin-bottom: 5px;
}
</style>
