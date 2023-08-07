<template>
  <headerComponent :page="this.page" @changePage="this.changePage" />
  <router-view @changePage="this.changePage" />
  <footerComponent />
</template>
<script>
import headerComponent from "@/components/headerComponent";
import footerComponent from "@/components/footerComponent";

export default {
  name: "App",
  components: {
    headerComponent,
    footerComponent,
  },
  data() {
    return {
      page: null,
    };
  },
  methods: {
    changePage(name) {
      this.page = name;
    },
  },
};
</script>
<style>
@import url("https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600;700;800;900&display=swap");
#app {
  font-family: "Inter", sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
.bg-green {
  background-color: #42b983 !important;
}
.green {
  color: #42b983 !important;
}
.btn-basic {
  background: #42b983 !important;
  color: white !important;
  border: 0 !important;
}
.btn-basic:hover {
  background: #2e9a6d !important;
}
.btn-outline-basic {
  background: white !important;
  color: #42b983 !important;
  border: solid 2px #42b983 !important;
}
.btn-outline-basic:hover {
  background: #42b983 !important;
  color: white !important;
}
/*
nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}*/
</style>
