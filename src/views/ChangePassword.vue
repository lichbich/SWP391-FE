<template>
  <main>
    <div class="container-fluid">
      <div
        class="page-header min-height-300"
        style="
          background-image: url('https://images.unsplash.com/photo-1531512073830-ba890ca4eba2?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80');
          margin-right: -24px;
          margin-left: -34%;
        "
      >
        <span class="mask bg-gradient-success opacity-6"></span>
      </div>
    </div>
    <div class="py-4 container-fluid">
      <div class="row">
        <div class="col-md-4">
          <div class="card">
            <div class="card-body">
              <div class="header-area">
                <p class="text-uppercase text-sm">Change Password</p>
                <div class="btn btn-primary" @click="onSaveUser">Save</div>
              </div>
              <div class="row">
                <div class="col-md-12">
                  <label class="form-control-label">New Password</label>
                  <argon-input
                    type="password"
                    name="password"
                    placeholder="New Password"
                    v-model="v$.formData.newPassword.$model"
                    :errorMsg="
                      v$.formData.newPassword.$errors.length
                        ? v$.formData.newPassword.$errors[0].$message
                        : ''
                    "
                  />
                </div>
                <div class="col-md-12">
                  <label class="form-control-label">Confirm Password</label>
                  <argon-input
                    type="password"
                    name="confirmPassword"
                    placeholder="Confirm Password"
                    v-model="v$.formData.confirmPassword.$model"
                    :errorMsg="
                      v$.formData.confirmPassword.$errors.length
                        ? v$.formData.confirmPassword.$errors[0].$message
                        : ''
                    "
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>
  
  <script>
import { mapState } from "vuex";
import setNavPills from "@/assets/js/nav-pills.js";
import setTooltip from "@/assets/js/tooltip.js";
import ArgonInput from "@/components/ArgonInput.vue";
import useVuelidate from "@vuelidate/core";
import { required, sameAs } from "@vuelidate/validators";
import { changeUserPassword } from "../data/api";

const body = document.getElementsByTagName("body")[0];

export default {
  name: "profile",
  components: { ArgonInput },
  beforeMount() {
    this.$store.state.imageLayout = "profile-overview";
    this.$store.state.showNavbar = false;
    this.$store.state.showFooter = true;
    this.$store.state.hideConfigButton = true;
    body.classList.add("profile-overview");
  },
  beforeUnmount() {
    this.$store.state.isAbsolute = false;
    this.$store.state.imageLayout = "default";
    this.$store.state.showNavbar = true;
    this.$store.state.showFooter = true;
    this.$store.state.hideConfigButton = false;
    body.classList.remove("profile-overview");
  },
  setup() {
    return { v$: useVuelidate() };
  },
  data() {
    return {
      formData: {
        newPassword: "",
        confirmPassword: "",
      },
    };
  },
  validations() {
    return {
      formData: {
        newPassword: { required },
        confirmPassword: {
          required,
          sameAsPassword: sameAs(this.formData.newPassword),
        },
      },
    };
  },
  computed: {
    ...mapState({
      userInfo: (state) => state.user,
    }),
  },
  mounted() {
    this.$store.state.isAbsolute = true;
    setNavPills();
    setTooltip();
    this.formData = {
      id: this.userInfo.id,
    };
  },
  methods: {
    async onSaveUser() {
      this.v$.$touch();
      if (this.v$.$invalid) return;
      try {
        const newFormData = {
          id: this.formData.id,
          password: this.formData.newPassword,
        };

        await changeUserPassword(newFormData);
        this.$toast("Change password successfully!");
        this.formData = {
          newPassword: "",
          confirmPassword: "",
        };
        this.v$.$reset();
      } catch (error) {
        console.log(error);
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
  <style lang="scss" scoped>
.header-area {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
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
    