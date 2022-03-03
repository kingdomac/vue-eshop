<template lang="">
  <div v-if="items.length">
    <div class="checkout-items">
      <div v-for="item in items" :key="item.id" class='checkout-item'>
        <div class="item-info">
          <div class="item-image">
            <img :src="item.cover" alt="item.name" />
          </div>
          <div>
            <h3 class="item-title">{{ item.name }}</h3>
            <div class="item-price">
              Price:
                  $<span :class="item?.sale_price ? 'line-through' : ''">{{ formatPrice(item.price) }}</span>
                  <span v-if="item?.sale_price"> | {{ formatPrice(item?.sale_price) }}</span>
            </div>
            <p class="tax">Tax included.</p>
            <div class="item-subtotal">Subtotal: ${{ formatPrice(item.totalPrice) }}</div>
            <div class="btn-incr-decr">
              <button  @click="removeFromCart(item)">-</button>
              <div class="quantity">
              {{ item.quantity }} / {{ item.in_stock }}
              </div>
              <button @click="addToCart(item,1)" :class="item.in_stock === Number(item.quantity) ? 'disabled' : ''">+</button>
            </div>
          </div>
        </div>
        <div class="item-action">
          <button class="item-remove">
            <span @click="removeItemFromCart(item)" class="material-icons-outlined">
            delete_outline
            </span>
          </button>
        </div>
      </div>
      <div class="item-total">
        Total: ${{ formatPrice(totalPrice) }}
      </div>
      <p class="tax">Tax included.</p>
    </div>
    <div class="login-experience" v-if="!isLoggedIn">
      <router-link :to="{name:'login'}">
       login for better experience
      </router-link>
    </div>

    <div class="payment-info">
      <form @submit.prevent="handleCheckout" class="form-container form-checkout">
          <div class="form-section">
            <div class="form-header">
              <span class="material-icons-outlined">
              payments
              </span>
              payment information
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
                  v-model.trim="orderState.name"
                  type="text"
                  name="name"
                  id="name"
                >
                <p v-if="orderState.errors['name']" class="errors">{{ orderState.errors['name'].toString() }}</p>
              </div>
              <div class="form-input">
                <label for="email" class="required">
                  <span class="material-icons-outlined">
                  email
                  </span>
                  email
                </label>
                <input v-model.trim="orderState.email" type="email" name="email" id="email">
                <p v-if="orderState.errors['email']" class="errors">{{ orderState.errors['email'].toString() }}</p>
              </div>
              <div class="form-input">
                <label for="email" class="required">
                  <span class="material-icons-outlined">
                  local_phone
                  </span>
                  phone
                </label>
                <input v-model="orderState.phone" type="phone" name="phone" id="phone">
                <p v-if="orderState.errors.phone" class="errors">{{ orderState.errors.phone.toString() }}</p>
              </div>
              <div class="form-input">
                <label for="address" class="required">
                  <span class="material-icons-outlined">
                  home
                  </span>
                 shipping address
                </label>
                <input v-model.trim="orderState.address" type="text" name="address" id="address">
                <p v-if="orderState.errors['address']" class="errors">{{ orderState.errors['address'].toString() }}</p>
              </div>
            </div>
          </div>
          <div class="form-section">
            <div class="form-header">
              <span class="material-icons-outlined">
              attach_money
              </span>
              payment method
            </div>
            <div class="form-body">
              <div class="payment-method">
                <label for="credit">
                  <input v-model="orderState.paymentMethod" type="radio" checked value="1" name="payment" id="credit">&nbsp;
                  <span class="material-icons-outlined">
                  credit_card
                  </span>
                  credit
                </label>

                <label for="paypal">
                  <input v-model="orderState.paymentMethod" type="radio"  value="2" name="payment" id="paypal">&nbsp;
                  <span class="material-icons-outlined">
                  credit_card
                  </span>
                  paypal
                </label>
              </div>
              <p v-if="orderState.errors['paymentMethod']" class="errors">{{ orderState.errors['paymentMethod'].toString() }}</p>
              <div class="form-input">
                <label for="card_number" class="required">
                  <span class="material-icons-outlined">
                  credit_card
                  </span>
                  card number
                </label>
                <input v-model.number="orderState.cardNumber" type="number" name="card_number" id="card_number">
                <p v-if="orderState.errors['cardNumber']" class="errors">{{ orderState.errors['cardNumber'].toString() }}</p>
              </div>
              <div class="form-input card-info">
                <div>
                    <label for="expiration_date" class="required">

                    expiration date <span class="month-year">(mm/yy)</span>
                  </label>
                  <div class="expiry-date">
                      <input
                      v-model="orderState.expiryMonth"
                      size="2"
                      maxlength="2"
                      class="expiry-date" type="text" name="expiration-date" id="expiration_date"> /
                      <input
                      v-model="orderState.expiryYear"
                      size="2" maxlength="2"
                      class="expiry-date" type="text" name="expiration-date" id="expiration_date">
                  </div>

                </div>
                <div>
                    <label for="security_code" class="required">
                    security code
                  </label>
                  <input v-model.number="orderState.securityNumber" type="number" name="security_code" id="security_code" style="width:100px">
                </div>
              </div>
              <div>
                <ul class="errors">
                  <li v-if="orderState.errors['expiryDate']">{{ orderState.errors['expiryDate'].toString() }}</li>
                  <li v-if="orderState.errors['securityNumber']">{{ orderState.errors['securityNumber'].toString() }}</li>
                </ul>

              </div>
            </div>
          </div>
          <div class="form-footer">
            <button type="submit" :disabled="orderState.isSubmitted">proceed with payment</button>
          </div>


      </form>
    </div>
  </div>
   <div class="emtpy-checkout" v-else>Your cart is currently empty. <router-link :to="{name: 'home'}" class="continue-shopping">Continue Shopping</router-link></div>
