<template lang="">
  <div class="product">

      <div class="header-image">
        <img :src="product.cover" :alt="product.name"/>
      </div>
      <router-link
      :to="{name: 'productDetails', params: {slug: `${product.slug}`, title: `${product.name}`} }"
      custom
      v-slot="{ href,  navigate }"
      >
      <div class="details" :href="href" @click="navigate" style="background-color:white">

        <div class="details-info">
          <h2 class="title">
          {{ product.name }}
          </h2>
          <p class="price">
            $<span :class="product.sale_price ? 'line-through' : ''">{{ formatPrice(product.price) }}</span>
            <span v-if="product.sale_price"> | {{ formatPrice(product.sale_price) }}</span>

          </p>
          <p class="tax">Tax included.</p>
          <p class="info">
            {{ strip(product.description, 12) }}
          </p>
        </div>

      </div>
    </router-link>
    <div class="add-to-cart">
      <span class="material-icons-outlined">
      warehouse
      </span>
      <span class="stock">{{ itemInCart?.quantity }} / {{ product.in_stock }}</span>
      <!-- <select v-model="quantity" class="select-qty">
        <option v-for="n in product.in_stock">{{ n }}</option>
      </select> -->
      <button
      :class="product.in_stock === Number(itemInCart?.quantity) ? 'disabled' : ''"
      @click="addToCart(product, quantity)"
      class="btn-add-to-cart"
      >Add to cart</button>
    </div>
  </div>
</template>
<script>
import { computed, ref, toRefs } from "@vue/reactivity";
import { useStore } from "vuex";
import useCart from "@/composables/useCart";
import useStr from "@/composables/useStr";

export default {
  props: ["product"],
  setup(props) {
    const { state } = useStore();
    const quantity = ref(1);
    const { product } = toRefs(props);
    const { addToCart } = useCart();
    const isSale = computed(() =>
      product.value.sale_price > 0 ? true : false
    );

    const itemInCart = computed(() =>
      state.cart.cart.find((item) => {
        return item.id === product.value.id;
      })
    );

    const { formatPrice, strip } = useStr();

    return { quantity, addToCart, itemInCart, isSale, formatPrice, strip };
  },
};
</script>
<style lang="scss" scoped>
.product {
  text-align: center;
  border: none;
  box-shadow: 0 2px 5px 0px rgba(0, 0, 0, 0.2);

  //border-radius: 10px;
  width: 250px;
  padding-bottom: 10px;

  text-align: left;
  .header-image {
    display: block;
    //width: 100px;
    margin-bottom: 10px;
    transform: scale(1);
    object-fit: cover;
    object-position: center;
    transition: transform 0.3s ease-in-out;
    overflow: hidden;

    img {
      display: block;
      width: 100%;
      aspect-ratio: 1/1.5;
      object-fit: cover;
      object-position: center;
      max-height: 300px;
      transform: scale(1);
      transition: 0.2s transform ease-in-out;
    }
    &:hover {
      img {
        transform: scale(1.025);
      }
    }
  }
  .details {
    cursor: pointer;
    overflow: hidden;
    //padding: 5px;

    .details-info {
      padding: 5px;
      text-align: left;
    }
    .title {
      color: var(--color-blue);
      font-size: var(--f-400);
      margin-bottom: 10px;

      text-transform: uppercase;
      text-decoration: none;
      cursor: pointer;
      font-weight: 500;
    }

    .price,
    .info {
      margin-top: 10px;
      font-size: var(--f-300);
      color: black;

      margin-bottom: 10px;
      line-height: 20px;
    }
    .info {
      height: 60px;
      overflow: hidden;
    }
    .tax {
      margin-top: 5px;
      font-size: 12px;
      line-height: 10px;
    }
  }
}
.stock {
  border: 1px solid var(--color-blue);
  padding: 5px;
  font-size: var(--f-300);
}
</style>
