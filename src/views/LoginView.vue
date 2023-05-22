<template>
  <div>
    <h2>Sign in</h2>
    <LoginForm class="form" />
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { View } from "@/common/constants";
import LoginForm from "../components/LoginForm";

export default Vue.extend({
  name: View.Login,

  components: {
    LoginForm,
  },
});
</script>

<style scoped>
.form {
  display: block;
  width: 600px;
}
</style>
