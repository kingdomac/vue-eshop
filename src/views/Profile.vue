<template lang="">
  <div class="profile-form">
    <div class="profile-form-item">
      <form @submit.prevent="updateInfo" :class="userInfo.isSubmitted ? 'disabled' : ''" class="form-container form-checkout">
          <div class="form-section">
            <div class="form-header">
              <span class="material-icons-outlined">
              info
              </span>
              personal information
            </div>
            <div class="form-body">
              <div class="form-input">
                <label for="name" class="required">
                  <span class="material-icons-outlined">
                  person
                  </span>
                  name
                </label>
                <input
                  v-model.trim="userInfo.name"
                  type="text"
                  name="name"
                  id="name"
                >
                <p v-if="userInfo.errors['name']" class="errors">{{ userInfo.errors['name'].toString() }}</p>
              </div>
              <div class="form-input">
                <label for="email" class="required">
                  <span class="material-icons-outlined">
                  email
                  </span>
                  email
                </label>
                <input v-model.trim="userInfo.email" type="email" name="email" id="email">
                <p v-if="userInfo.errors['email']" class="errors">{{ userInfo.errors['email'].toString() }}</p>
              </div>
              <div class="form-input">
                <label for="email" class="required">
                  <span class="material-icons-outlined">
                  local_phone
                  </span>
                  phone
                </label>
                <input v-model="userInfo.phone" type="phone" name="phone" id="phone">
                <p v-if="userInfo.errors.phone" class="errors">{{ userInfo.errors.phone.toString() }}</p>
              </div>
              <div class="form-input">
                <label for="address" class="required">
                  <span class="material-icons-outlined">
                  home
                  </span>
                 shipping address
                </label>
                <input v-model.trim="userInfo.address" type="text" name="address" id="address">
                <p v-if="userInfo.errors['address']" class="errors">{{ userInfo.errors['address'].toString() }}</p>
              </div>
            </div>
          </div>
          <div class="form-footer">
            <button
              type="submit"
              :class="checkIfUserInputChanges() ? '' : 'disabled'"
              :disabled="userInfo.isSubmitted"
              v-text="userInfo.isSubmitted ? 'process...' : 'save changes'"></button
            >
          </div>
      </form>
    </div>
    <div class="profile-form-item">
      <form @submit.prevent="updatePassword" :class="userCredentials.isSubmitted ? 'disabled' : ''" class="form-container form-checkout">
        <div class="form-header">
          <span class="material-icons-outlined">
          security
          </span>
          password settings
        </div>
        <div class="form-body">
          <div class="form-input">
            <label for="password" class="required">
              <span class="material-icons-outlined">
              lock
              </span>
              password
            </label>
            <input v-model="userCredentials.password" type="password" id="password">
            <p v-if="userCredentials.errors['password']" class="errors">{{ userCredentials.errors.password.toString() }}</p>
          </div>
          <div class="form-input">
            <label for="confirm-password" class="required">
              <span class="material-icons-outlined">
              password
              </span>
              confirm password
            </label>
            <input v-model="userCredentials.password_confirmation" type="password" id="confirm-password">
          </div>
        </div>
        <div class="form-footer">
            <button type="submit" :disabled="userCredentials.isSubmitted" v-text="userCredentials.isSubmitted ? 'process...' : 'change'"></button>
        </div>
      </form>
    </div>

  </div>
</template>
<script>
import {
  getUserInfo,
  updateAuthUser,
  changePassword,
} from "@/services/authService";
import { reactive, ref } from "@vue/reactivity";
import { onMounted } from "vue";
import { useToast } from "vue-toastification";
import { useStore } from "vuex";
export default {
  setup() {
    const { commit } = useStore();

    const userInfo = reactive({
      name: "",
      email: "",
      phone: "",
      address: "",
      errors: [],
      isSubmitted: false,
    });

    const userCredentials = reactive({
      password: "",
      password_confirmation: "",
      errors: [],
      isSubmitted: false,
    });

    const oldUser = ref(userInfo);

    const toast = useToast();

    const loadUserInfo = async () => {
      try {
        commit("SET_IS_LOADING", true);
        const res = await getUserInfo();
        const result = await res.data;
        userInfo.name = result.data.name;
        userInfo.email = result.data.email;
        userInfo.phone = result.data.phone;
        userInfo.address = result.data.address;
        oldUser.value = { ...userInfo };
      } catch (error) {
      } finally {
        commit("SET_IS_LOADING", false);
      }
    };

    const updateInfo = async () => {
      if (!checkIfUserInputChanges()) {
        return false;
      }
      try {
        userInfo.isSubmitted = true;
        const res = await updateAuthUser(userInfo);
        const result = await res.data;

        userInfo.name = result.data.name;
        userInfo.email = result.data.email;
        userInfo.phone = result.data.phone;
        userInfo.address = result.data.address;
        oldUser.value = { ...userInfo };
        toast.success("your changes has been updated", {
          timeout: 3000,
        });
      } catch (error) {
        if (error.response.data.errors) {
          userInfo.errors = error.response.data.errors;
        }
        resetUserInfoForm();
      } finally {
        userInfo.isSubmitted = false;
      }
    };

    const updatePassword = async () => {
      try {
        userCredentials.isSubmitted = true;
        const res = await changePassword({
          password: userCredentials.password,
          password_confirmation: userCredentials.password_confirmation,
        });
        const result = await res.data;
        if (result.success) {
          toast.success(result.success, {
            timeout: 3000,
          });
        }
        resetCredentialsForm();
      } catch (error) {
        if (error.response.data.errors) {
          userCredentials.errors = error.response.data.errors;
        }
      } finally {
        userCredentials.isSubmitted = false;
      }
    };

    const checkIfUserInputChanges = () => {
      if (
        userInfo.name != oldUser.value.name ||
        userInfo.email != oldUser.value.email ||
        userInfo.phone != oldUser.value.phone ||
        userInfo.address != oldUser.value.address
      ) {
        return true;
      }
      return false;
    };

    const resetUserInfoForm = () => {
      userInfo.name = oldUser.value.name;
      userInfo.email = oldUser.value.email;
      userInfo.phone = oldUser.value.phone;
      userInfo.address = oldUser.value.address;
    };

    const resetCredentialsForm = () => {
      userCredentials.password = "";
      userCredentials.password_confirmation = "";
    };

    onMounted(() => {
      loadUserInfo();
    });
    return {
      userInfo,
      userCredentials,
      updateInfo,
      checkIfUserInputChanges,
      updatePassword,
    };
  },
};
</script>
<style lang="scss" scoped>
.profile-form {
  display: flex;
  flex-wrap: wrap;
  // display: grid;
  // grid-template-columns: 1fr 1fr;
  gap: 1rem;

  .profile-form-item {
    flex: 1;
  }
}
.form-footer {
  padding-left: 10px;
  padding-bottom: 10px;
}
</style>