</template>
<script>
import { computed, reactive, onMounted } from "vue";
import useCart from "@/composables/useCart";
import useStr from "@/composables/useStr";
import { checkout } from "@/services/orderService";
import { useRouter } from "vue-router";
import { useToast } from "vue-toastification";
import { useStore } from "vuex";
export default {
  components: {},
  setup() {
    const toast = useToast();
    const router = useRouter();
    const { state: storeState, getters } = useStore();
    const {
      state,
      cartCounter,
      totalPrice,
      addToCart,
      removeFromCart,
      removeItemFromCart,
      clearCart,
    } = useCart();
    const { formatPrice, formatWithSalePrice } = useStr();

    const items = computed(() => state.cart.cart);
    const isLoggedIn = computed(() => getters["auth/isLoggedIn"]);
    const authenticatedUser = computed(() => state.auth.user);

    const orderState = reactive({
      name: "",
      email: "",
      phone: "",
      address: "",
      paymentMethod: 1,
      cardNumber: null,
      expiryMonth: null,
      expiryYear: null,
      expiryDate: computed(() => {
        return orderState.expiryMonth + "/" + orderState.expiryYear;
      }),
      securityNumber: null,
      items: [],
      errors: [],
      isSubmitted: false,
    });

    const loadAuthUserInfo = () => {
      if (isLoggedIn && authenticatedUser) {
        orderState.name = authenticatedUser.value.name;
        orderState.email = authenticatedUser.value.email;
        orderState.address = authenticatedUser.value.address;
        orderState.phone = authenticatedUser.value.phone;
      }
    };

    const handleCheckout = async () => {
      try {
        orderState.errors = [];
        orderState.isSubmitted = true;
        orderState.items = items.value.map((item) => {
          return {
            id: item.id,
            quantity: item.quantity,
          };
        });
        const res = await checkout({ ...orderState }, isLoggedIn.value);

        const result = await res.data;

        if (result.data.number) {
          clearCart();
          router.push({
            name: "order",
            params: { orderNumber: result.data.number },
          });
        }
        toast.success("Order Successfully purchased", {
          timeout: 3000,
        });
      } catch (error) {
        if (error.response.data.errors.payment) {
          toast.error("Payment process failed!", {
            timeout: 5000,
          });
        } else if (error.response.data.errors) {
          orderState.errors = error.response.data.errors;
        }
      } finally {
        orderState.isSubmitted = false;
      }
    };

    onMounted(() => {
      if (items.value.length === 0) {
        router.push({ name: "home" });
      }
      loadAuthUserInfo();
    });

    return {
      isLoggedIn,
      authenticatedUser,
      items,
      cartCounter,
      totalPrice,
      addToCart,
      removeFromCart,
      removeItemFromCart,
      clearCart,
      formatPrice,
      formatWithSalePrice,
      handleCheckout,
      orderState,
    };
  },
};
</script>
<style lang="scss" scoped>
.form-container {
  min-width: 100% !important;
}
.expiry-date {
  display: flex;
  gap: 0.5rem;
  align-items: center;
}
.checkout-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
  margin-bottom: 10px;
  &:hover {
    background-color: var(--clr-gray);
  }
  .item-info {
    display: flex;
    align-items: flex-start;
    gap: 2rem;
    cursor: pointer;
    .item-image {
      width: 100px;
      overflow: hidden;
      img {
        display: block;
        width: 100%;
        max-height: 200px;
        object-fit: cover;
        object-position: center;
      }
    }

    .item-title {
      font-size: 1rem;
      text-transform: uppercase;
    }

    .item-price {
      font-size: 0.9rem;
      margin-top: 5px;
    }

    .item-subtotal {
      font-size: 1.2rem;
      margin-top: 10px;
    }

    .btn-incr-decr {
      display: flex;
      align-items: center;
      gap: 1rem;
      margin-top: 5px;

      button {
        background-color: var(--clr-blue-light);
        color: var(--clr-white);
        font-size: 1rem;
        padding: 2px 10px;
      }
    }
  }

  .item-action {
    .item-remove {
      background: none;
      cursor: pointer;
    }
  }
}
.login-experience {
  transform: translateY(0);
  margin-top: 20px;
  display: flex;
  justify-content: center;
  a {
    text-transform: uppercase;
    background-color: var(--clr-red);
    text-align: center;
    color: var(--clr-white);
    padding: 10px 10px;
  }

  &:active {
    transform: translateY(2px);
  }
}

.item-total {
  text-transform: uppercase;
  font-size: var(--f-500);
  margin-top: 20px;
}

.payment-info {
  margin-top: 1rem;
  display: flex;
  justify-content: flex-start;
  text-align: left;
}

.form-checkout {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.4rem;

  @media screen and (max-width: 40rem) {
    grid-template-columns: 1fr;
  }

  .form-footer {
    margin: 0px 10px;
    grid-column: 1/-1;
    button {
      font-size: 1em !important;
    }
  }

  .payment-method {
    display: flex;
    justify-content: center;
    gap: 20px;
    padding-bottom: 20px;
  }

  .month-year {
    text-transform: lowercase;
    color: rgb(112, 112, 112);
  }

  .card-info {
    display: flex;
    flex-direction: row;
    gap: 1rem;
  }
}

.emtpy-checkout {
  padding-top: 50px !important;
}

.continue-shopping {
  background-color: var(--clr-blue-light);
  color: var(--clr-white);
  padding: 10px;
}
</style>
