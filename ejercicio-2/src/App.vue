<script setup>

</script>

<template>
  <div class="app-layout">
    
    <aside class="sidebar">
      <div class="sidebar-header">
        <h2>Mi App Usuarios</h2>
      </div>
      
      <nav class="sidebar-menu">
        <router-link to="/" class="menu-item">Inicio</router-link>
        <router-link to="/users/list" class="menu-item">Listado de Usuarios</router-link>
        <router-link to="/users/new" class="menu-item">Crear Usuario</router-link>
      </nav>
    </aside>

    <main class="main-content">
      <router-view />
    </main>
    
  </div>

</template>

<style scoped>
/* Contenedor principal para alinear los elementos uno al lado del otro */
.app-layout {
  display: flex;
  min-height: 100vh; /* Ocupa todo el alto de la pantalla */
  font-family: Arial, sans-serif;
}

/* Estilos del Sidebar */
.sidebar {
  width: 250px;
  background-color: #2c3e50;
  color: white;
  display: flex;
  flex-direction: column;
}

.sidebar-header {
  padding: 20px;
  text-align: center;
  border-bottom: 1px solid #1a252f;
}

.sidebar-menu {
  display: flex;
  flex-direction: column;
  padding-top: 20px;
}

/* Estilos de los enlaces del menú */
.menu-item {
  padding: 15px 20px;
  color: #ecf0f1;
  text-decoration: none;
  transition: background-color 0.3s;
}

.menu-item:hover {
  background-color: #34495e;
}

/* Clase activa por defecto de Vue Router */
.router-link-active {
  background-color: #41b883; /* Color verde característico de Vue */
  font-weight: bold;
}

/* Área de contenido principal */
.main-content {
  flex: 1; /* Toma todo el espacio restante disponible */
  background-color: #f4f6f9;
  padding: 30px;
  overflow-y: auto; /* Permite hacer scroll solo en el contenido si es muy largo */
}
</style>
