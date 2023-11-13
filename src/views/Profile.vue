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
        <div class="col-md-8">
          <div class="card">
            <div class="card-body">
              <div class="header-area">
                <p class="text-uppercase text-sm">User Information</p>
                <div v-if="!isEdit" class="btn" @click="isEdit = true">
                  Edit
                </div>
                <div v-else class="btn btn-primary" @click="onSaveUser">
                  Save
                </div>
              </div>
              <div v-if="!isEdit" class="row">
                <div class="col-md-6 mt-4">
                  <label class="form-control-label">Username:</label>
                  <span class="user-text-info">{{ userInfo?.u_name }}</span>
                </div>
                <div class="col-md-6 mt-4">
                  <label class="form-control-label">Email address:</label>
                  <span class="user-text-info">{{ userInfo?.u_email }}</span>
                </div>
                <div class="col-md-6 mt-4">
                  <label class="form-control-label">Address:</label>
                  <span class="user-text-info">{{ userInfo?.u_address }}</span>
                </div>
                <div class="col-md-6 mt-4">
                  <label class="form-control-label">Phone:</label>
                  <span class="user-text-info">{{ userInfo?.u_phone }}</span>
                </div>
                <div class="col-md-6 mt-4">
                  <label class="form-control-label">Create Date:</label>
                  <span class="user-text-info">{{
                    new Date(userInfo?.createdAt).toLocaleDateString()
                  }}</span>
                </div>
              </div>
              <div v-else class="row">
                <div class="col-md-6">
                  <label class="form-control-label">Username</label>
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
                </div>
                <div class="col-md-6">
                  <label class="form-control-label">Email address</label>
                  <input
                    class="form-control"
                    type="text"
                    :value="userInfo?.u_email"
                    disabled
                  />
                </div>
                <div class="col-md-6">
                  <label class="form-control-label">Address</label>
                  <argon-input
                    type="text"
                    name="address"
                    placeholder="Address"
                    v-model="v$.formData.userAddress.$model"
                  />
                </div>
                <div class="col-md-6">
                  <label class="form-control-label">Phone</label>
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
                </div>
                <div class="col-md-6">
                  <label class="form-control-label">Create Date</label>
                  <input
                    class="form-control"
                    type="text"
                    :value="new Date(userInfo?.createdAt).toLocaleDateString()"
                    disabled
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
import { numeric, required } from "@vuelidate/validators";
import { updateUser } from "../data/api";

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
      isEdit: false,
      formData: {
        userName: "",
        userEmail: "",
        userAddress: "",
        userCreateDate: "",
        userPhoneNumber: "",
      },
    };
  },
  validations() {
    return {
      formData: {
        userName: { required },
        userEmail: { required },
        userAddress: {},
        userPhoneNumber: { required, numeric },
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
      userName: this.userInfo.u_name,
      userEmail: this.userInfo?.u_email,
      userAddress: this.userInfo?.u_address,
      userPhoneNumber: this.userInfo?.u_phone,
    };
  },
  methods: {
    async onSaveUser() {
      this.v$.$touch();
      if (this.v$.$invalid) return;
      try {
        const newFormData = {
          id: this.formData.id,
          u_name: this.formData.userName,
          u_address: this.formData.userAddress,
          u_phone: this.formData.userPhoneNumber,
        };

        await updateUser(newFormData);
        this.$toast("Update user successfully!");
        this.$store.commit("updateUser", newFormData);
        this.isEdit = false;
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
  