import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";

// You can use the following starter router instead of the default one as a clean starting point
// import router from "./router/starter";
import router from "./router";

// Template components
import BaseBlock from "@/components/BaseBlock.vue";
import BaseBackground from "@/components/BaseBackground.vue";
import BasePageHeading from "@/components/BasePageHeading.vue";

// Template directives
import clickRipple from "@/directives/clickRipple";

// Bootstrap framework
import * as bootstrap from "bootstrap";
window.bootstrap = bootstrap;

import Toast from "vue3-toastify";
import "vue3-toastify/dist/index.css";

// Craft new application
const app = createApp(App);

// Register global components
app.component("BaseBlock", BaseBlock);
app.component("BaseBackground", BaseBackground);
app.component("BasePageHeading", BasePageHeading);

// Register global directives
app.directive("click-ripple", clickRipple);

app.use(Toast, {
  // Global options for toast notifications
  autoClose: 3000,
  theme: "dark",
  position: "top-right",
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
});
app.use(createPinia());
app.use(router);

// ..and finally mount it!
app.mount("#app");
