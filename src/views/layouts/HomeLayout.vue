<template>
  <div class="home-page">
    <div class="header">
      <div class="container header-container">
        <div class="logo">
          <router-link to="/" class="action-btn">
            <img src="../../assets/img/logos/home-logo.png" alt="" />
          </router-link>
        </div>
        <div class="search-area">
          <input
            type="text"
            placeholder="I'm searching for..."
            v-model="searchText"
            @keydown.enter="onSearch"
          />
          <div class="search-btn" @click="onSearch">Search</div>
        </div>
        <div class="action-area">
          <router-link to="/cart" class="action-btn">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="feather feather-shopping-cart"
            >
              <circle cx="9" cy="21" r="1"></circle>
              <circle cx="20" cy="21" r="1"></circle>
              <path
                d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"
              ></path>
            </svg>
            <span class="card-count">{{ quantity }}</span>
          </router-link>
          <router-link to="/sign-in" v-if="!isClientAuth" class="action-btn">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="feather feather-user"
            >
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
              <circle cx="12" cy="7" r="4"></circle>
            </svg>
          </router-link>
          <div v-else class="action-btn">
            <router-link to="/profile">
              <span class="account-text"> Wellcome {{ userInfo.u_name }} </span>
            </router-link>
            <span class="logout-text" @click="logout">
              <i class="fa fa-sign-out me-sm-2"></i>
              <span class="d-sm-inline d-none">Logout</span>
            </span>
          </div>
        </div>
      </div>
    </div>
    <router-view />
    <div style="margin-top: 60px">
      <app-footer />
    </div>
  </div>
</template>
  
<script>
import { mapState } from "vuex";
import AppFooter from "@/examples/PageLayout/Footer.vue";
const body = document.getElementsByTagName("body")[0];

export default {
  name: "Home",
  components: {
    AppFooter,
  },
  async beforeCreate() {
    try {
      const { data } = await this.$http.get("/auth/check-authentication");
      this.$store.state.isClientAuth = true;
      this.$store.state.user = data.data;
      this.$router.replace("/");
    } catch (error) {
      // const errorMsg =
      //   typeof error.response.data.message === "object"
      //     ? error.response.data.message[0]
      //     : error.response.data.message;
      // this.$toast(errorMsg, false);
    }
  },
  created() {
    this.$store.state.hideConfigButton = true;
    this.$store.state.showNavbar = false;
    this.$store.state.showSidenav = false;
    this.$store.state.showFooter = false;
    body.classList.remove("bg-gray-100");

    this.$store.commit("initCartData");
  },
  beforeUnmount() {
    this.$store.state.hideConfigButton = false;
    this.$store.state.showNavbar = true;
    this.$store.state.showSidenav = true;
    this.$store.state.showFooter = true;
    body.classList.add("bg-gray-100");
  },
  data() {
    return {
      searchText: "",
    };
  },
  computed: {
    quantity() {
      return this.$store.getters.quantity;
    },
    ...mapState({
      userInfo: (state) => state.user,
      isClientAuth: (state) => state.isClientAuth,
    }),
  },
  methods: {
    async logout() {
      await this.$http.get("/auth/logout");
      this.$toast("Logout successfully!");
      this.$store.state.user = false;
      this.$store.state.isClientAuth = false;
      this.$router.go("/");
      localStorage.clear();
    },
    onSearch() {
      if (this.searchText.trim() !== "") {
        this.$router.push({
          path: "/search",
          query: { search: this.searchText },
        });
      }
    },
  },
};
</script>
  
<style lang="scss" scoped>
.home-page {
  .header {
    padding: 25px 0;
    box-shadow: 0 0 8px 0px #ccc;
  }

  .header-container {
    display: flex;
    align-items: center;
    justify-content: space-between;

    .logo {
      width: 150px;

      img {
        width: 100%;
      }
    }

    .search-area {
      width: 500px;
      height: 50px;
      display: flex;
      align-items: center;
      height: fit-content;

      input {
        width: 100%;
        height: 100%;
        padding: 10px;
        border-top-left-radius: 5px;
        border-bottom-left-radius: 5px;
        border: 1px solid #ccc;
        outline: none;
      }

      img {
        width: 100%;
      }
    }

    .search-area {
      width: 500px;
      height: 50px;
      display: flex;
      align-items: center;
      height: fit-content;

      input {
        width: 100%;
        height: 100%;
        padding: 10px;
        border-top-left-radius: 5px;
        border-bottom-left-radius: 5px;
        border: 1px solid #ccc;
        outline: none;
      }

      .search-btn {
        height: 100%;
        padding: 8px 8px 8.5px;
        border: 1px solid #ccc;
        border-left: none;
        border-top-right-radius: 5px;
        border-bottom-right-radius: 5px;
        cursor: pointer;
      }
    }

    .action-area {
      display: flex;

      .action-btn {
        padding: 5px 15px;
        position: relative;
        border-left: 1px solid #eee;

        svg {
          width: 20px;
        }
      }

      .card-count {
        top: 3px;
        right: 6px;
        width: 15px;
        height: 15px;
        display: flex;
        font-size: 12px;
        color: white;
        position: absolute;
        border-radius: 3px;
        align-items: center;
        justify-content: center;
        background-color: #ff7272;
        border: 1px solid #ff7272;
      }
    }
  }

  .action-area {
    display: flex;

    .action-btn {
      padding: 5px 15px;
      border-left: 1px solid #eee;
    }
  }

  .account-text {
    font-size: 14px;
    font-weight: bold;
    color: #0da487;
  }

  .logout-text {
    margin-left: 20px;
    font-size: 14px;
    font-weight: bold;
    color: #000;
    cursor: pointer;
  }
}
</style>
  