<template>
  <div
    v-if="showModal"
    class="modal"
    id="staticBackdrop"
    data-bs-backdrop="static"
  >
    <div class="modal-dialog">
      <div class="modal-content" style="min-width: 500px">
        <template v-if="!isClientAuth">
          <div class="modal-header">
            <h1 class="modal-title fs-5" id="staticBackdropLabel">
              Login Require
            </h1>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">
            <p>You Must Login To Place Order!</p>
          </div>
          <div class="modal-footer">
            <button type="submit" class="btn btn-primary" @click="goToLogIn">
              Login Now
            </button>
          </div>
        </template>
        <template v-else>
          <div class="modal-header">
            <h1 class="modal-title fs-5" id="staticBackdropLabel">
              Billing Address
            </h1>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">
            <form>
              <div class="mb-3">
                <label class="col-form-label input-require">Phone Number</label>
                <input
                  type="text"
                  class="form-control"
                  v-model="formData.phoneNumber"
                  required
                  maxlength="11"
                />
                <div class="error-message">
                  {{
                    v$.formData.phoneNumber.$errors.length
                        ? v$.formData.phoneNumber.$errors[0].$message
                        : ""
                  }}
                </div>
              </div>
              <div class="mb-3">
                <label class="col-form-label input-require">Address</label>
                <input
                  type="text"
                  class="form-control"
                  v-model="formData.address"
                  required
                  maxlength="100"
                />
                <div class="error-message">
                  {{
                    v$.formData.address.$errors.length
                        ? v$.formData.address.$errors[0].$message
                        : ""
                  }}
                </div>
              </div>
            </form>
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary"
              @click="showModal = false"
            >
              Cancel
            </button>
            <button type="submit" class="btn btn-primary" @click="onSave">
              Order
            </button>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>
  
<script>
import { mapState } from "vuex";
import useVuelidate from "@vuelidate/core";
import {numeric, required} from "@vuelidate/validators";

export default {
  components: {},
  setup() {
    return { v$: useVuelidate() };
  },
  data() {
    return {
      showModal: false,
      formData: {
        address: "",
        phoneNumber: "",
      },
    };
  },
  validations() {
    return {
      formData: {
        address: { required },
        phoneNumber: { required, numeric },
      },
    };
  },
  computed: {
    ...mapState({
      userInfo: (state) => state.user,
      isClientAuth: (state) => state.isClientAuth,
    }),
  },
  methods: {
    onSave() {
      this.v$.$touch();
      if (this.v$.$invalid) return;
      this.showModal = false;
      this.$emit("order", this.formData);
      this.v$.$reset();
    },
    show() {
      this.formData.address = '';
      this.formData.phoneNumber = this.userInfo?.u_phone;
      this.showModal = true;
    },
    goToLogIn() {
      this.$router.push("/sign-in");
    },
  },
};
</script>
  
<style lang="scss" scoped></style>
  