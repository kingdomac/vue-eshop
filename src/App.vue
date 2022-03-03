<template>
  <div class="full-container">
    <div v-if="isLoading" class="loader">
      <div class="lds-ripple">
        <div></div>
        <div></div>
      </div>
    </div>
    <Cart
      v-click-away="closeWhenClickAway"
      :isVisible="isVisibleCartSummary"
      @close-cart="closeCartSummary"
    />
    <div>
      <Header
        @open-cart="showCartSummary"
        @show-cart-summary="showCartSummary"
      />
      <div v-cloak class="page">
        <!-- <router-view v-slot="{ Component }">
          <transition name="fade" mode="out-in">
            <component :is="Component" />
          </transition>
        </router-view> -->
        <router-view></router-view>
      </div>
      <Footer />
    </div>
  </div>
</template>
<script>
import Header from "./components/Header.vue";
import Footer from "./components/Footer.vue";
import Cart from "./components/Cart.vue";
import { computed, ref } from "vue";
import { useStore } from "vuex";
export default {
  components: {
    Header,
    Cart,
    Footer,
  },

  setup() {
    const { state, dispatch } = useStore();
    const isVisibleCartSummary = ref(false);
    //const authenticatedUser = computed(() => state.auth.user);

    function showCartSummary() {
      isVisibleCartSummary.value = true;
    }

    function closeCartSummary() {
      isVisibleCartSummary.value = false;
    }

    function closeWhenClickAway(event) {
      const cartElement = document.getElementById("cart-icon");
      const cartElementMobile = document.getElementById("cart-icon-mob");
      if (document.getElementById("cart-icon") || cartElementMobile) {
        let isClickedCartElement = cartElement.contains(event.target);
        let isCLickedCartElementMobile = cartElementMobile.contains(
          event.target
        );
        if (!isClickedCartElement && !isCLickedCartElementMobile) {
          closeCartSummary();
        }
      }
    }

    return {
      isLoading: computed(() => state.isLoading),
      showCartSummary,
      closeCartSummary,
      isVisibleCartSummary,
      closeWhenClickAway,
    };
  },
};
</script>
<style lang="scss">
:root {
  --clr-white: #ffffff;
  --clr-blue: #2c3e50;
  --clr-blue-light: #366594;
  --clr-red: #ee2e2e;
  --clr-gray: rgba(231, 224, 224, 0.712);
  --clr-green: rgb(63, 168, 89);
  --bg-clr-error: rgb(223, 162, 162);
  --ff-logo: "Titillium Web", sans-serif;
  --ff-body: Avenir, Helvetica, Arial, sans-serif;
  --f-xl: clamp(2rem, 2.5vw + 0.3rem, 3rem);
  --f-l: clamp(1.6rem, 2.5vw + 0.2rem, 2.6rem);
  --f-logo: clamp(1.5rem, 2.5vw + 0.1rem, 2.6rem);
  --f-200: clamp(0.7rem, 2.5vw + 0.1rem, 0.9rem);
  --f-300: clamp(0.8rem, 2.5vw + 0.1rem, 1rem);
  --f-400: clamp(0.9rem, 2.5vw + 0.1rem, 1.2rem);
  --f-500: clamp(1rem, 2.5vw + 0.2rem, 1.5rem);
  --f-600: clamp(1.2rem, 2.5vw + 0.1rem, 2rem);
}

html {
  box-sizing: border-box;
  background-color: var(--clr-white);
}

*,
*:before,
*:after {
  box-sizing: inherit;
}

* {
  margin: 0;
  padding: 0;
  border: 0;
  outline: 0;
  font-weight: inherit;
  font-style: inherit;
  font-size: 100%;
  font-family: inherit;
  vertical-align: baseline;
}
a,
a:hover,
a:focus,
a:active {
  text-decoration: none;
  color: inherit;
  cursor: pointer;
}

ol,
ul {
  list-style: none;
}

@media print {
  .noprint {
    display: none;
  }
}

#app {
  font-family: var(--ff-body);
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;

  border-top: 0px;
  position: relative;
  overflow-x: hidden;
  min-height: 100vh;
}

[v-cloak] {
  display: none;
}

.flex {
  display: flex;
}
.flex-justify-start {
  justify-content: flex-start !important;
}
.danger {
  background-color: var(--clr-red) !important;
  color: white !important;
}
.position-relative {
  position: relative;
}
.banner {
  img {
    width: 100%;
    height: auto;
  }
}
.page {
  padding-top: 90px;
  padding-left: 30px;
  padding-right: 30px;
  padding-bottom: 20px;
  min-height: 62vh;
}

.container {
  // display: flex;
  // justify-content: center;
  // align-items: flex-start;

  padding-top: 0px;
}

.cursor-loading {
  cursor: wait !important;
}

.inactive-container {
  opacity: 0.3;
}

.add-to-cart {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 5px;
}
.btn-add-to-cart {
  padding: 7px 10px;
  background: #2c3e50;
  color: white;
  font-size: var(--f-300);

  border: 0px;
  box-shadow: 1px 1px 1px gray;
  cursor: pointer;
}

