import { createStore } from "vuex";

export default createStore({
  state: {
    // auth
    user: {},
    isAdminAuth: false,
    isClientAuth: false,
    // cart
    cart: [],
    // config
    hideConfigButton: false,
    isPinned: true,
    showConfig: false,
    sidebarType: "bg-white",
    isRTL: false,
    mcolor: "",
    darkMode: false,
    isNavFixed: false,
    isAbsolute: false,
    showNavs: true,
    showSidenav: true,
    showNavbar: true,
    showFooter: true,
    showMain: true,
    layout: "default",
    loading: false,
    quantity: 0,
  },
  mutations: {
    toggleConfigurator(state) {
      state.showConfig = !state.showConfig;
    },
    setLoading(state, val) {
      state.loading = val;
    },
    setQuantity(state, val) {
      state.quantity = val;
    },
    setUser(state, val) {
      state.user = val;
    },
    navbarMinimize(state) {
      const sidenav_show = document.querySelector(".g-sidenav-show");

      if (sidenav_show.classList.contains("g-sidenav-hidden")) {
        sidenav_show.classList.remove("g-sidenav-hidden");
        sidenav_show.classList.add("g-sidenav-pinned");
        state.isPinned = true;
      } else {
        sidenav_show.classList.add("g-sidenav-hidden");
        sidenav_show.classList.remove("g-sidenav-pinned");
        state.isPinned = false;
      }
    },
    sidebarType(state, payload) {
      state.sidebarType = payload;
    },
    navbarFixed(state) {
      if (state.isNavFixed === false) {
        state.isNavFixed = true;
      } else {
        state.isNavFixed = false;
      }
    },
    initCartData(state) {
      state.cart = JSON.parse(localStorage.getItem('p_cart')) || [];
    },
    setCartData(state, p) {
      const isProductExist = state.cart.some(prod => prod.id === p.id);

      if (isProductExist) {
        state.cart = state.cart.map((c) => ({
          ...c,
          quantity: 1
        }))
      } else {
        p.quantity = 1;
        state.cart.push(p);
      }

      localStorage.setItem('p_cart', JSON.stringify(state.cart))
    },
    addCartQuantity(state, { p, isAdd }) {
      state.cart = state.cart.map((el) => {
        let product = el.id === p.id;

        if (product && isAdd) {
          el.quantity += 1;
        } else if (product && !isAdd && el.quantity > 1) {
          el.quantity -= 1;
        }
        return el
      })

      localStorage.setItem('p_cart', JSON.stringify(state.cart))
    },
    removeCartItem(state, p) {
      state.cart = state.cart.filter(prod => prod.id !== p.id);
      localStorage.setItem('p_cart', JSON.stringify(state.cart))
    },
    clearCartData(state) {
      state.cart = [];
      localStorage.setItem('p_cart', JSON.stringify([]))
    }
  },
  actions: {
    toggleSidebarColor({ commit }, payload) {
      commit("sidebarType", payload);
    }
  },
  getters: {
    loading: (state) => state.loading,
    quantity: (state) => state.cart.length,
    user: (state) => state.user,
  }
});
