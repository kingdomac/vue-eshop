<template lang="">
    <div class="container">
    <form @submit.prevent="loginAction" :class="isDisabled? 'inactive-container' : ''" class="form-container login">
      <div class="form-header">
        <span class="material-icons-outlined">
        login
        </span>
        singin
      </div>
      <div class="form-body">

          <div class="form-input">
            <label for="email">
              <span class="material-icons-outlined">
              email
              </span>
              email
              <span v-if="errors.email" class="errors">{{ errors.email.toString() }}</span>
            </label>
            <input v-model="email" type="email" name="email" id="email" autofocus>

          </div>
          <div class="form-input">
            <label for="password">
              <span class="material-icons-outlined">
              lock
              </span>
              password
              <span v-if="errors.password" class="errors">{{ errors.password.toString() }}</span>
            </label>
            <input v-model="password" type="password" id="password">
          </div>

        <div class="form-footer">
          <div>
            <span>
              <router-link :to="{name: 'forgot.password'}">forgot password?</router-link>
            </span> |
            <router-link :to="{name: 'register'}" custom v-slot="{href, navigate}">
              <span :href="href" @click="navigate">register</span>
            </router-link>
          </div>
          <button type="submit" :disabled="isDisabled">login</button>
        </div>
      </div>
    </form>
    </div>
</template>
<script>
import { ref } from "@vue/reactivity";
import useValidation from "@/composables/useValidation";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import { login, socialiteLogin } from "@/services/authService";
export default {
  setup() {
    const { commit } = useStore();
    const router = useRouter();
    const isDisabled = ref(false);
    const email = ref(null);
    const password = ref(null);
    const errors = ref({});
    const { validateEmail, validatePassword } = useValidation();

    async function loginAction() {
      try {
        isDisabled.value = true;
        if (validateForm()) {
          const res = await login(email.value, password.value);
          const result = await res.data;
          commit("auth/SET_TOKEN", result.token);
          commit("auth/SET_USER", result.data);
          router.push(JSON.parse(sessionStorage.prevUrl));
        }
      } catch (error) {
        if (error.response.data.errors) {
          errors.value = error.response.data.errors;
        }
      } finally {
        isDisabled.value = false;
      }
    }

    async function socialMediaLogin(provider) {
      try {
        const res = await socialiteLogin(provider);
        console.log(res);
      } catch (error) {}
    }

    const validateForm = () => {
      errors.value = {};
      if (!email.value) {
        errors.value["email"] = "Email is required";
      } else if (!validateEmail(email.value)) {
        errors.value["email"] = "invalida Email";
      }
      if (!password.value) {
        errors.value["password"] = "Password is required";
      }

      if (Object.keys(errors.value).length) {
        return false;
      }
      return true;
    };

    return {
      isDisabled,
      email,
      password,
      loginAction,
      errors,
      socialMediaLogin,
    };
  },
};
</script>
<style lang="scss" scoped>
.login {
  margin: 0 auto;
  width: 100%;
}
.form-container {
  max-width: 500px;
  min-width: 300px;
}
</style>
