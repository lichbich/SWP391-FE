<template>
  <main class="mt-0 main-content">
    <section>
      <div class="page-header min-vh-100">
        <div class="container">
          <div class="row">
            <div
              class="mx-auto col-xl-4 col-lg-5 col-md-7 d-flex flex-column mx-lg-0"
            >
              <div class="card card-plain">
                <div class="pb-0 card-header text-start">
                  <h4 class="font-weight-bolder">Sign In</h4>
                  <p class="mb-0">Enter your email and password to sign in</p>
                </div>
                <div class="card-body">
                  <form role="form" @submit.prevent="onLogin">
                    <div class="mb-3">
                      <argon-input
                        type="email"
                        placeholder="Email"
                        name="email"
                        size="lg"
                        :value="formData.email"
                      />
                    </div>
                    <div class="mb-3">
                      <argon-input
                        type="password"
                        placeholder="Password"
                        name="password"
                        size="lg"
                        :value="formData.passwrod"
                      />
                    </div>

                    <div class="text-center">
                      <argon-button
                        class="mt-4"
                        variant="gradient"
                        color="success"
                        fullWidth
                        size="lg"
                        >Sign in</argon-button
                      >
                    </div>
                  </form>
                </div>
                <div class="px-1 pt-0 text-center card-footer px-lg-2">
                  <p class="mx-auto mb-4 text-sm">
                    Don't have an account?
                    <router-link
                      :to="pathSignUp"
                      class="text-success text-gradient font-weight-bold"
                      >Sign up</router-link
                    >
                  </p>
                </div>
              </div>
            </div>
            <div
              class="top-0 my-auto text-center col-6 d-lg-flex d-none h-100 pe-0 position-absolute end-0 justify-content-center flex-column"
            >
              <div
                class="position-relative bg-gradient-primary h-100 m-3 px-7 border-radius-lg d-flex flex-column justify-content-center overflow-hidden"
                style="
                  background-image: url('https://raw.githubusercontent.com/creativetimofficial/public-assets/master/argon-dashboard-pro/assets/img/signin-ill.jpg');
                  background-size: cover;
                "
              >
                <span class="mask bg-gradient-success opacity-6"></span>
                <h4
                  class="mt-5 text-white font-weight-bolder position-relative"
                >
                  "Attention is the new currency"
                </h4>
                <p class="text-white position-relative">
                  The more effortless the writing looks, the more effort the
                  writer actually put into the process.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>

<script>
import router from "../router";
import ArgonInput from "@/components/ArgonInput.vue";
import ArgonButton from "@/components/ArgonButton.vue";
const body = document.getElementsByTagName("body")[0];

export default {
  name: "signin",
  components: {
    ArgonInput,
    ArgonButton,
  },
  async beforeCreate() {
    if (this.$route.path === "/sign-in") {
      try {
        const { data } = await this.$http.get("/auth/check-authentication");
        this.$store.state.isClientAuth = true;
        this.$store.state.user = data.data;
        this.$router.push("/");
      } catch (error) {
        // const errorMsg =
        //   typeof error.response.data.message === "object"
        //     ? error.response.data.message[0]
        //     : error.response.data.message;
        // this.$toast(errorMsg, false);
      }
    }
  },
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
      formData: {
        email: "",
        passwrod: "",
      },
    };
  },
  computed: {
    pathSignUp() {
      console.log(this.$route.path);
      if (this.$route.path === "/admin/signin") {
        return "/admin/signup";
      } else {
        return "/sign-up";
      }
    },
  },
  methods: {
    async onLogin(submitEvent) {
      this.formData.email = submitEvent.target.elements.email.value;
      this.formData.passwrod = submitEvent.target.elements.password.value;

      try {
        if(!this.formData.email || !this.formData.passwrod) {
          this.$toast('Please enter email or password', false);
          return;
        }
        const formData = {
          email: this.formData.email,
          password: this.formData.passwrod,
        };
        const user = (await this.$http.post("/auth/login", formData)).data.data;

        if (this.$route.path === "/admin/signin" && user.role === "admin") {
          this.$store.state.user = user;
          this.$store.state.isAdminAuth = true;
          router.push("/admin/productlist");
        } else if (
          this.$route.path === "/admin/signin" &&
          user.role !== "admin"
        ) {
          this.$store.state.user = {};
          this.$store.state.isAdminAuth = false;
          this.$toast("You don't have permission to access this page", false);
          router.push("/admin/productlist");
        } else {
          this.$store.state.user = user;
          this.$store.state.isAdminAuth = user.role === "admin";
          this.$store.state.isClientAuth = user.role === "member";
          router.push("/");
        }

        this.$toast("Login successfully!");
      } catch (error) {
        this.$toast(error.response.data.message, false);
      }
    },
  },
};
</script>
