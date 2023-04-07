import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";

import "leaflet/dist/leaflet.css";
import L from "leaflet";
// axios
import http from "./http";

const app = createApp(App);
app.config.globalProperties.$myGlobalVar = "Hello, world!";
app.config.globalProperties.$http = http;
window.$url = "https://demo.srgeo.com.tw/Kcg_Wrb_SP/api/v1/";

// app.mount("#app");
app.use(store).use(router).use(ElementPlus).mount("#app");
