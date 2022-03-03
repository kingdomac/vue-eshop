<template lang="">
  <div class="search">
    <span @click="search" class="material-icons-outlined icon pointer">
    <label for="search">
      search
        </label>
    </span>
    <div class="input-query">
      <form @submit.prevent="search">

        <input v-model="searchQuery" id="search" type="text">
      </form>
    </div>
  </div>
</template>
<script>
import { ref } from "@vue/reactivity";
import { useRouter } from "vue-router";
export default {
  setup() {
    const router = useRouter();
    const searchQuery = ref("");

    function search() {
      router.push({
        name: "search",
        params: { query: `${searchQuery.value}` },
      });
      searchQuery.value = null;
    }

    return {
      searchQuery,
      search,
    };
  },
};
</script>
<style lang="scss" scoped>
.search {
  position: relative;
  width: 50%;
  margin-left: 5px;
  order: 5;
  margin-bottom: 10px;
  width: 100%;
  .icon {
    position: absolute;
    color: var(--clr-blue);
    left: 2px;
    top: 4px;
    font-size: var(--f-400);
  }
  .input-query {
    font-size: var(--f-300);
    width: 100%;

    input {
      height: 25px;
      border: 0px;
      background: none;
      color: var(--clr-blue);
      width: 100%;
      padding-left: 20px;
      background-color: var(--clr-white);
    }
  }
}

@media (min-width: 60em) {
  .search {
    order: -1;
    margin: 0px;

    .icon {
      font-size: var(--f-500);
      top: 2px;
    }
    .input-query {
      border: 1px solid var(--clr-blue);
      padding-left: 5px;
      width: 100%;
    }
  }
}
</style>
