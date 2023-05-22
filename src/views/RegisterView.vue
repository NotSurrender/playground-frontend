<template>
  <div>
    <h2>Sign up</h2>
    <RegisterForm class="form" />
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import RegisterForm from "../components/RegisterForm";
import { View } from "@/common/constants";

export default Vue.extend({
  name: View.Register,

  components: {
    RegisterForm,
  },
});
</script>

<style scoped>
.form {
  display: block;
  width: 600px;
}
</style>
