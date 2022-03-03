<template lang="">
  <div ref="scrollTopElement">
    <div class="cat-title">
      <div class="left-side">
        <span class="material-icons-outlined">
        pageview
        </span>
        {{ query }}
      </div>
      <div class="right-side">
        [{{ search.count }} / {{ search.totalCount }}]

      </div>
    </div>
    <div class="products relatedProducts" v-if="search.result.length">
      <Product
        v-for="product in search.result"
        :key="product.id"
        :product="product"
      />
    </div>
    <div v-else class="no-results">
      <div v-if="!showLoader">No results found...</div>
    </div>
    <div v-if="search.errors.length">
      <ul class="search-errors">
        <li class="error" v-for="(error, index) in search.errors" :key="index">{{ error.toString() }}</li>
      </ul>
    </div>

    <div ref="bottomOfPage">
      <div class="scroll-loader" v-if="showLoader">
        <div class="lds-facebook"><div></div><div></div><div></div></div>
      </div>
    </div>
    </div>
</template>
<script>
import { ref, toRefs, onMounted, watch, reactive, computed } from "vue";
import { getAllProducts } from "@/services/productService";
import useScrollPagination from "@/composables/useScrollPagination";
import Product from "@/components/Product.vue";
export default {
  components: {
    Product,
  },
  props: {
    query: {
      type: String,
    },
  },
  setup(props) {
    const { query } = toRefs(props);
    const search = reactive({
      result: [],
      totalCount: 0,
      count: 0,
      errors: [],
    });
    const scrollTopElement = ref(null);
    const bottomOfPage = ref(null);
    const {
      initialScrollPagination,
      scrollPaginationState,
      scrollTriger,
      scrollTop,
    } = useScrollPagination();

    const getResult = () => {
      if (query.value.trim().length < 3) {
        search.result = [];
        search.errors[0] = "The query must be at least 3 characters.";
      } else {
        scrollTriger(
          () =>
            loadSearchResult(
              query.value,
              scrollPaginationState.maxPerPage,
              scrollPaginationState.currentPage
            ),
          bottomOfPage
        );
      }
    };

    const loadSearchResult = async (query, perPage, currentPage) => {
      try {
        const res = await getAllProducts(query, perPage, currentPage);
        const newProducts = res.data.data;

        search.totalCount = res.data.meta.total;
        if (search.result) {
          search.result = [...search.result, ...newProducts];
        } else {
          search.result = newProducts;
        }
        search.count = search.result.length;
        scrollPaginationState.numberOfPages = res.data.meta.last_page;
      } catch (error) {
        if (error.response.data.errors) {
          search.errors = error.response.data.errors;
        }
      }
    };

    onMounted(async () => {
      getResult();
    });

    watch(query, (newVal, oldVal) => {
      scrollTop(scrollTopElement.value);
      search.result = [];
      search.errors = [];
      Object.assign(scrollPaginationState, initialScrollPagination);
      getResult();
    });

    return {
      search,
      scrollTopElement,
      bottomOfPage,
      showLoader: computed(() => scrollPaginationState.showLoader),
    };
  },
};
</script>
<style lang="scss" scoped>
.no-results {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 1rem;
  font-size: var(--f-400);
}
.search-errors {
  border: 1px solid red;
  display: flex;
  flex-direction: column;
  gap: clamp(0.5rem, 4vw, 1rem);
  font-size: clamp(0.8rem, 2vw, 1rem);
  padding: 5px;
  color: var(--clr-red);
}
</style>
