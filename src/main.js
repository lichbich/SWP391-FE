import { createApp } from "vue";
import App from "./App.vue";
import store from "./store";
import router from "./router";
import ToastPlugin from "./toastPlugin";
import "./assets/css/nucleo-icons.css";
import "./assets/css/nucleo-svg.css";
// import "ant-design-vue/dist/reset.css";
import ArgonDashboard from "./argon-dashboard";
// import {Table} from 'ant-design-vue'
import axios from "axios";
import globalFilter from './filters';
window.axios = axios;

console.log(globalFilter);
const app = createApp(App);
app.config.globalProperties.$filters = globalFilter;


// app.use(Table)
app.use(store);
app.use(router);
app.use(ToastPlugin);
app.use(ArgonDashboard);
app.mount("#app");
