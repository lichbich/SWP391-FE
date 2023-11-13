<template>
  <div>
    <div class="py-4 container-fluid">
      <div class="row">
        <div class="col-12">
          <div class="card">
            <div class="card-header pb-0">
              <div style="display: flex; justify-content: space-between">
                <h6>Category List</h6>
                <div class="search-area">
                  <input type="text" placeholder="Enter category name..." v-model="searchText"/>
                  <div class="search-btn" @click="onSearch">Search</div>
                </div>
              </div>
              <div class="row" style="display: flex">
                <div class="col" style="display: flex; justify-content: end; margin-top: 10px">
                  <button
                    type="button"
                    class="btn btn-primary"
                    @click="showModal = true"
                  >
                    Add Category
                  </button>
                </div>
              </div>
            </div>
            <div class="card-body px-0 pt-0 pb-2">
              <div class="table-responsive p-0">
                <table class="table align-items-center mb-0">
                  <thead style="text-align: center">
                    <th
                      class="text-left text-uppercase text-secondary text-xxs font-weight-bolder opacity-8"
                      v-for="(header, index) in headers"
                      :key="index"
                    >
                      {{ header }}
                    </th>
                  </thead>
                  <tbody>
                    <tr v-for="category in categories"
                        v-bind:key="category"
                        :id="category.id">
                      <td class="tooltip-custom" style="max-width: 100px">
                          <span class="text-secondary text-xs font-weight-bold" data-bs-toggle="tooltip" :title="category.catName">{{
                              category.catName
                            }}</span>
                      </td>
                      <td class="tooltip-custom" style="max-width: 300px">
                          <span class="text-secondary text-xs font-weight-bold" data-bs-toggle="tooltip" :title="category.catDescription">{{
                              category.catDescription
                            }}</span>
                      </td>
                      <td class="align-middle text-center" style="max-width: 100px">
                          <span class="text-secondary text-xs font-weight-bold">{{
                              category.isActive ? 'Active' : 'Inactive'
                            }}</span>
                      </td>
                      <td class="align-middle text-center" style="max-width: 100px">
                        <button
                          type="button"
                          class="btn btn-primary me-2"
                          style="margin: 0"
                          data-bs-toggle="modal-edit"
                          data-bs-target="#staticBackdrop-edit"
                          @click="onEdit(category)"
                        >
                          Edit
                        </button>
                        <button
                          type="button"
                          class="btn btn-danger"
                          style="margin: 0"
                          @click="onDelete(category.id)"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  </tbody>
                </table>
                <p></p>
                <nav
                  aria-label="Page navigation example"
                  class="d-flex px-6 justify-content-end"
                >
                  <ul class="pagination">
                    <li class="page-item" @click="onChangePage('previous')">
                      <div class="page-link">
                        <span aria-hidden="true">&laquo;</span>
                      </div>
                    </li>
                    <li
                      class="page-item"
                      v-for="page in pagination.totalPage"
                      :key="page"
                      :class="{ active: page == pagination.currentPage - 1 }"
                      @click="onChangePage(page)"
                    >
                      <div class="page-link">{{ page + 1 }}</div>
                    </li>
                    <li class="page-item" @click="onChangePage('next')">
                      <div class="page-link">
                        <span aria-hidden="true">&raquo;</span>
                      </div>
                    </li>
                  </ul>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal -->
    <div
      v-if="showModal"
      class="modal"
      id="staticBackdrop1"
      data-bs-backdrop="static"
    >
      <div class="modal-dialog">
        <div class="modal-content" style="min-width: 500px">
          <div class="modal-header">
            <h1 class="modal-title fs-5" id="staticBackdropLabel">
              {{ isEdit ? "Edit Product" : "Add Product" }}
            </h1>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">
            <form class="needs-validation" ref="formCategory">
              <div class="mb-3 form-group">
                <label class="col-form-label input-require">
                  Category Name
                </label>
                <input
                  type="text"
                  class="form-control"
                  v-model="v$.formData.catName.$model"
                  maxlength="100"
                />
                <div class="error-message">
                  {{
                    v$.formData.catName.$errors.length
                      ? v$.formData.catName.$errors[0].$message
                      : ""
                  }}
                </div>
              </div>
              <div class="mb-3">
                <label class="col-form-label">Status</label>
                <select
                  class="form-select"
                  aria-label="Default select example"
                  v-model="v$.formData.isActive.$model"
                >
                  <option :value="true">Active</option>
                  <option :value="false">Inactive</option>
                </select>
              </div>
              <div class="mb-3">
                <label class="col-form-label">Description</label>
                <textarea
                  class="form-control"
                  v-model="v$.formData.catDescription.$model"
                  maxlength="1000"
                ></textarea>
              </div>
            </form>
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary"
              @click="resetFormData"
            >
              Close
            </button>
            <button type="button" class="btn btn-primary" @click="onSave">
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import useVuelidate from "@vuelidate/core";
import { required } from "@vuelidate/validators";
import {
  createCategory,
  deleteCategory,
  getCategoryList,
  updateCategory,
} from "../data/api";

export default {
  name: "CategoryList",
  setup() {
    return { v$: useVuelidate() };
  },
  data() {
    return {
      isEdit: false,
      showModal: false,
      formData: {
        id: "",
        catName: "",
        catDescription: "",
        isActive: true,
      },
      pagination: {
        total: 0,
        viewby: 10,
        totalPage: 0,
        currentPage: 1,
      },
      categories: [],
      headers: ["Category Name", "Description", "Status", "Action"],
      searchText: ''
    };
  },
  validations() {
    return {
      formData: {
        catName: { required },
        catDescription: {},
        isActive: {},
      },
    };
  },
  mounted() {
    this.getAllCategory();
  },
  methods: {
    async getAllCategory() {
      const params = {
        searchName: this.searchText,
        size: this.pagination.viewby,
        page: this.pagination.currentPage - 1,
      };
      const { data: listProd } = await getCategoryList(params);
      this.categories = listProd.data;
      this.pagination.total = listProd.total;
      this.pagination.totalPage = Array.from(
        Array(Math.ceil(listProd.total / this.pagination.viewby)).keys()
      );
    },
    onSearch() {
      this.pagination.viewby = 10
      this.pagination.currentPage = 1
      this.getAllCategory()
    },
    async onSave() {
      try {
        this.v$.$touch();
        if (this.v$.$invalid) return;
        if (this.isEdit) await updateCategory(this.formData);
        else await createCategory(this.formData);

        this.getAllCategory();
        this.resetFormData();

        this.$toast("Create successfully", true);
      } catch (error) {
        this.$toast("Create failure", false);
      }
    },
    async onDelete(id) {
      await deleteCategory(id);
      await this.getAllCategory();
      this.$toast("Delete successfully", true);
    },
    onEdit(item) {
      this.formData = Object.assign({}, item);
      this.isEdit = true;
      this.showModal = true;
    },
    resetFormData() {
      this.formData = {
        id: "",
        catName: "",
        catDescription: "",
        isActive: true,
      };
      this.v$.$reset();
      this.isEdit = false;
      this.showModal = false;
      this.$refs.formCategory.reset();
    },
    onChangePage(direction) {
      let { currentPage, totalPage } = this.pagination;
      if (direction === "next") {
        if (currentPage < totalPage.length)
          this.pagination.currentPage = this.pagination.currentPage + 1;
      } else if (direction === "previous") {
        if (currentPage - 1 > 0) this.pagination.currentPage = currentPage - 1;
      } else {
        this.pagination.currentPage = direction + 1;
      }
      this.getAllCategory();
    },
  },
};
</script>
