<template>
  <validation-observer ref="observer" v-slot="{ invalid }">
    <form @submit.prevent="submit">
      <validation-provider
        v-slot="{ errors }"
        name="email"
        rules="required|email"
      >
        <v-text-field
          v-model="email"
          :error-messages="errors"
          label="E-mail"
          required
        ></v-text-field>
      </validation-provider>

      <validation-provider v-slot="{ errors }" name="password" rules="required">
        <v-text-field
          v-model="password"
          :error-messages="errors"
          label="Password"
          required
        ></v-text-field>
      </validation-provider>

      <v-btn class="mr-4" type="submit" :disabled="invalid">Sign in</v-btn>
      <v-btn @click="clear">clear</v-btn>
      <router-link to="/sign-up">
        <v-btn>Sign Up</v-btn>
      </router-link>
    </form>
  </validation-observer>
</template>

<script lang="ts">
import Vue from "vue";
import { required, email } from "vee-validate/dist/rules";
import {
  extend,
  ValidationObserver,
  ValidationProvider,
  setInteractionMode,
} from "vee-validate";
import { VueConstructor } from "vue/types/umd";
import { ValidationError } from "@/helpers/validation-error";
import { queryLogin } from "../../api/queries";
import { LoginFormRefs } from "./interfaces";

setInteractionMode("eager");

extend("required", {
  ...required,
  message: "{_field_} can not be empty",
});

extend("email", {
  ...email,
  message: "Email must be valid",
});

export default (Vue as VueConstructor<Vue & LoginFormRefs>).extend({
  name: "AuthorizationForm",
  components: {
    ValidationProvider,
    ValidationObserver,
  },
  data: () => ({
    email: "",
    password: "",
  }),
  methods: {
    async submit() {
      try {
        const formValidated = await this.$refs.observer.validate();

        if (formValidated) {
          await queryLogin({
            email: this.email,
            password: this.password,
          });

          this.$router.replace("/profile");
        } else {
          throw new ValidationError("Validation error", "Login");
        }
      } catch (err) {
        console.error(err);
      }
    },
    clear() {
      this.email = "";
      this.password = "";
      this.$refs.observer.reset();
    },
  },
});
</script>
