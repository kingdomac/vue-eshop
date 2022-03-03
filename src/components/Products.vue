<template lang="">
  <div class="products">
    <div class="cat-title">
      <div class="left-side">

        <span class="material-icons-outlined">
        category
        </span>
        <h1>
          <router-link :to="{name: 'category', params: {slug: `${category.slug}`}}">
          {{ category.name }}
          </router-link>
        </h1>

      </div>
      <div class="right-side">
        <router-link :to="{name: 'category', params: {slug: `${category.slug}`}}">
          [{{ category.products_count }}]
          </router-link>
      </div>
    </div>

    <slot></slot>
  </div>
</template>
<script>
export default {
  props: ["category"],
  components: {},

  setup() {
    return {};
  },
};
</script>
<style lang="scss">
.products {
  display: flex;
  flex-wrap: wrap;

  justify-content: center;
  align-items: flex-start;
  gap: 1.5rem;
  margin-top: 20px;
  //border: 1px solid red;
}
.cat-title {
  display: flex;
  justify-content: space-between;
  align-items: center;
  text-transform: uppercase;
  font-size: var(--f-300);
  margin-bottom: 2rem;
  flex-basis: 100%;
  margin: 0px;
  padding: 0px;
  color: white;
  background-color: var(--clr-blue);
  padding: 10px 10px;

  .left-side {
    display: flex;
    align-items: flex-end;
    gap: 5px;
  }
  .right-side {
    text-transform: none;
    font-weight: normal;
    cursor: pointer;
  }
}
</style>
