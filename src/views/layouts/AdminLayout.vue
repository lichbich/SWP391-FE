<template>
  <div class="admin-layout">
    <router-view />
  </div>
</template>
  
<script>
export default {
  name: "Admin",
  async beforeCreate() {
    try {
      const { data: user } = await this.$http.get("/auth/check-authentication");
      if (user.data.role === "admin") {
        this.$store.state.isAdminAuth = true;
        this.$store.state.user = user.data;
        this.$router.push("/admin/productlist");
      }
    } catch (error) {
      // const errorMsg =
      //   typeof error.response.data.message === "object"
      //     ? error.response.data.message[0]
      //     : error.response.data.message;
      // this.$toast(errorMsg, false);
    }
  },
};
</script>
  