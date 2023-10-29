<template>
  <div class="py-4 container-fluid">
    <div class=" row">
      <div class="col-12">
        <category-table ref="categoryTable" @onAddNew="onOpenAddNew" @onEdit="onEdit"></category-table>
      </div>
    </div>
  </div>

  <!-- Modal -->
  <div v-if="showModal" class="modal" id="staticBackdrop1" data-bs-backdrop="static">
    <div class="modal-dialog">
      <div class="modal-content" style="min-width: 500px">
        <div class="modal-header">
          <h1 class="modal-title fs-5" id="staticBackdropLabel">Add Product</h1>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <form class="needs-validation">
            <div class="mb-3 form-group">
              <label class="col-form-label">Category Name</label>
              <input type="text" class="form-control" v-model="item.categoryName">
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
import http from "@/axios";
export default {
  name: "CategoryList",
  components: {
    CategoryTable,
    // ProjectsTable
  },
  data() {
    return {
      item:{
        categoryName: ''
      },
      showModal: false
    };
  },
  methods: {
    async onSave() {
      try {
        await http.post(`${process.env.VUE_APP_API}/api/v0_01/category/add`, this.item);
        await this.$refs.categoryTable.getAllCategory();
        this.showModal = false;
        this.$toast("Create successfully", true);
      } catch (error) {
        this.$toast("Create failure", false);
      }
    },
    onOpenAddNew() {
      this.showModal = true
    },
    onCloseAddNew() {
      this.item = {
        categoryName: ''
      }
      this.showModal = false;
    },
    onEdit(item){
      this.item = Object.assign({}, item);
      this.showModal = true
    }
  }

};
</script>
