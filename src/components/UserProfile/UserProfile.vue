<template>
  <section>
    <span>Name:</span>
    <br />
    <b>{{ name }}</b>

    <br />

    <span>Email:</span>
    <br />
    <b>{{ email }}</b>

    <br />

    <v-btn @click="logout">Logout</v-btn>
  </section>
</template>

<script lang="ts">
import Vue from "vue";
import { queryUserProfile } from "@/api/queries";
import { View } from "@/common/constants";
import { deleteCookie } from "@/helpers/cookie";

export default Vue.extend({
  name: View.Profile,
  data: () => ({
    name: "",
    email: "",
  }),
  methods: {
    async getUserProfile() {
      try {
        const { name, email } = await queryUserProfile();
        this.name = name;
        this.email = email;
      } catch (err) {
        console.error(err);
      }
    },
    logout() {
      deleteCookie("jwt");
      this.$router.replace("/sign-in");
    },
  },
  mounted() {
    this.getUserProfile();
  },
});
</script>
