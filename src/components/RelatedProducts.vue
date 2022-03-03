<template lang="">
  <div class="products relatedProducts">
    <div class="cat-title">
      <div class="left-side">
        <router-link :to="{name: 'category', params: {slug: `${category.slug}`}}">
        <span class="material-icons-outlined">
        category
        </span>
        related products
        </router-link>
      </div>
      <div class="right-side">
        <router-link :to="{name: 'category', params: {slug: `${category.slug}`}}">
          more
          </router-link>
      </div>
    </div>
    <Product
        v-for="product in relatedProducts"
        :key="product.id"
        :product="product"
      />

  </div>
</template>
<script>
import { onMounted, ref, toRefs, watch } from "vue";
import { getRelatedProducts } from "@/services/productService";
import Product from "@/components/Product.vue";
export default {
  components: { Product },
  props: {
    productId: Number,
    category: Object,
  },
  setup(props) {
    const { productId } = toRefs(props);
    const relatedProducts = ref([]);

    async function loadRelatedProducts(prodId) {
      try {
        const res = await getRelatedProducts(prodId);
        const result = await res.data;
        relatedProducts.value = result.data;
      } catch (error) {
      } finally {
      }
    }

    onMounted(async () => {
      await loadRelatedProducts(productId.value);
    });

    watch(productId, (newVal, oldVal) => {
      console.log(newVal);
      loadRelatedProducts(newVal);
    });

    return { relatedProducts };
  },
};
</script>
<style lang="scss" scoped>
.relatedProducts {
  padding-top: 1rem !important;
}

.cat-title {
  background-color: var(--clr-gray);
  color: var(--color-blue-light);
  display: flex;
  align-items: center;
}
</style>
