<template lang="">
  <div class="container">
    <form @submit.prevent="resetPasswordAction" :class="form.isSubmitted? 'inactive-container' : ''" class="form-container login">
      <div class="form-header">
        <span class="material-icons-outlined">
        lock_reset
        </span>
        reset password
      </div>
      <div class="form-body">

        <div class="form-input">
          <label for="email">
            <span class="material-icons-outlined">
            email
            </span>
            email
            <span v-if="form.errors.email" class="errors">{{ form.errors.email.toString() }}</span>
          </label>
          <input v-model="form.email" type="email" name="email" id="email" placeholder="Enter your email address" autofocus>
        </div>
        <div class="form-group">
          <div class="form-input">
            <label for="password" class="required">
              <span class="material-icons-outlined">
              lock
              </span>
              password
            </label>
            <input v-model="form.password" type="password" id="password">
            <p v-if="form.errors.password" class="errors">{{ form.errors.password.toString() }}</p>
          </div>
          <div class="form-input">
            <label for="confirm-password" class="required">
              <span class="material-icons-outlined">
              password
              </span>
              confirm password
            </label>
            <input v-model="form.password_confirmation" type="password" id="confirm-password">
          </div>
        </div>
        <div class="form-footer">
          <button type="submit" :disabled="form.isSubmitted">reset password</button>
        </div>
      </div>
    </form>

  </div>
</template>
<script>
import { reactive } from "@vue/reactivity";
import { resetPassword } from "@/services/authService";
import { useRoute, useRouter } from "vue-router";
import { useToast } from "vue-toastification";
export default {
  setup() {
    const route = useRoute();
    const router = useRouter();

    const initForm = {
      email: "",
      password: "",
      password_confirmation: "",
      token: route.query.token,
      errors: [],
      isSubmitted: false,
    };

    const form = reactive({ ...initForm });

    const toast = useToast();

    const resetPasswordAction = async () => {
      try {
        form.isSubmitted = true;
        const res = await resetPassword({ ...form });
        const result = await res.data;
        toast.success(result.success.toString(), {
          timeout: 5000,
        });
        Object.assign(form, initForm);
        router.push({ name: "login" });
      } catch (error) {
        if (error.response.data.errors) {
          form.errors = error.response.data.errors;
        } else if (error.response.data.email) {
          form.errors = error.response.data.email;
        }
      } finally {
        form.isSubmitted = false;
        form.email = null;
      }
    };
    return { form, resetPasswordAction };
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
