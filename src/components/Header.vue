<template lang="">
<div>
  <header class="header noprint" :class="isOpen ? 'open-menu' : ''">
    <div class="menu-one">
      <div class="logo-head">
        <router-link  @click="isOpen=false" :to="{name: 'home'}" class="logo">
          kingdo<span>m</span>ac
        </router-link>
        <div v-if="cartCount" @click="$emit('open-cart')" class="cart-mob" id="cart-icon-mob" >
            <span v-if="cartCount" class="number">
            {{ cartCount }}
            </span>
            <span class="material-icons-outlined icon">
            shopping_cart
            </span>
        </div>
        <span v-if="!isOpen" @click="isOpen=!isOpen" class="material-icons-outlined pointer" id="toogle-nav">
          menu
        </span>
        <span v-if="isOpen" @click="isOpen=!isOpen" class="material-icons-outlined pointer" id="toogle-nav">
          close
        </span>
      </div>
    </div>
    <div class="menu-two" :class="isOpen ? 'open-menu' : ''">
      <ul class="menu-primary">
        <li @mouseover="isShowCategories=false" @click="isOpen=false">
          <router-link :to="{name: 'home'}">
          home
          </router-link>
        </li>
        <li>
          <div @click="toggleCategories" class="categories pointer">
            <a>our shop</a>
            <span class="material-icons-outlined" v-if="isShowCategories">
            keyboard_arrow_up
            </span>
            <span class="material-icons-outlined" v-if="!isShowCategories">
            keyboard_arrow_down
            </span>
          </div>
          <div v-if="isShowCategories" @click="isOpen=false" @mouseleave="toggleCategories" class="categories-menu">
            <ul v-click-away="toggleCategories">
              <li v-for="category in categories" :key="category.id" @click="toggleCategories">
                <router-link :to="{name:'category', params:{slug: `${category.slug}`}}">
                  {{ category.name }}
                </router-link>

              </li>
            </ul>
          </div>
        </li>
        <li @click="isOpen=false" @mouseover="isShowCategories=false"><router-link :to="{name: 'about'}">about us</router-link></li>
      </ul>
      <nav>
        <ul class="menu-secondary">
          <li>
            <Search />
          </li>
          <li>
            <div v-if="cartCount" class="cart" id="cart-icon" @click="$emit('open-cart')">
              <span v-if="cartCount" class="number">
              {{ cartCount }}
              </span>
              <span class="material-icons-outlined icon">
              shopping_cart
              </span>
            </div>
          </li>
          <li v-if="!isLoggedIn" @click="isOpen=!isOpen" class="menu-login">
            <router-link
            :to="{name: 'login' }"
            custom
            v-slot="{ href,  navigate }"
            >
            <span :href="href" @click="navigate" class="material-icons-outlined pointer" title="login">
            login
            </span>
            </router-link>
            <span class="word">
              <router-link :to="{name: 'login'}">
              login
              </router-link>
            </span>
          </li>
          <li v-if="isLoggedIn" @click="isOpen=!isOpen">
            <div class="profile-menu">
              <div class="icon">
                <span class="material-icons-outlined">person</span>
                <span class="word">profile</span>
              </div>
              <div :class="isPersonMenuClicked ? 'disabled cursor-loading' : ''" class="profile-drop-menu">
                  <div class="username">{{ authenticatedUser.name }} </div>
                  <ul>
                    <li>
                      <span class="material-icons-outlined">
                      settings
                      </span>
                      <span>
                        <router-link :to="{name: 'profile'}">
                        edit
                        </router-link>
                      </span>
                    </li>
                    <li>
                      <span class="material-icons-outlined">
                      list_alt
                      </span>
                      <span>
                        <router-link :to="{name: 'orders'}">
                          orders
                        </router-link>
                      </span>
                    </li>
                    <li>
                      <span @click="logoutAction" class="material-icons-outlined logout">
                      logout
                      </span>
                      <span><a  @click="logoutAction">logout</a></span>
                    </li>
                  </ul>
              </div>
            </div>
          </li>
        </ul>
      </nav>
    </div>
  </header>

</div>


