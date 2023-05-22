<template>
  <main class="main">
    <h1 class="header">B-rain tech</h1>
    <router-view class="component"></router-view>
  </main>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "App",
});
</script>

<style scoped>
.main {
  margin: 0 auto;
  max-width: 720px;
}
.header {
  text-align: center;
}

.component {
  width: 600px;
}
</style>
