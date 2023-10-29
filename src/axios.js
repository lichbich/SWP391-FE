import axios from "axios";
import store from "./store";

const http = axios.create({
    headers: {
        Accept: "application/json",
    },
});

http.interceptors.request.use((config) => {
    store.commit("setLoading", true);
    return config;
});

http.interceptors.response.use(
    (res) => {
        store.commit("setLoading", false);
        return Promise.resolve(res);
    },
    (err) => {
        store.commit("setLoading", false);
        return Promise.reject(err);
    }
);

export default http;