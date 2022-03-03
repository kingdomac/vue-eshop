import { useStore } from "vuex";
import { computed, readonly } from "@vue/reactivity";
export default () => {
  const { state, dispatch, commit } = useStore();

  const cartCounter = computed(() => state.cart.cart.length);

  const totalPrice = computed(() => {
    return state.cart.cart.reduce((total, item) => {
      return (total += item.totalPrice);
    }, 0);
  });

  const clearCart = () => {
    commit("cart/clearCart");
  };

  const addToCart = (product, quantity = 1) => {
    commit("cart/addToCart", { product, quantity });
  };

  const removeFromCart = (item) => {
    commit("cart/removeFromCart", item);
  };

  const removeItemFromCart = (item) => {
    commit("cart/removeItemFromCart", item);
  };

  return {
    cartCounter: readonly(cartCounter),
    totalPrice: readonly(totalPrice),
    state: readonly(state),
    addToCart,
    removeFromCart,
    removeItemFromCart,
    clearCart,
  };
};
