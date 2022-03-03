import axios from "axios";
import router from "@/router";
import store from "@/store";
const apiClient = axios.create({
  baseURL: "http://127.0.0.1:8000/api/v1/",
  withCredentials: false,
  timeout: 10000,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

const requestHandler = (request) => {
  // Token will be dynamic so we can use any app-specific way to always
  // fetch the new token before making the call
  if (sessionStorage.token) {
    request.headers.Authorization =
      "Bearer " + JSON.parse(sessionStorage.token);
  }

  return request;
};

const responseHandler = (response) => {
  return response;
};

const errorHandler = (error) => {
  if (error.response.status === 401) {
    store.commit("auth/REMOVE_TOKEN");
    router.push({ name: "login" });
  } else if (error.response.status === 404) {
    router.push({ name: "home" });
  }
  return Promise.reject(error);
};

apiClient.interceptors.request.use(
  (request) => requestHandler(request),
  (error) => errorHandler(error)
);

apiClient.interceptors.response.use(
  (response) => responseHandler(response),
  (error) => errorHandler(error)
);

// apiClient.interceptors.request.use((request) => {
//   // request.headers.Accept = "application/json";
//   // if (sessionStorage.token) {
//   //   request.headers.Authorization =
//   //     "Bearer " + JSON.parse(sessionStorage.token);
//   // }

//   // request.headers.common["Content-Type"] = "application/json";

//   return request;
// });

// apiClient.interceptors.response.use(
//   (response) => {
//     return response;
//   },
//   (error) => {
//     // if (error.response.status == 401) {
//     //   store.commit("auth/REMOVE_TOKEN");
//     //   router.push({ name: "login" });
//     //   //sessionStorage.removeItem("user");
//     //   //sessionStorage.removeItem("token");
//     // }
//     return Promise.reject(error);
//   }
// );

export default apiClient;
