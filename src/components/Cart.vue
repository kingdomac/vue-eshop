<template lang="">
  <div id="cart" :class="isVisible ? 'open' : ''">
    <div class="header">
      <div>
          <span @click="$emit('close-cart')" class="material-icons-outlined" id="close-icon">
          close
          </span>
      </div>
      <div>
        <span v-if="cartCounter" class="number">
            [{{ cartCounter }}]
          </span>
          <span class="material-icons-outlined icon">
          shopping_cart
          </span>
      </div>

    </div>
    <main>
      <div class="cart-products">
        <div
        v-for="item in cart"
        class="cart-product">
          <img :src="item.cover" :alt="item.name"/>
          <div class="details">
            <router-link
            :to="{name: 'productDetails', params: {slug: `${item.slug}`} }"
            custom
            v-slot="{ href,  navigate }"
            >
              <h3 class="title" :href="href" @click="navigate">
                {{ item.name }}
              </h3>
            </router-link>


            <div class="price">
              Price:
              $<span :class="item?.sale_price ? 'line-through' : ''">{{ formatPrice(item.price) }}</span>
              <span v-if="item?.sale_price"> | {{ formatPrice(item?.sale_price) }}</span>
            </div>
            <span class="subtotal">Subtotal: ${{ formatPrice(item.totalPrice) }}</span>
            <div class="incr-decr">
              <button  @click="removeFromCart(item)">-</button>
              <div class="quantity">
              {{ item.quantity }} / {{ item.in_stock }}
              </div>
              <button @click="addToCart(item,1)" :class="item.in_stock === Number(item.quantity) ? 'disabled' : ''">+</button>
            </div>

          </div>
          <div>
             <a>
              <span @click="removeItemFromCart(item)" class="material-icons-outlined">
              delete_outline
              </span>
             </a>
          </div>



        </div>
      </div>
      <div v-if="cartCounter">
        <p class="total">
          <span>Total:</span>
          <span class="price">${{  formatPrice(totalPrice) }}</span>
        </p>
        <div class="footer">
          <router-link @click="$emit('close-cart')" :to="{name: 'checkout'}">
            <button>checkout</button>
          </router-link>
          <button @click="clearCart" class="btn-clear-cart danger">clear all</button>
        </div>
      </div>
      <div class="empty" v-else>Your cart is currently empty.</div>
    </main>
  </div>
</template>
<script>
import { computed } from "@vue/reactivity";
import { useStore } from "vuex";
import useCart from "@/composables/useCart";
import useStr from "@/composables/useStr";
export default {
  props: {
    isVisible: Boolean,
  },
  emits: ["close-cart"],
  setup() {
    const { state } = useStore();

    const {
      cartCounter,
      totalPrice,
      addToCart,
      removeFromCart,
      removeItemFromCart,
      clearCart,
    } = useCart();

    const { formatPrice, formatWithSalePrice } = useStr();

    return {
      cart: computed(() => state.cart.cart),
      cartCounter,
      totalPrice,
      addToCart,
      removeFromCart,
      removeItemFromCart,
      clearCart,
      formatPrice,
      formatWithSalePrice,
    };
  },
};
</script>
<style lang="scss" scoped>
#cart {
  height: 100%;
  width: 100%;
  right: -100vw;
  position: fixed;
  z-index: 99999;
  overflow-y: scroll;
  background-color: var(--clr-blue);
  opacity: 0;
  transition: all 0.5s ease-in-out;
  border: 1px solid var(--clr-blue);
  color: white;

  @media screen and (min-width: 700px) {
    width: 50%;
    right: -50vw;
  }

  @media screen and (min-width: 900px) {
    width: 40%;
    right: -40vw;
  }

  @media screen and (min-width: 1100px) {
    width: 30%;
    right: -30vw;
  }

  &.open {
    right: 0;
    opacity: 1;
  }
  .header {
    height: 50px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: white;
    padding: 5px 30px 5px 10px;
    position: sticky;
    top: 0;
    background-color: var(--clr-blue);
    z-index: 100;
    .cart {
      margin: unset;
      padding: unset;
      cursor: pointer;
      .number {
        color: var(--clr-white);
        left: -5px;
        top: -11px;
      }
    }
    a {
      color: white;
    }

    button {
      background: green;
      color: var(--clr-blue);
      font-size: var(--f-300);
      text-transform: uppercase;
      border: 1px solid var(--clr-gray);
      padding: 5px;

      transform: scale(1);
      transition: all 0.3s ease-in-out;
      cursor: pointer;

      &:hover {
        transform: scale(1.2);
      }
    }
    .btn-clear-cart {
      color: var(--clr-blue);
      background-color: unset;
      background-color: red !important;
      &:hover {
        background: var(--clr-gray);
      }
    }
  }

  main {
    .cart-products {
      display: flex;
      flex-direction: column;
      gap: 10px;
      padding-bottom: 10px;
      padding: 5px 10px;

      .cart-product {
        display: grid;
        grid-template-columns: repeat(6, 1fr);
        align-items: center;
        gap: 10px;
        padding-bottom: 10px;
        border-bottom: 1px solid var(--clr-gray);

        img {
          width: 100px;
          margin-right: 5px;

          grid-column: 1/2;
        }

        .details {
          grid-column: 2/6;
          font-size: var(--f-300);
          .title {
            color: white;
            margin-bottom: 5px;
            cursor: pointer;
            font-size: var(--f-300);
            text-transform: uppercase;
          }

          .quantity {
            font-size: var(--f-300);
            font-weight: bold;
          }
          .price {
            font-size: var(--f-300);
          }

          .subtotal {
            font-size: var(--f-300);
          }

          .incr-decr {
            display: flex;
            align-items: center;
            gap: 5px;
            margin-top: 5px;
            button {
              color: var(--clr-blue);
              border: 1px solid gray;
              padding: 2px 10px;
            }
          }
        }

        button {
          grid-column: 6/-1;
          background-color: white !important;
          display: flex;
          align-items: center;
          justify-content: center;
          border: none;
          padding: 5px;
          font-weight: bold;
          color: var(--clr-blue);
          font-size: var(--f-300);
          text-transform: uppercase;
          cursor: pointer;
          transform: scale(1);
          transition: transform 0.2s ease-in-out;

          &:active,
          &:hover {
            background-color: white;
          }
        }
      }
    }

    .total {
      //background-color: rgb(66, 54, 54);
      color: white;
      padding: 10px;
      display: flex;
      align-items: center;
      gap: 5px;
      font-size: var(--f-500);

      .price {
        font-weight: normal;
      }
    }

    .footer {
      padding-bottom: 10px;
      button {
        background: var(--clr-white);
        color: var(--clr-blue);
        font-size: 12px;
        font-weight: bold;
        text-transform: uppercase;
        border: 0px;
        margin-left: 10px;
        padding: 7px;
        cursor: pointer;

        &:hover {
          background: white;
        }
      }
    }

    .empty {
      display: flex;
      justify-content: center;
      img {
        width: 50%;
      }
    }
  }

  #close-icon {
    cursor: pointer;
    font-size: 30px;
    transform: rotate(0);
    transition: transform 0.2s ease-in-out;

    &:hover {
      transform: rotate(90deg);
    }
  }
}
</style>
