<template>
  <div class="py-4 container-fluid">
    <div class=" row">
      <div class="col-12">
        <category-table></category-table>
      </div>
    </div>
    <!-- <div class="mt-4 row">
      <div class="col-12">
        <projects-table />
      </div>
    </div> -->
  </div>

  <!-- Modal -->
  <div v-if="showModal" class="modal fade mt-3 pt-2" id="staticBackdrop1" data-bs-backdrop="static"
    style="display: block; opacity: unset">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5" id="staticBackdropLabel">Add Product</h1>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <form>
            <div class="mb-3">
              <label class="col-form-label">Product ID</label>
              <input type="text" class="form-control" v-model="item.categoryName">
            </div>
            <div class="mb-3">
              <label class="col-form-label">Product Name</label>
              <input type="text" class="form-control" v-model="item.categoryID">
            </div>
            
          </form>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" @click="onCloseAddNew">Close</button>
          <button type="button" class="btn btn-primary" @click="onSave">Save</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CategoryTable from "./components/CategoryTable.vue";
// import ProjectsTable from "./components/ProjectsTable.vue";
import axios from "axios";
export default {
  name: "CategoryList",
  components: {
    CategoryTable,
    // ProjectsTable
  },
  data() {
    return {
      item:{
        categoryName: '',
        categoryID: ''
      },
      showModal: false
    };
  },
  methods: {
    async onSave() {
      try {
        const res = await axios.post('http://localhost:8080/api/v0_01/category/add', this.item)
        await this.$refs.categoryTable.getAllCategory()
        this.showModal = false;
        console.log(res);
      } catch (error) {
        console.log(error);
      }
    },
    onOpenAddNew() {
      this.showModal = true
    },
    onCloseAddNew() {
      this.showModal = false;
    },
  }

};
</script>
