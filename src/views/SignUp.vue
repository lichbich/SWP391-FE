<template>
  <main class="main-content mt-0">
    <div
      class="page-header align-items-start min-vh-50 pt-5 pb-11 m-3 border-radius-lg"
      style="
        background-image: url('https://raw.githubusercontent.com/creativetimofficial/public-assets/master/argon-dashboard-pro/assets/img/signup-cover.jpg');
        background-position: top;
      "
    >
      <span class="mask bg-gradient-dark opacity-6"></span>
      <div class="container">
        <div class="row justify-content-center">
          <div class="col-lg-5 text-center mx-auto">
            <h1 class="text-white mb-2 mt-5">Welcome!</h1>
            <p class="text-lead text-white">
              Use these awesome forms to login or create new account in your
              project for free.
            </p>
          </div>
        </div>
      </div>
    </div>
    <div class="container">
      <div class="row mt-lg-n10 mt-md-n11 mt-n10 justify-content-center">
        <div class="col-xl-4 col-lg-5 col-md-7 mx-auto">
          <div class="card z-index-0">
            <div class="card-header text-center pt-4">
              <h5>Register with</h5>
            </div>
            <div class="card-body">
              <form role="form" @submit.prevent="onSignUp">
                <argon-input
                  type="text"
                  name="name"
                  placeholder="Name"
                  aria-label="Name"
                  v-model="v$.formData.userName.$model"
                  :errorMsg="
                    v$.formData.userName.$errors.length
                      ? v$.formData.userName.$errors[0].$message
                      : ''
                  "
                />
                <argon-input
                  type="email"
                  name="email"
                  placeholder="Email"
                  aria-label="Email"
                  v-model="v$.formData.userEmail.$model"
                  :errorMsg="
                    v$.formData.userEmail.$errors.length
                      ? v$.formData.userEmail.$errors[0].$message
                      : ''
                  "
                />
                <argon-input
                  type="password"
                  name="password"
                  placeholder="Password"
                  aria-label="Password"
                  v-model="v$.formData.userPassword.$model"
                  :errorMsg="
                    v$.formData.userPassword.$errors.length
                      ? v$.formData.userPassword.$errors[0].$message
                      : ''
                  "
                />
                <argon-input
                    type="password"
                    name="password"
                    placeholder="Re-Enter the password"
                    aria-label="Password"
                    v-model="v$.formData.rePassword.$model"
                    :errorMsg="
                    v$.formData.rePassword.$errors.length
                      ? v$.formData.rePassword.$errors[0].$message
                      : ''
                  "
                />
                <argon-input
                  type="text"
                  name="address"
                  placeholder="Address"
                  v-model="v$.formData.userAddress.$model"
                />
                <argon-input
                  type="text"
                  name="phoneNumber"
                  placeholder="Phone Number"
                  v-model="v$.formData.userPhoneNumber.$model"
                  :errorMsg="
                    v$.formData.userPhoneNumber.$errors.length
                      ? v$.formData.userPhoneNumber.$errors[0].$message
                      : ''
                  "
                />
                <div class="text-center">
                  <argon-button
                    fullWidth
                    color="dark"
                    variant="gradient"
                    class="my-4 mb-2"
                    >Sign up</argon-button
                  >
                </div>
                <p class="text-sm mt-3 mb-0">
                  Already have an account?
                  <router-link
                    :to="pathSignIn"
                    class="text-dark font-weight-bolder"
                    >Sign in</router-link
                  >
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
  <app-footer />
</template>

<script >
import useVuelidate from "@vuelidate/core";
import AppFooter from "@/examples/PageLayout/Footer.vue";
import ArgonInput from "@/components/ArgonInput.vue";
import ArgonButton from "@/components/ArgonButton.vue";
import {helpers, numeric, required, sameAs} from "@vuelidate/validators";

const body = document.getElementsByTagName("body")[0];

export default {
  name: "signin",
  components: {
    AppFooter,
    ArgonInput,
    ArgonButton,
  },
  async beforeCreate() {
    if (this.$route.path === "/sign-up") {
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
  setup() {
    return { v$: useVuelidate() };
  },
  computed: {
    pathSignIn() {
      if (this.$route.path === "/admin/signup") {
        return "/admin/signin";
      } else {
        return "/sign-in";
      }
    },
  },
  data() {
    return {
      formData: {
        userName: "",
        userEmail: "",
        userAddress: "",
        userPassword: "",
        userPhoneNumber: "",
        rePassword: ""
      },
    };
  },
  validations() {
    return {
      formData: {
        userName: { required },
        userEmail: { required },
        userAddress: {},
        userPassword: { required },
        rePassword: { required, sameAsPassword: helpers.withMessage(
              "Password and Confirm Password must match",
              sameAs(this.formData.userPassword)
          ), },
        userPhoneNumber: { required, numeric },
      },
    };
  },
  methods: {
    async onSignUp() {
      this.v$.$touch();
      if (this.v$.$invalid) return;
      try {
        const user = {
          u_name: this.formData.userName,
          u_email: this.formData.userEmail,
          u_address: this.formData.userAddress,
          u_phone: this.formData.userPhoneNumber,
          u_password: this.formData.userPassword,
        };
        await this.$http.post("/auth/sign-up", user);
        if (this.$route.path === "/admin/signup") {
          this.$router.push("/admin/signin");
        } else {
          this.$router.push("/sign-in");
        }
        this.$toast("Sign up successfully!");
      } catch (error) {
        const errorMsg =
          typeof error.response.data.message === "object"
            ? error.response.data.message[0]
            : error.response.data.message;
        this.$toast(errorMsg, false);
      }
    },
  },
};
</script>
