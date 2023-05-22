<template>
  <div>
    <h2>User profile</h2>
    <UserProfile />
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { View } from "@/common/constants";
import UserProfile from "../components/UserProfile";

export default Vue.extend({
  name: View.Profile,

  components: {
    UserProfile,
  },
});
</script>
