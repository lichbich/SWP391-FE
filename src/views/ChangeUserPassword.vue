<template>
  <main>
    <div class="container mt-6" style="min-height: 600px">
      <div class="row">
        <div class="col-md-4">
          <div class="header-area">
            <h4>Change Password</h4>
            <div>
              <div class="btn btn-info" @click="$router.back()">Back</div>
              <div class="btn btn-primary" style="margin-left: 10px;" @click="onSaveUser">Save</div>
            </div>
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
  </main>
</template>
    
  <script>
import { mapState } from "vuex";
import useVuelidate from "@vuelidate/core";
import ArgonInput from "@/components/ArgonInput.vue";
import { required, sameAs } from "@vuelidate/validators";
import { changeUserPassword } from "../data/api";
const body = document.getElementsByTagName("body")[0];

export default {
  name: "profile",
  components: { ArgonInput },
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
.form-control-label {
  min-width: 150px;
}
.user-text-info {
  color: #000;
  font-size: 15px;
  font-weight: 600;
  margin-left: 20px;
}

.header-area {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
</style>
    