</template>
<script>
import { computed, ref } from "@vue/reactivity";
import { useStore } from "vuex";
import { useRouter, useRoute } from "vue-router";
import { onMounted } from "@vue/runtime-core";
import { getCategories } from "@/services/categoryService";
import { logout } from "@/services/authService";
import Search from "@/components/SearchForm.vue";

export default {
  components: {
    Search,
  },

  setup(props, { emit }) {
    const isOpen = ref(false);
    const { state, commit, getters, dispatch } = useStore();
    const router = useRouter();
    const cartCount = computed(() => state.cart.cart.length);
    const categories = computed(() => state.category.categories);

    const isLoggedIn = computed(() => getters["auth/isLoggedIn"]);
    const authenticatedUser = computed(() => state.auth.user);
    const isPersonMenuClicked = ref(false);

    const isShowCategories = ref(false);

    const toggleCategories = () => {
      isShowCategories.value = !isShowCategories.value;
    };

    const logoutAction = async () => {
      if (isLoggedIn.value) {
        try {
          isPersonMenuClicked.value = true;
          const res = await logout();
          const result = await res.data;
          commit("auth/REMOVE_TOKEN");
          router.push({ name: "login" });
        } catch (error) {
        } finally {
          isPersonMenuClicked.value = false;
        }
      }
    };

    function loadCategories() {
      try {
        dispatch("category/getCategories");
      } catch (error) {}
    }

    onMounted(async () => {
      await loadCategories();
    });

    function showCartSummary() {
      emit("showCartSummary");
    }

    return {
      categories,
      isOpen,
      cartCount,
      showCartSummary,
      logoutAction,
      isLoggedIn,
      isPersonMenuClicked,
      authenticatedUser,
      state,
      isShowCategories,
      toggleCategories,
    };
  },
};
</script>
<style lang="scss">
.header {
  background-color: var(--clr-blue);
  color: var(--clr-white);
  position: fixed;
  left: 0px;
  right: 0px;
  font-size: var(--f-300);
  z-index: 9999;
  padding-bottom: 5px;
  padding-top: 5px;
}

.header.open-menu {
  top: 0;
  bottom: 0;
  overflow-y: scroll;
}

.menu-one,
.menu-two {
  margin-left: 5px;
  margin-right: 5px;
  display: flex;
  flex-direction: column;
}

.menu-one {
  background-color: var(--clr-blue);
  left: 0;
  right: 0;
}

.menu-two {
  padding-top: 0;
  margin-top: 0.8rem;
  margin-left: 10px;
  margin-right: 10px;
  display: none;
  transition: all 0.5s linear;
}

.menu-two.open-menu {
  display: block;
}

.logo-head {
  display: flex;
  justify-content: space-between;
  align-items: center;

  #toogle-nav {
    font-size: var(--f-l);
  }
}

.logo {
  font-family: var(--ff-logo);
  font-size: var(--f-logo);
  font-weight: bold;
  text-transform: uppercase;
  line-height: var(--f-logo);
  span {
    color: var(--clr-red);
  }
}
.menu-primary {
  margin-left: 0.4rem;
  margin-top: 15px;
  text-transform: uppercase;
  li {
    padding-bottom: 0.8rem;
    a:hover {
      border-bottom: 1px solid var(--clr-white);
    }
  }
}

.menu-secondary {
  display: flex;
  flex-direction: column;
  text-transform: capitalize;
  li {
    padding-bottom: 10px;
    a:hover {
      border-bottom: 1px solid var(--clr-white);
    }
  }
}

.categories {
  margin: unset;
  margin-bottom: 0px;
  display: flex;
  align-items: center;
}

.categories-menu {
  top: 0px;
  margin-top: 15px;
  margin-left: 10px;
  margin-bottom: 0px;
  display: flex;
  flex-direction: column;
  font-size: var(--f-200);

  li {
    a {
      border-bottom: 1px solid white;
    }
  }
}

.search {
  margin-top: 5px;
}

.cart {
  display: none;
}

.cart-mob {
  position: relative;
  margin-top: 1rem;
  cursor: pointer;
  .number {
    position: absolute;
    padding: 0.3rem;
    font-size: var(--f-200);
    background-color: var(--clr-red);
    color: var(--clr-white);
    border-radius: 50%;
    left: 15px;
    top: -48%;
  }
}

