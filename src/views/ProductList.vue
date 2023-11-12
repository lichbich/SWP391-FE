<template>
  <div class="py-4 container-fluid">
    <div class="row">
      <div class="col-12">
        <div class="card">
          <div class="card-header pb-0">
            <h6>Product List</h6>
            <div class="row" style="display: flex">
              <div class="col" style="display: flex; justify-content: end">
                <button
                  type="button"
                  class="btn btn-primary"
                  @click="showModal = true"
                >
                  {{ mode !== "edit" ? "Add Product" : "Edit Product" }}
                </button>
              </div>
            </div>
          </div>
          <div class="card-body px-0 pt-0 pb-2">
            <div class="table-responsive p-0">
              <table class="table align-items-center mb-0">
                <thead>
                  <tr style="text-align: center">
                    <th
                      class="text-left text-uppercase text-secondary text-xxs font-weight-bolder opacity-8"
                      v-for="(header, index) in headers"
                      :key="index"
                    >
                      {{ header }}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="product in products"
                      v-bind:key="product"
                      :id="product.id">
                    <td style="max-width: 200px" class="tooltip-custom">
                      <span class="text-secondary text-xs font-weight-bold" data-bs-toggle="tooltip" :title="product.pName">{{
                          product.pName
                        }}</span>
                    </td>
                    <td style="max-width: 100px">
                      <p class="text-center text-xs font-weight-bold mb-0">
                        {{ product.pPrice }}
                      </p>
                    </td>
                    <td style="max-width: 100px">
                      <p class="text-center text-xs font-weight-bold mb-0">
                        {{ product.pQuantity }}
                      </p>
                    </td>
                    <td style="max-width: 100px" >
                      <p class="text-center text-xs font-weight-bold mb-0">
                        {{ product.isActive ? 'Active' : 'Sold' }}
                      </p>
                    </td>
                    <td class="tooltip-custom" style="max-width: 300px">
                      <span class="text-secondary text-xs font-weight-bold" data-bs-toggle="tooltip" :title="product.pDescription">{{
                        product.pDescription
                      }}</span>
                    </td>
                    <td class="align-middle text-center">
                      <img
                        :src="$filters.getImageLink(product.pImgLink)"
                        style="width: 40px; height: 40px"
                      />
                    </td>
                    <td class="align-middle text-center">
                      <button
                        type="button"
                        style="margin: 0"
                        class="btn btn-primary me-2"
                        data-bs-toggle="modal-edit"
                        data-bs-target="#staticBackdrop-edit"
                        @click="onEdit(product)"
                      >
                        Edit
                      </button>
                      <button
                        type="button"
                        style="margin: 0"
                        class="btn btn-danger"
                        @click="onDelete(product)"
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

    <div>
      <!-- Modal -->
      <div
        v-if="showModal"
        class="modal"
        id="staticBackdrop"
        data-bs-backdrop="static"
      >
        <div class="modal-dialog">
          <div class="modal-content" style="min-width: 500px">
            <div class="modal-header">
              <h1 class="modal-title fs-5" id="staticBackdropLabel">
                Add Product
              </h1>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body">
              <form ref="productForm">
                <div class="mb-3">
                  <label class="col-form-label input-require"
                    >Product Name</label
                  >
                  <input
                    class="form-control"
                    name="pName"
                    v-model="v$.formData.productName.$model"
                    maxlength="100"
                  />
                  <div class="error-message">
                    {{
                      v$.formData.productName.$errors.length
                        ? v$.formData.productName.$errors[0].$message
                        : ""
                    }}
                  </div>
                </div>
                <div class="mb-3">
                  <label class="col-form-label">Category</label>
                  <select
                    class="form-select"
                    name="categoryId"
                    v-model="formData.categoryId"
                  >
                    <option
                      v-for="item in categories"
                      :key="item.id"
                      :value="item.id"
                    >
                      {{ item.catName }}
                    </option>
                  </select>
                  <div class="error-message">
                    {{
                      v$.formData.categoryId.$errors.length
                        ? v$.formData.categoryId.$errors[0].$message
                        : ""
                    }}
                  </div>
                </div>
                <div class="mb-3">
                  <label class="col-form-label input-require">Price</label>
                  <input
                    type="text"
                    class="form-control"
                    name="pPrice"
                    v-model="v$.formData.price.$model"
                    maxlength="10"
                  />
                  <div class="error-message">
                    {{
                      v$.formData.price.$errors.length
                        ? v$.formData.price.$errors[0].$message
                        : ""
                    }}
                  </div>
                </div>
                <div class="mb-3">
                  <label class="col-form-label input-require">Quantity</label>
                  <input
                    type="text"
                    class="form-control"
                    name="pQuantity"
                    v-model="v$.formData.quantity.$model"
                    maxlength="10"
                  />
                  <div class="error-message">
                    {{
                      v$.formData.quantity.$errors.length
                        ? v$.formData.quantity.$errors[0].$message
                        : ""
                    }}
                  </div>
                </div>
                <div class="mb-3">
                  <label class="col-form-label">Status</label>
                  <select
                    class="form-select"
                    name="isActive"
                    v-model="formData.status"
                  >
                    <option :value="true">Active</option>
                    <option :value="false">Sold</option>
                  </select>
                </div>
                <div class="mb-3">
                  <label class="col-form-label">Description</label>
                  <textarea
                    maxlength="1000"
                    class="form-control"
                    name="pDescription"
                    v-model="formData.description"
                  ></textarea>
                </div>
                <div class="mb-3 edit-img">
                  <label class="col-form-label">Image</label>
                  <img
                    v-if="mode === 'edit' && !formData.file"
                    :src="$filters.getImageLink(formData.pImgLink)"
                  />
                  <input
                    @change="(event) => (formData.file = event.target.files[0])"
                    type="file"
                    class="form-control"
                    name="file"
                    accept="image/*"
                  />
                </div>
              </form>
            </div>
            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-secondary"
                @click="onCloseModal"
              >
                Close
              </button>
              <button type="submit" class="btn btn-primary" @click="onSave">
                Save
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import useVuelidate from "@vuelidate/core";
import { numeric, required } from "@vuelidate/validators";
import {
  createProduct,
  getCategory,
  getProdcutList,
  updateProduct,
} from "../data/api";
import http from "@/axios";

