import apiClient from "./api";

const getOrders = () => {
  return apiClient.get(`orders`);
};

const showOrder = (orderNb) => {
  return apiClient.get(`orders/${orderNb}`);
};

const checkout = (order, isLoggedIn) => {
  if (isLoggedIn) {
    return apiClient.post("/auth/orders/checkout", order);
  }
  return apiClient.post("orders/checkout", order);
};

export { getOrders, showOrder, checkout };
