<template>
    <main class="mt-0 main-content">
    <div class="container top-0 position-sticky z-index-sticky">
        <div class="row">
          <div class="col-12">
            <navbar
              isBlur="blur  border-radius-lg my-3 py-2 start-0 end-0 mx-4 shadow"
              v-bind:darkMode="true"
              isBtn="bg-gradient-success"
            />
          </div>
        </div>
      </div>
      
        <div>jsdhfskjdf</div>
      </main>
</template>

<script>
import Navbar from "@/examples/PageLayout/Navbar.vue";
export default {
    name: "shopview",
    components: {
        Navbar,

    }
}
</script>