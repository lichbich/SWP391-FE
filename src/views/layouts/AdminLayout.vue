<template>
    <div class="admin-layout">
        <router-view />
    </div>
</template>
  
<script>

export default {
    name: "Admin",
    components: {
    },
    created() {
        // this.$store.state.hideConfigButton = true;
        // this.$store.state.showNavbar = false;
        // this.$store.state.showSidenav = false;
        // this.$store.state.showFooter = false;
        // body.classList.remove("bg-gray-100");
    },
    beforeUnmount() {
        // this.$store.state.hideConfigButton = false;
        // this.$store.state.showNavbar = true;
        // this.$store.state.showSidenav = true;
        // this.$store.state.showFooter = true;
        // body.classList.add("bg-gray-100");
    },
};
</script>
  
<style lang="scss" scoped></style>
  