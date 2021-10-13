<template>
  <div id="app">
    <main-layout></main-layout>
  </div>
</template>

<script>
import MainLayout from "~/layouts/MainLayout";

export default {
  data() {
    return {
      message: "test"
    }
  },
  components: {
    'main-layout': MainLayout
  }
}
</script>

<style>
#app {
  font-family: Helvetica, sans-serif;
  text-align: center;
}
</style>
