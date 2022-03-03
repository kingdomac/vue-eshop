const cart = {
  namespaced: true,

  state: {
    cart: localStorage.cart ? JSON.parse(localStorage.cart) : [],
  },

  mutations: {
    saveCart(state) {
      localStorage.setItem("cart", JSON.stringify(state.cart));
      if (state.cart.length === 0) {
        localStorage.removeItem("cart");
      }
    },

    clearCart(state) {
      state.cart = [];
      localStorage.removeItem("cart");
    },

    addToCart(state, { product, quantity }) {
      const found = state.cart.find((item) => item.id === product.id);
      const price = product.sale_price ? product.sale_price : product.price;
      if (!found) {
        product.totalPrice = price * quantity;
        state.cart.push({ ...product, quantity });
      } else {
        if (product.in_stock >= Number(found.quantity) + Number(quantity)) {
          found.quantity = Number(found.quantity) + Number(quantity);
          found.totalPrice = found.quantity * price;
        }
      }
      localStorage.setItem("cart", JSON.stringify(state.cart));
    },

    removeFromCart(state, product) {
      let index = state.cart.findIndex((item) => item.id === product.id);
      if (index > -1) {
        let item = state.cart[index];
        item.quantity--;
        item.totalPrice = item.quantity * item.price;
        if (item.quantity === 0) {
          state.cart.splice(index, 1);
        }

        localStorage.setItem("cart", JSON.stringify(state.cart));
      }
    },

    removeItemFromCart(state, product) {
      let index = state.cart.findIndex((item) => item.id === product.id);
      if (index > -1) {
        state.cart.splice(index, 1);

        localStorage.setItem("cart", JSON.stringify(state.cart));
      }
    },
  },

  actions: {},
};

export default cart;