.select-qty {
  border: 1px solid green;

  height: 30px;
  margin-right: 5px;
}

button:active {
  transform: translateY(1px);
}

button:disabled {
  background-color: var(--clr-white) !important;
  color: var(--clr-blue-light) !important;
  cursor: progress !important;
}

.disabled {
  opacity: 0.2;
  cursor: text !important;

  &:active {
    transform: translateY(0px);
  }
}

.required:after {
  content: " *";
  color: var(--color-blue);
}

.line-through {
  text-decoration: line-through !important;
}

.pointer {
  cursor: pointer;
}

.form-container {
  color: var(--clr-blue);
  //border: 1px solid var(--clr-blue);
  min-width: 300px;
  max-width: 800px;
  border: 1px solid var(--clr-blue-light);

  .form-header {
    display: flex;
    align-items: center;
    gap: 0.3rem;
    background-color: var(--clr-blue);
    color: var(--clr-white);
    padding: 10px 5px;
    text-transform: uppercase;
    margin-bottom: 20px;
  }

  @media screen and (min-width: 40rem) {
    .form-group {
      display: flex;
      justify-content: center;
      gap: 2rem;
    }
  }

  .form-body {
    padding: 0px 10px;
  }

  .form-input {
    margin-bottom: 20px;
    display: flex;
    flex-direction: column;
    width: 100%;
    label {
      text-transform: capitalize;
      margin-bottom: 5px;
      font-size: 16px;
      display: flex;
      align-items: flex-end;
      gap: 2px;
    }

    input {
      padding: 8px;
      color: var(--clr-blue);
      border: 0px;
      font-size: 14px;
      border: 1px solid var(--clr-blue);
      width: 100%;
    }
  }

  .form-footer {
    margin-top: 30px;
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
    gap: 10px;
    font-size: 12px;
    padding-bottom: 15px;

    button {
      background-color: white;
      border: none;
      padding: 10px;
      font-size: 15px;
      text-transform: uppercase;
      border: 1px solid var(--clr-blue);
      max-width: 50%;

      &:hover {
        background: var(--clr-blue-light);
        color: var(--clr-white);
      }
    }
    span {
      text-transform: capitalize;
      text-decoration: underline;
      cursor: pointer;
    }

    // @media screen and (max-width: 800px) {
    //   flex-direction: column;
    //   justify-content: flex-start;
    //   align-items: flex-start;
    //   button {
    //     width: 100%;
    //     order: 1;
    //   }
    //   span {
    //     order: 2;
    //   }
    // }
  }
}

// @media screen and (min-width: 40rem) {
//   .form-container {
//     width: 70%;
//   }
// }

// @media screen and (min-width: 60rem) {
//   .form-container {
//     width: 50%;
//     max-width: 400px;
//   }
// }

.errors {
  color: red;
  font-size: 12px;
  margin-top: 5px;
  text-transform: none;
}

/***************************** page loader ************************************* */
.loader {
  position: absolute;
  top: 50%;
  //bottom: 50%;
  left: 50%;
  //right: 50%;
  transform: translate(-50%, -50%);
  z-index: 100;
}

.lds-ripple {
  display: inline-block;
  position: relative;
  width: 80px;
  height: 80px;
}

.lds-ripple div {
  position: absolute;
  border: 4px solid var(--clr-blue);
  opacity: 1;
  border-radius: 50%;
  animation: lds-ripple 1s cubic-bezier(0, 0.2, 0.8, 1) infinite;
  z-index: 100;
}
.lds-ripple div:nth-child(2) {
  animation-delay: -0.5s;
}

@keyframes lds-ripple {
  0% {
    top: 36px;
    left: 36px;
    width: 0;
    height: 0;
    opacity: 1;
  }
  100% {
    top: 0px;
    left: 0px;
    width: 72px;
    height: 72px;
    opacity: 0;
  }
}

/************************* scroll pagination **************************** */
.scroll-loader {
  text-align: center;
  display: block;
}

.lds-facebook {
  display: inline-block;
  position: relative;
  width: 80px;
  height: 80px;
}
.lds-facebook div {
  display: inline-block;
  position: absolute;
  left: 8px;
  width: 16px;
  background: var(--clr-blue-light);
  animation: lds-facebook 1.2s cubic-bezier(0, 0.5, 0.5, 1) infinite;
}
.lds-facebook div:nth-child(1) {
  left: 8px;
  animation-delay: -0.24s;
}
.lds-facebook div:nth-child(2) {
  left: 32px;
  animation-delay: -0.12s;
}
.lds-facebook div:nth-child(3) {
  left: 56px;
  animation-delay: 0;
}
@keyframes lds-facebook {
  0% {
    top: 8px;
    height: 64px;
  }
  50%,
  100% {
    top: 24px;
    height: 32px;
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.router-link-active {
  font-weight: bold;
}
</style>
