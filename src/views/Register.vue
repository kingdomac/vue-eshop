<template lang="">
  <div class="container">
    <form @submit.prevent="registerAction" class="form-container register">
      <div class="form-header">
        <span class="material-icons-outlined">
        app_registration
        </span>
        registeration
      </div>
      <div class="form-body">
        <div class="form-group">
          <div class="form-input">
            <label for="name" class="required">
              <span class="material-icons-outlined">
              person
              </span>
              name
            </label>
            <input v-model="registerForm.name" type="text" name="name" id="name" autofocus>
            <p v-if="registerForm.errors['name']" class="errors">{{ registerForm.errors.name.toString() }}</p>
          </div>
          <div class="form-input">
            <label for="email" class="required">
              <span class="material-icons-outlined">
              email
              </span>
              email
            </label>
            <input v-model="registerForm.email" type="email" name="email" id="email">
            <p v-if="registerForm.errors['email']" class="errors">{{ registerForm.errors.email.toString() }}</p>
          </div>
        </div>
        <div class="form-group">
          <div class="form-input">
            <label for="email" class="required">
              <span class="material-icons-outlined">
              local_phone
              </span>
              phone
            </label>
            <input v-model="registerForm.phone" type="phone" name="phone" id="phone">
            <p v-if="registerForm.errors['phone']" class="errors">{{ registerForm.errors.phone.toString() }}</p>
          </div>
          <div class="form-input">
            <label for="email" class="required">
              <span class="material-icons-outlined">
              home
              </span>
              address
            </label>
            <input v-model="registerForm.address" type="text" name="address" id="address">
            <p v-if="registerForm.errors['address']" class="errors">{{ registerForm.errors.address.toString() }}</p>
          </div>
        </div>
        <div class="form-group">
          <div class="form-input">
            <label for="password" class="required">
              <span class="material-icons-outlined">
              lock
              </span>
              password
            </label>
            <input v-model="registerForm.password" type="password" id="password">
            <p v-if="registerForm.errors['password']" class="errors">{{ registerForm.errors.password.toString() }}</p>
          </div>
          <div class="form-input">
            <label for="confirm-password" class="required">
              <span class="material-icons-outlined">
              password
              </span>
              confirm password
            </label>
            <input v-model="registerForm.password_confirmation" type="password" id="confirm-password">
          </div>
        </div>
        <div class="form-footer">
          <div>
            Already have an account?
            <router-link :to="{name: 'login'}" custom v-slot="{href, navigate}">
              <span :href="href" @click="navigate">login</span>
            </router-link>
          </div>
          <button
            type="submit"
            :disabled="registerForm.isSubmitted"
            :class="registerForm.isSubmitted ? 'cursor-loading' : ''"
            v-text="registerForm.isSubmitted ? 'processing...' : 'register'"></button
          >
        </div>
      </div>

    </form>
  </div>
</template>
<script>
import { reactive } from "vue";
import { register } from "@/services/authService";
import { useToast } from "vue-toastification";
import { useRouter } from "vue-router";
export default {
  setup() {
    const formInit = {
      name: "",
      email: "",
      phone: "",
      address: "",
      password: "",
      password_confirmation: "",
      url: import.meta.env.VUE_APP_REDIRECT_URL,
      errors: [],
      isSubmitted: false,
    };

    const registerForm = reactive({
      ...formInit,
    });

    const toast = useToast();
    const router = useRouter();

    async function registerAction() {
      try {
        registerForm.isSubmitted = true;
        const res = await register(registerForm);
        const result = await res.data;
        toast.success("You have successfully registered", {
          timeout: 5000,
        });

        toast.success("A verification email has been sent", {
          timeout: false,
        });

        Object.assign(registerForm, formInit);

        router.push({ name: "login" });
      } catch (error) {
        if (error.response.data.errors) {
          registerForm.errors = error.response.data.errors;
        }
      } finally {
        registerForm.isSubmitted = false;
      }
    }

    return { registerForm, registerAction };
  },
};
</script>
<style lang="scss" scoped>
section {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 80vh;
}

.register {
  margin: 0 auto;
}
</style>
