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
                  <label class="col-form-label">Product Name</label>
                  <input type="text" class="form-control" v-model="item.productName" required>
                </div>
                <div class="mb-3">
                  <label class="col-form-label">Price</label>
                  <input type="text" class="form-control" v-model="item.price" required>
                </div>
                <div class="mb-3">
                  <label class="col-form-label">Quantity</label>
                  <input type="text" class="form-control" v-model="item.quantity" required>
                </div>
                <div class="mb-3">
                  <label class="col-form-label">Status</label>
                  <select class="form-select" aria-label="Default select example" v-model="item.status" required>
                    <option selected>Select status</option>
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

export default {
  name: "ProductList",
  components: {
    ProductTable,
  },
  data() {
    return {
      item:{
        productId: '',
        productName: '',
        price:'',
        quantity:'',
        status:'',
        description: ''
      },
      showModal: false
    };
  },
  methods:{
    async onSave(){
        try {
          await http.post(`${process.env.VUE_APP_API}/api/v0_01/product/add`,this.item)
          await this.$refs.productTable.getAllProducts()
          this.showModal = false;
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
        productId: '',
        productName: '',
        price:'',
        quantity:'',
        status:'',
        description: ''
      }
      this.showModal =false;
    },
    onEdit(item){
      this.item = Object.assign({},item);
      this.showModal = true;
    }
  }
};
</script>
