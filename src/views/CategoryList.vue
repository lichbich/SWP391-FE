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
              <label class="col-form-label input-require">Category Name</label>
              <input type="text" class="form-control" v-model="item.catName" maxlength="100">
<!--              <div class="error-message">{{ v.catName.$errors[0]?.$message }}</div>-->
            </div>
            <div class="mb-3">
              <label class="col-form-label">Status</label>
              <select class="form-select" aria-label="Default select example" v-model="item.isActive">
                <option :value="true">Active</option>
                <option :value="false">Inactive</option>
              </select>
            </div>
            <div class="mb-3">
              <label class="col-form-label">Description</label>
              <textarea class="form-control" v-model="item.catDescription" maxlength="1000"></textarea>
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
import {reactive} from "vue";
export default {
  name: "CategoryList",
  components: {
    CategoryTable,
    // ProjectsTable
  },
  setup(){
    const item = reactive({
      catName:'',
      catDescription: '',
      isActive: true
    });
    // const rules = computed(() => ({
    //   catName: {
    //     required$,
    //   }
    // }));

    // const v = useVuelidate(rules, item);
    return { item }
  },
  data() {
    return {
      showModal: false,
      isEdit: false
    };
  },
  methods: {
    async onSave() {
      try {
        // this.v.$touch();
        // if (this.v.$invalid) return;
        if(this.isEdit){
          await http.post(`${process.env.VUE_APP_API}/api/category/update`, this.item);
          this.isEdit = false
        }else await http.post(`${process.env.VUE_APP_API}/api/category`, this.item);
        await this.$refs.categoryTable.getAllCategory();
        this.onCloseAddNew();
        this.$toast("Create successfully", true);
      } catch (error) {
        this.$toast("Create failure", false);
      }
    },
    onOpenAddNew() {
      this.showModal = true;
    },
    onCloseAddNew() {
      this.item = {
        categoryName: '',
        description: ''
      }
      this.isEdit = false;
      this.showModal = false;
    },
    onEdit(item){
      this.item = Object.assign({}, item);
      this.isEdit = true
      this.showModal = true
    }
  }

};
</script>
