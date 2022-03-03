<template>
  <div>
    <div class="banner"><img src="@/assets/banner.jpg" alt="shop now" /></div>
    <div v-for="category in homeCategories" :key="category.id">
      <Products :category="category">
        <Product
          v-for="product in category.products"
          :key="product.id"
          :product="product"
        />
      </Products>
    </div>
  </div>
</template>

<script>
import Products from "@/components/Products.vue";
import Product from "@/components/Product.vue";
import { onMounted, ref } from "vue";

import { getHomeCategories } from "@/services/categoryService";
import { useStore } from "vuex";
import useSEO from "@/composables/useSEO";

export default {
  name: "Home",
  components: {
    Products,
    Product,
  },

  setup() {
    const { commit } = useStore();
    const { setPageTitle } = useSEO();

    const homeCategories = ref([]);

    async function loadHomeCategories() {
      try {
        commit("SET_IS_LOADING", true);
        const res = await getHomeCategories();
        homeCategories.value = await res.data.data;
        // const result = [];
        // homeCategories.value.forEach((category, index) => {
        //   result.push(getProducts(category.slug, 4));
        //   //homeCategories.value[index].products = result.data.data;
        // });
        // const newResponse = await Promise.all(result);
        // newResponse.forEach((element, index) => {
        //   homeCategories.value[index].products = element.data.data;
        // });
      } catch (error) {
        console.log("error occurred");
      } finally {
        commit("SET_IS_LOADING", false);
      }
    }

    onMounted(async () => {
      await loadHomeCategories();
    });

    return {
      homeCategories,
    };
  },
};
</script>

<style lang="scss">
</style>
