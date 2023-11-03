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
      const { data } = await this.$http.get("/auth/check-authentication");
      this.$store.state.isAdminAuth = true;
      this.$store.state.adminInfo = data.data;
      this.$router.replace("/admin/dashboard");
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
  