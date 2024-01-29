<template>
  <navbarVue />
  <HomePage />

</template>

<script>
import navbarVue from "./components/NavBar.vue";
import homePage from "@/components/pages/HomePage.vue";

export default {
  name: "App",
  components: {
    navbarVue,homePage,

  },
};
</script>
