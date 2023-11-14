<template>
  <main>
    <div class="container mt-6" style="min-height: 600px">
      <div class="row">
        <div class="col-md-6">
          <div class="header-area">
            <h4>User Information</h4>
            <div v-if="!isEdit">
              <div
                style="margin-right: 10px"
                class="btn btn-info"
                @click="isEdit = true"
              >
                Edit
              </div>
              <div class="btn btn-danger" @click="goToChangePassword">
                Change Password
              </div>
            </div>
            <div v-else class="btn btn-primary" @click="onSaveUser">Save</div>
          </div>
          <div v-if="!isEdit" class="row">
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
              <span class="user-text-info">{{
                new Date(userInfo?.createdAt).toLocaleDateString()
              }}</span>
            </div>
          </div>
          <div v-else class="row">
            <div class="col-md-12 mt-4">
              <label class="form-control-label">Username:</label>
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
            <div class="col-md-12">
              <label class="form-control-label">Email address:</label>
              <input
                class="form-control"
                type="text"
                :value="userInfo?.u_email"
                disabled
              />
            </div>
            <div class="col-md-12 mt-4">
              <label class="form-control-label">Address:</label>
              <argon-input
                type="text"
                name="address"
                placeholder="Address"
                v-model="v$.formData.userAddress.$model"
              />
            </div>
            <div class="col-md-12">
              <label class="form-control-label">Phone:</label>
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
            <div class="col-md-12">
              <label class="form-control-label">Create Date:</label>
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
  </main>
</template>
  
<script>
import { mapState } from "vuex";
import useVuelidate from "@vuelidate/core";
import ArgonInput from "@/components/ArgonInput.vue";
import { numeric, required } from "@vuelidate/validators";
import { updateUser } from "../data/api";
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
    goToChangePassword() {
      this.$router.push("/change-password");
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
  