.menu-login {
  display: flex;
  align-items: center;
  gap: 5px;
}

.profile-menu {
  .icon {
    display: none;
  }

  .profile-drop-menu {
    ul > li {
      display: flex;
      align-items: center;
      gap: 5px;
      padding-bottom: 15px;
    }
  }
}
.username {
  padding: 10px;
}
@media (min-width: 60em) {
  .header {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    background: var(--clr-white);
    color: var(--clr-blue);
    top: 0;
    overflow: unset;
    padding: 10px;
  }
  .header.open-menu {
    bottom: unset;
    overflow: unset;
  }
  .menu-two.open-menu {
    display: flex;
  }

  .logo-head {
    display: flex;
    align-items: flex-end;
    margin-top: 10px;
    border-bottom: none;
    .logo {
      margin: 0 !important;
      padding: 0 !important;
    }
  }
  #toogle-nav {
    display: none;
  }

  .menu-one {
    display: flex;
    flex-direction: row;
    align-items: flex-end;
    gap: 3rem;
    background-color: unset;
  }

  .menu-two {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    flex-basis: 100%;
  }

  .menu-primary {
    display: flex;
    justify-content: center;
    align-items: stretch;
    gap: 1rem;
    font-size: var(--f-400);
    margin: 0;
    margin-left: 1rem;
    text-transform: uppercase;

    li {
      display: flex;
      align-items: center;
      padding-bottom: 0px;
      padding: 10px;
      &:hover {
        background-color: var(--clr-blue);
        text-decoration: none;
        color: var(--clr-white);
      }
      a:hover {
        text-decoration: none;
        border-bottom: none;
      }
    }
  }

  .menu-secondary {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-end;
    gap: 0.5rem;
    flex-basis: 100%;

    li {
      padding: 0px;
    }
  }

  .profile-menu {
    position: relative;
    display: block;
    font-size: 14px;
    .profile-drop-menu {
      margin: 0px;
      padding: 0px;
      position: absolute;
      right: 0px;
      visibility: hidden;
      width: 200px;
      background-color: var(--clr-white);
      border: 1px solid var(--clr-blue);
      li {
        padding: 10px 5px !important;

        &:hover {
          background-color: var(--clr-blue);
          color: var(--clr-white);
        }
      }
    }

    &:hover {
      color: var(--clr-blue);
      .profile-drop-menu {
        visibility: visible;
      }
    }
  }

  .cart-mob {
    display: none;
  }
  .cart {
    display: block;
    position: relative;
    margin: unset;
    padding: unset;
    cursor: pointer;

    .number {
      position: absolute;
      padding: 0.3rem;
      font-size: var(--f-200);
      background-color: var(--clr-red);
      color: var(--clr-white);
      border-radius: 50%;
      top: -48%;
      left: -5px;
    }

    &:hover {
      .number {
        animation-name: bounce;
        -moz-animation-name: bounce;
      }
    }
  }

  .menu-login,
  .profile-menu {
    .word {
      display: none;
    }
  }

  .menu-login {
    margin-top: 0px;
    padding: 0px;
    display: block;
    cursor: pointer;
  }

  .profile-menu {
    .icon {
      display: block;
    }

    .profile-drop-menu {
      ul > li {
        display: flex;
        align-items: center;
        gap: 5px;
        padding-bottom: 15px;
      }
    }
  }

  .categories-menu {
    top: unset;
    margin: unset;
    position: absolute;
    background-color: var(--clr-blue-light);
    margin-top: 15px;
    width: 100%;
    left: 0px;
    transform: translateY(65%);
    padding: 20px;
    z-index: 19999;
    transition: visibility 0.2s ease-in-out;
    ul {
      display: flex;
      justify-content: flex-start;
      align-items: center;
      color: var(--clr-white);
      list-style: none;
      margin: 0px;
      gap: 0.5rem;
      flex-wrap: wrap;
    }
  }
}

@keyframes bounce {
  0%,
  100%,
  20%,
  50%,
  80% {
    -webkit-transform: translateY(0);
    -ms-transform: translateY(0);
    transform: translateY(0);
  }
  40% {
    transform: translateY(-7px);
  }
  60% {
    transform: translateY(-3px);
  }
}
</style>
