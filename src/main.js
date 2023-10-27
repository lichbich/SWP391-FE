import { createApp } from "vue";
import App from "./App.vue";
import store from "./store";
import router from "./router";
import "./assets/css/nucleo-icons.css";
import "./assets/css/nucleo-svg.css";
// import "ant-design-vue/dist/reset.css";
import ArgonDashboard from "./argon-dashboard";
// import {Table} from 'ant-design-vue'
import axios from "axios";
window.axios = axios;


const app = createApp(App);


// app.use(Table)
app.use(store);
app.use(router);
app.use(ArgonDashboard);
app.mount("#app");
