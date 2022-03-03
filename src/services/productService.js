import apiClient from "./api";

const getProduct = (slug) => {
  return apiClient.get(`/products/${slug}/`);
};

const getRelatedProducts = (id) => {
  return apiClient.get(`/products/${id}/related-products`);
};

const getAllProducts = (query = "", perPage = 10, page = 1) => {
  let uriQuery = "";

  if (query) {
    uriQuery += `&query=${query}`;
  }

  if (perPage) {
    uriQuery += `&per_page=${perPage}`;
  }

  if (page) {
    uriQuery += `&page=${page}`;
  }

  return apiClient.get(`/products?${uriQuery}`);
};

export { getProduct, getRelatedProducts, getAllProducts };
