<template>
  <div class="home-page">
    <div class="header">
      <div class="container header-container">
        <div class="logo">
          <img src="../../assets/img/logos/home-logo.png" alt="" />
        </div>
        <div class="search-area">
          <input type="text" placeholder="I'm searching for..." />
          <div class="search-btn">Search</div>
        </div>
        <div class="action-area">
          <div class="action-btn">Like</div>
          <div class="action-btn">Cart</div>
          <div class="action-btn">Account</div>
        </div>
      </div>
    </div>
    <router-view />
    <div style="margin-top: 60px">asd</div>
  </div>
</template>
  
<script>
const body = document.getElementsByTagName("body")[0];

export default {
  name: "Home",
  components: {},
  created() {
    this.$store.state.hideConfigButton = true;
    this.$store.state.showNavbar = false;
    this.$store.state.showSidenav = false;
    this.$store.state.showFooter = false;
    body.classList.remove("bg-gray-100");
  },
  beforeUnmount() {
    this.$store.state.hideConfigButton = false;
    this.$store.state.showNavbar = true;
    this.$store.state.showSidenav = true;
    this.$store.state.showFooter = true;
    body.classList.add("bg-gray-100");
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
        border-left: 1px solid #eee;
      }
    }
  }
}
</style>
  