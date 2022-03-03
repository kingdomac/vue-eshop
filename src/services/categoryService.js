import apiClient from "./api";

const getCategories = () => {
  return apiClient.get("categories");
};

const getHomeCategories = () => {
  return apiClient.get("categories-home");
};

const getCategoryProducts = (slug, perPage = 10, page = 1) => {
  return apiClient.get(
    `categories/${slug}/products/?per_page=${perPage}&page=${page}`
  );
};

export { getCategories, getHomeCategories, getCategoryProducts };
