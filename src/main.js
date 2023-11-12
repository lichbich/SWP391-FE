import { createApp } from "vue";
import App from "./App.vue";
import store from "./store";
import router from "./router";
import ToastPlugin from "./toastPlugin";
import "./assets/css/nucleo-icons.css";
import "./assets/css/nucleo-svg.css";
import ArgonDashboard from "./argon-dashboard";
import axios from "./axios";
import globalFilter from './filters';

const app = createApp(App);
app.config.globalProperties.$http = axios;
app.config.globalProperties.$filters = globalFilter;

// app.use(Table)
app.use(store);
app.use(router);
app.use(ToastPlugin);
app.use(ArgonDashboard);
app.mount("#app");
