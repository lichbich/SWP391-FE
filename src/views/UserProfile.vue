<template>
  <main>
    <div class="container mt-6" style="min-height: 600px;">
      <h4>User Information</h4>
      <div class="row">
        <div class="col-md-12 mt-4">
          <label class="form-control-label">Username:</label>
          <span class="user-text-info">{{ userInfo?.u_name }}</span>
        </div>
        <div class="col-md-12 mt-4">
          <label class="form-control-label">Email address:</label>
          <span class="user-text-info">{{ userInfo?.u_email }}</span>
        </div>
        <div class="col-md-12 mt-4">
          <label class="form-control-label">Address:</label>
          <span class="user-text-info">{{ userInfo?.u_address }}</span>
        </div>
        <div class="col-md-12 mt-4">
          <label class="form-control-label">Phone:</label>
          <span class="user-text-info">{{ userInfo?.u_phone }}</span>
        </div>
        <div class="col-md-12 mt-4">
          <label class="form-control-label">Create Date:</label>
          <span class="user-text-info">{{ new Date(userInfo?.createdAt).toLocaleDateString() }}</span>
        </div>
      </div>
    </div>
  </main>
</template>
  
<script>
import { mapState } from "vuex";
const body = document.getElementsByTagName("body")[0];

export default {
  name: "profile",
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
  data() {
    return {
      showMenu: false,
    };
  },
  computed: {
    ...mapState({
      userInfo: (state) => state.user,
    }),
  },
  mounted() {
    console.log(this.userInfo);
  },
};
</script>
<style lang="scss" scoped>
.form-control-label {
  min-width: 150px;
}
.user-text-info {
  color: #000;
  font-size: 15px;
  font-weight: 600;
  margin-left: 20px;
}
</style>
  