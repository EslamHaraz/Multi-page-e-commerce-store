<template>
  <div id="app" :class="{ direction: status }">
    <router-view />
  </div>
</template>
<style>
body {
  background-color: var(--body-Color) !important;
  transition: 0.5s linear;
}
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>
<script>
export default {
  data() {
    return {
      lang: null,
      status: null,
    };
  },
  mounted() {
    let language = window.localStorage.getItem("lang");
    if (language == "ar") {
      this.status = true;
      ("hello ar");
    } else this.status = "";
  },
};
</script>
