<template lang="">
<div v-if="Object.keys(product).length" ref="scrollTopElement">
  <div class="cat-title">
    <div class="product-header">
      <router-link
      :to="{name: 'category', params: {slug: `${product.category?.slug}`} }"
      custom
      v-slot="{ href,  navigate }"
      >
      <h1 :href="href" @click="navigate">{{ product.category?.name }}</h1>
      </router-link>
      /
      <h2>{{ product.name }}</h2>
    </div>
  </div>
  <div class="product">
    <div>
      <img :src="product.cover" :alt="product.name" />

      <div class="details">
        <div class="price">
          $<span :class="product.sale_price ? 'line-through' : ''">{{ price }}</span>
          <span v-if="product.sale_price"> | {{ salePrice }}</span>
        </div>
        <p class="tax">Tax included.</p>
        <div class="add-to-cart flex-justify-start">
          <button
          :class="product.in_stock === Number(itemInCart?.quantity) ? 'disabled' : ''"
          @click="addToCart(product,quantity)"
          class="btn-add-to-cart"
          id="btn-add-to-cart"
          >Add to cart</button>
          <span class="material-icons-outlined">
            warehouse
          </span>
          <span class="stock">{{ itemInCart?.quantity }} / {{ product.in_stock }}</span>
        </div>
      </div>
      <p class="info">
      {{ product.description }}
      </p>
    </div>
    <RelatedProducts style="clear:both" :productId="product.id" :category="product.category" />
  </div>

</div>
</template>
<script>
import { computed, toRefs, ref } from "@vue/reactivity";
import { onMounted, watch } from "@vue/runtime-core";
import { useStore } from "vuex";
import useSEO from "@/composables/useSEO";
import useCart from "@/composables/useCart";
import useStr from "@/composables/useStr";
import { getProduct } from "@/services/productService";
import RelatedProducts from "@/components/RelatedProducts.vue";

export default {
  components: {
    RelatedProducts,
  },
  props: {
    slug: { type: String, required: true },
  },
  setup(props) {
    const { setPageTitle } = useSEO();
    const { state, commit } = useStore();
    const { addToCart, findItem } = useCart();
    const { formatPrice } = useStr();

    const { slug } = toRefs(props);
    const scrollTopElement = ref(null);
    const product = ref([]);
    const quantity = ref(1);
    const price = computed(() => formatPrice(Number(product.value.price)));
    const salePrice = computed(() =>
      formatPrice(Number(product.value.sale_price))
    );
    const itemInCart = computed(() => {
      return state.cart.cart.find((item) => {
        return item.id === product.value.id;
      });
    });

    async function loadProduct() {
      try {
        commit("SET_IS_LOADING", true);
        const res = await getProduct(slug.value);
        product.value = await res.data.data;
        setPageTitle(`${product.value.category.name} - ${product.value.name}`);
      } catch (error) {
      } finally {
        commit("SET_IS_LOADING", false);
      }
    }

    function scrollTop(element) {
      element.scrollIntoView();
    }

    watch(slug, (newVal, oldVal) => {
      scrollTop(scrollTopElement.value);
      loadProduct();
    });

    onMounted(() => {
      loadProduct();
    });

    return {
      scrollTopElement,
      product,
      price,
      salePrice,
      quantity,
      itemInCart,
      addToCart,
      formatPrice,
    };
  },
};
</script>
<style lang="scss" scoped>
.cat-title {
  display: flex;
  justify-content: space-between;
  align-items: center;
  text-transform: uppercase;
  font-size: var(--f-400);
  margin-bottom: 2rem;
  flex-basis: 100%;
  margin: 0px;
  padding: 0px;
  color: white;
  background-color: var(--clr-blue);
  padding: 10px 10px;
}
.product-header {
  display: flex;
  align-items: center;
  gap: 10px;
  text-transform: uppercase;

  h1 {
    font-size: var(--f-300);
    cursor: pointer;
  }

  h2 {
    font-size: var(--f-500);
  }
}

.product {
  margin-top: 10vh;
  img {
    @media only screen and (max-width: 700px) {
      max-width: 300px;
      width: 100%;
      margin: 0 auto;
    }
    width: 300px;
    height: auto;
    float: left;
    margin-right: 20px;
    margin-bottom: 10px;
  }
  .details {
    @media only screen and (max-width: 700px) {
      clear: both;
      font-size: 16px;
    }
    .title {
      font-size: 1.3em;
      margin-bottom: 10px;
      text-transform: uppercase;
      font-weight: 500;
    }
    .price {
      font-size: 1em;
    }
    .tax {
      margin-bottom: 15px;
      margin-top: 5px;
      color: gray;
      font-size: 0.8em;
    }
  }
  .info {
    font-size: 1em;
    margin-top: 20px;
    line-height: 30px;
    padding-right: 100px;
  }
}
</style>
