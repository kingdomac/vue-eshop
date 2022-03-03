import apiClient from "./api";

const register = ($data) => {
  return apiClient.post("register", $data);
};

const login = (email, password) => {
  return apiClient.post("login", { email, password });
};

const socialiteLogin = (provider) => {
  return apiClient.get(`auth/redirect/${provider}`);
};

const logout = () => {
  return apiClient.post("logout");
};

const getUserInfo = () => {
  return apiClient.get("user");
};

const updateAuthUser = (user) => {
  return apiClient.put("user", user);
};

const forgotPassword = (email) => {
  return apiClient.post("forgot-password", { email });
};

const resetPassword = (obj) => {
  return apiClient.post("reset-password", obj);
};

const changePassword = (obj) => {
  return apiClient.put("change-password", obj);
};

export {
  register,
  login,
  logout,
  getUserInfo,
  forgotPassword,
  resetPassword,
  updateAuthUser,
  changePassword,
  socialiteLogin,
};