export default {
  name: "ProductList",
  setup() {
    return { v$: useVuelidate() };
  },
  data() {
    return {
      mode: "",
      headers: [
        "Product",
        "Price",
        "Quantity",
        "Status",
        "Description",
        "Image",
        "Action",
      ],
      products: [],
      categories: [],
      formData: {
        id: "",
        price: "",
        pImgLink: "",
        quantity: "",
        status: true,
        categoryId: "",
        productName: "",
        description: "",
      },
      pagination: {
        total: 0,
        viewby: 10,
        totalPage: 0,
        currentPage: 1,
      },
      showModal: false,
    };
  },
  validations() {
    return {
      formData: {
        categoryId: { required },
        productName: { required },
        price: { required, numeric },
        quantity: { required, numeric },
      },
    };
  },
  async mounted() {
    const { data: listCat } = await getCategory();
    this.categories = listCat.data;
    this.getProductList();
  },
  methods: {
    async getProductList() {
      const params = {
        size: this.pagination.viewby,
        page: this.pagination.currentPage - 1,
      };
      const { data: listProd } = await getProdcutList(params);
      this.products = listProd.data;
      this.pagination.total = listProd.total;
      this.pagination.totalPage = Array.from(
        Array(Math.ceil(listProd.total / this.pagination.viewby)).keys()
      );
    },
    async onSave() {
      try {
        this.v$.$touch();
        if (this.v$.$invalid) return;
        const formData = new FormData(this.$refs.productForm);
        if (this.mode === "edit") await updateProduct(this.makeFormData(this.formData), this.formData.id);
        else await createProduct(formData);

        this.getProductList();
        this.$refs.productForm.reset();
        this.formData = {
          productName: "",
          price: "",
          quantity: "",
          status: true,
          description: "",
          categoryId: "",
        };
        this.v$.$reset();
        this.mode = "";
        this.showModal = false;
        this.$toast("Create successfully", true);
      } catch (error) {
        this.$toast("Create failure", false);
      }
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
      this.getProductList();
    },
    onEdit(product) {
      this.mode = "edit";
      this.showModal = true;
      this.formData = {
        id: product.id,
        price: product.pPrice,
        status: product.isActive,
        productName: product.pName,
        quantity: product.pQuantity,
        categoryId: product.category.id,
        description: product.pDescription,
        pImgLink: product.file || product.pImgLink,
      };
    },
    async onDelete(item) {
      try {
        await http.delete(`${process.env.VUE_APP_API}/api/product/delete/${item.id}`)
        await this.getProductList();
        this.$toast("Delete successfully", true);
      } catch (error) {
        this.$toast("Delete failure", false);
      }
    },
    onCloseModal() {
      this.mode = "";
      this.showModal = false;
      this.formData = {
        productName: "",
        price: "",
        quantity: "",
        status: true,
        description: "",
        categoryId: "",
      };
    },
    makeFormData(formData) {
      const newFormData = new FormData();
      newFormData.append("id", formData.id);
      newFormData.append("isActive", formData.status);
      newFormData.append("pName", formData.productName);
      newFormData.append("pQuantity", formData.quantity);
      newFormData.append("categoryId", formData.categoryId);
      newFormData.append("pPrice", formData.price.toString());
      newFormData.append("pDescription", formData.description);
      newFormData.append("file", formData.file);
      return newFormData;
    },
  },
};
</script>

<style lang="scss" scoped>
.edit-img {
  display: flex;
  flex-direction: column;

  img {
    margin: 10px 0;
    width: 100px;
  }
}
</style>
