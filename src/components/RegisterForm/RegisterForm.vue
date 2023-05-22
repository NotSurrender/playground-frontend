<template>
  <validation-observer ref="observer" v-slot="{ invalid }">
    <form @submit.prevent="submit">
      <validation-provider
        v-slot="{ errors }"
        name="Name"
        rules="required|max:10"
      >
        <v-text-field
          v-model="name"
          :counter="10"
          :error-messages="errors"
          label="Name"
          required
        ></v-text-field>
      </validation-provider>
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

      <v-btn class="mr-4" type="submit" :disabled="invalid">Sign Up</v-btn>
      <v-btn @click="clear">Clear</v-btn>
      <router-link to="/sign-in">
        <v-btn>Sign In</v-btn>
      </router-link>
    </form>
  </validation-observer>
</template>

<script lang="ts">
import Vue from "vue";
import { required, email, max } from "vee-validate/dist/rules";
import {
  extend,
  ValidationObserver,
  ValidationProvider,
  setInteractionMode,
} from "vee-validate";
import { RegisterFormRefs } from "./interfaces";
import { VueConstructor } from "vue/types/umd";
import { queryRegister } from "@/api/queries";
import { ValidationError } from "@/helpers/validation-error";

setInteractionMode("eager");

extend("required", {
  ...required,
  message: "{_field_} can not be empty",
});

extend("max", {
  ...max,
  message: "{_field_} may not be greater than {length} characters",
});

extend("email", {
  ...email,
  message: "Email must be valid",
});

export default (Vue as VueConstructor<Vue & RegisterFormRefs>).extend({
  name: "RegistrationForm",
  components: {
    ValidationProvider,
    ValidationObserver,
  },
  data: () => ({
    name: "",
    email: "",
    password: "",
  }),
  methods: {
    async submit() {
      try {
        const formValidated = await this.$refs.observer.validate();

        if (formValidated) {
          await queryRegister({
            name: this.name,
            email: this.email,
            password: this.password,
          });

          this.$router.replace("/profile");
        } else {
          throw new ValidationError("Validation error", "Register");
        }
      } catch (err) {
        console.error(err);
      }
    },
    clear() {
      this.name = "";
      this.email = "";
      this.password = "";
      this.$refs.observer.reset();
    },
  },
});
</script>
