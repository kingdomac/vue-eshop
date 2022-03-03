import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import VueClickAway from "vue3-click-away";
import Toast from "vue-toastification";

// Import the CSS or use your own!
import "vue-toastification/dist/index.css";

import momentTimeZone from "moment-timezone";
//console.log(momentTimeZone.tz.guess());
momentTimeZone.tz.setDefault("Asia/Beirut");

const options = {
  // You can set your default options here
};

const app = createApp(App);
app.use(VueClickAway);
app.use(Toast, options);
app.use(store);
app.use(router);
app.mount("#app");
