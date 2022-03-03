import { getCategories } from "@/services/categoryService";
const category = {
  namespaced: true,

  stateCategory: {
    categories: [],
  },

  actions: {
    async getCategories({ state, commit }) {
      try {
        const res = await getCategories();
        const result = await res.data;
        state.categories = result.data;
      } catch (error) {
        return error;
      }
    },
  },
};

export default category;
