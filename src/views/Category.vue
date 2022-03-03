<template lang="">
  <div ref="scrollTopElement">
    <Products v-if="category.name" :category="category">
        <Product
        v-for="(product, index) in category.products"
        :key="product.id"
        :product="product"
      />
    </Products>
    <div ref="bottomOfPage">
      <div class="scroll-loader" v-if="showLoader">
        <div class="lds-facebook"><div></div><div></div><div></div></div>
      </div>
    </div>

  </div>
</template>
<script>
import { ref, toRefs, computed } from "@vue/reactivity";
import { onMounted, watch } from "@vue/runtime-core";

import Products from "@/components/Products.vue";
import Product from "@/components/Product.vue";
import { getCategoryProducts } from "@/services/categoryService";
import useScrollPagination from "@/composables/useScrollPagination";

export default {
  props: {
    slug: {
      type: String,
      required: true,
    },
  },
  components: {
    Products,
    Product,
  },
  setup(props) {
    const category = ref([]);
    const { slug } = toRefs(props);
    const scrollTopElement = ref(null);
    const bottomOfPage = ref(null);

    const { initialScrollPagination, scrollPaginationState, scrollTriger } =
      useScrollPagination();

    const loadCategoryProductsWhenScrolling = async (
      slug,
      perPage,
      currentPage
    ) => {
      try {
        const res = await getCategoryProducts(slug, perPage, currentPage);
        const newCategoryProducts = res.data.data;

        if (category.value.products) {
          category.value.products = [
            ...category.value.products,
            ...newCategoryProducts.products,
          ];
        } else {
          category.value = newCategoryProducts;
        }

        scrollPaginationState.numberOfPages = res.data.meta.last_page;
      } catch (error) {
        console.log(error);
      } finally {
      }
    };

    function scrollTop(element) {
      element.scrollIntoView();
    }

    watch(slug, (newVal, oldVal) => {
      scrollTop(scrollTopElement.value);
      Object.assign(scrollPaginationState, initialScrollPagination);
      category.value = [];

      scrollTriger(
        () =>
          loadCategoryProductsWhenScrolling(
            slug.value,
            scrollPaginationState.maxPerPage,
            scrollPaginationState.currentPage
          ),
        bottomOfPage
      );
    });

    onMounted(async () => {
      scrollTriger(
        () =>
          loadCategoryProductsWhenScrolling(
            slug.value,
            scrollPaginationState.maxPerPage,
            scrollPaginationState.currentPage
          ),
        bottomOfPage
      );
    });

    return {
      category,
      scrollTopElement,
      bottomOfPage,
      showLoader: computed(() => scrollPaginationState.showLoader),
    };
  },
};
</script>
<style lang="scss">
</style>
