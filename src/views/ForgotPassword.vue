<template lang="">
  <div class="container">
    <form @submit.prevent="forgotPasswordAction" :class="isSubmitted? 'inactive-container' : ''" class="form-container login">
      <div class="form-header">
        <span class="material-icons-outlined">
        link
        </span>
        forgot password
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
          <input v-model="email" type="email" name="email" id="email" placeholder="Enter your email address" autofocus>

        </div>
        <div class="form-footer">
          <button type="submit" :disabled="isSubmitted">continue</button>
        </div>
      </div>
    </form>

  </div>
</template>
<script>
import { ref } from "@vue/reactivity";
import { forgotPassword } from "@/services/authService";
import { useToast } from "vue-toastification";

export default {
  setup() {
    const email = ref(null);
    const errors = ref([]);
    const isSubmitted = ref(false);
    const toast = useToast();

    const forgotPasswordAction = async () => {
      try {
        isSubmitted.value = true;
        const res = await forgotPassword(email.value);
        const result = await res.data;
        email.value = null;
        errors.value = [];
        toast.success(result.success.toString(), {
          timeout: 5000,
        });
      } catch (error) {
        if (error.response.data.errors) {
          errors.value = error.response.data.errors;
        } else if (error.response.data.email) {
          errors.value = error.response.data.email;
        }
      } finally {
        isSubmitted.value = false;
      }
    };
    return { email, errors, isSubmitted, forgotPasswordAction };
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
