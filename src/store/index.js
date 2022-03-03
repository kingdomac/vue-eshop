import { createStore } from "vuex";
import auth from "./modules/auth";
import cart from "./modules/cart";
import product from "./modules/product";
import category from "./modules/category";
import createMutationsSharer from "vuex-shared-mutations";
export default createStore({
  state: {
    isLoading: false,
  },

  mutations: {
    SET_IS_LOADING(state, value) {
      state.isLoading = value;
    },
  },

  plugins: [
    createMutationsSharer({
      predicate: [
        "cart/clearCart",
        "cart/addToCart",
        "cart/removeFromCart",
        "cart/removeItemFromCart",
      ],
    }),
  ],

  modules: {
    auth,
    cart,
    product,
    category,
  },
});
