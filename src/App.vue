<template>
  <div id="app">
    <nav class="navbar">
      <router-link to="/calculator">Калькулятор</router-link>
      <router-link to="/comments">Комментарии</router-link>
    </nav>
    <div class="container">
      <router-view/>
    </div>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

.navbar {
  margin: 20px 0;
}

.navbar > a {
  margin-right: 10px;
}

.navbar a {
  color: #000;
  text-decoration: none;
  border-bottom: 1px solid #000;

  &:hover {
    border-bottom: none;
  }
}

.router-link-active {
  border-bottom: none !important;
}
</style>
