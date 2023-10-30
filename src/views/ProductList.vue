<template>
  <div class="py-4 container-fluid">
    <div class=" row">
      <div class="col-12">
        <product-table ref="productTable" @onAddNew="onOpenAddNew" @onEdit="onEdit"></product-table>
      </div>
    </div>

    <div>
      <!-- Modal -->
      <div v-if="showModal" class="modal" id="staticBackdrop" data-bs-backdrop="static">
        <div class="modal-dialog">
          <div class="modal-content" style="min-width: 500px">
            <div class="modal-header">
              <h1 class="modal-title fs-5" id="staticBackdropLabel">Add Product</h1>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
              <form>
                <div class="mb-3">
                  <label class="col-form-label input-require">Product Name</label>
                  <input type="text" class="form-control" v-model="item.productName">
                  <div class="error-message">{{ v.productName.$errors[0]?.$message }}</div>
                </div>
                <div class="mb-3">
                  <label class="col-form-label input-require">Price</label>
                  <input type="text" class="form-control" v-model="item.price">
                  <div class="error-message">{{ v.price.$errors[0]?.$message }}</div>
                </div>
                <div class="mb-3">
                  <label class="col-form-label input-require">Quantity</label>
                  <input type="text" class="form-control" v-model="item.quantity">
                  <div class="error-message">{{ v.quantity.$errors[0]?.$message }}</div>
                </div>
                <div class="mb-3">
                  <label class="col-form-label">Status</label>
                  <select class="form-select" aria-label="Default select example" v-model="item.status">
                    <option :value="true">Active</option>
                    <option :value="false">Sold</option>
                  </select>
                </div>
                <div class="mb-3">
                  <label class="col-form-label">Description</label>
                  <textarea class="form-control" v-model="item.description" ></textarea>
                </div>
              </form>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" @click="onCloseAddNew">Close</button>
              <button type="submit" class="btn btn-primary" @click="onSave">Save</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ProductTable from "./components/ProductTable.vue";
import http from "@/axios";
import {computed, reactive} from "vue";
import {required$} from "@/validator";
import {useVuelidate} from "@vuelidate/core";
import {numeric} from "@vuelidate/validators";

export default {
  name: "ProductList",
  components: {
    ProductTable,
  },
  setup(){
    const item = reactive({
      productName: '',
      price:'',
      quantity:'',
      status: true,
      description: ''
    });
    const rules = computed(() => ({
      productName: {
        required$,
      },
      price: {
        required$,
        numeric
      },
      quantity: {
        required$,
        numeric
      }
    }));

    const v = useVuelidate(rules, item);
    return { item,v }
  },
  data() {
    return {
      showModal: false
    };
  },
  methods:{
    async onSave(){
        try {
          this.v.$touch();
          if (this.v.$invalid) return;
          await http.post(`${process.env.VUE_APP_API}/api/v0_01/product/add`,this.item)
          await this.$refs.productTable.getAllProducts()
          this.onCloseAddNew();
          this.$toast("Create successfully", true);
        } catch (error) {
          this.$toast("Create failure", false);
        }
    },
    onOpenAddNew(){
      this.showModal = true;
    },
    onCloseAddNew(){
      this.item = {
        productName: '',
        price:'',
        quantity:'',
        status: true,
        description: ''
      }
      this.v.$reset();
      this.showModal =false;
    },
    onEdit(item){
      this.item = Object.assign({},item);
      this.showModal = true;
    }
  }
};
</script>
