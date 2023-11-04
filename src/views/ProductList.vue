<template>
  <div class="py-4 container-fluid">
    <div class=" row">
      <div class="col-12">
        <div class="card">
          <div class="card-header pb-0">
            <h6>Product List</h6>
            <div class="row" style="display: flex">
              <div class="col" style="display: flex; justify-content: end">
                <button type="button" class="btn btn-primary" @click="showModal = true">
                  Add Product
                </button>
              </div>
            </div>

          </div>
          <div class="card-body px-0 pt-0 pb-2">
            <div class="table-responsive p-0">
              <table class="table align-items-center mb-0">
                <thead>
                  <tr>
                    <th class="text-left text-uppercase text-secondary text-xxs font-weight-bolder opacity-8"
                      v-for="(header, index) in headers" :key="index">
                      {{ header }}
                    </th>
                  </tr>
                </thead>
                <tbody v-for="product in products" v-bind:key="product" :id="product.id">
                  <tr>
                    <td>
                      <div class="d-flex px-2 py-1">
                        <div class="d-flex flex-column justify-content-center">
                          <h6 class="mb-0 text-sm">{{ product.pName }}</h6>
                        </div>
                      </div>
                    </td>
                    <td>
                      <p class="text-center text-xs font-weight-bold mb-0">{{ product.pPrice }}</p>
                    </td>
                    <td>
                      <p class="text-center text-xs font-weight-bold mb-0">{{ product.pQuantity }}</p>
                    </td>
                    <td class="align-middle text-center text-sm">
                      <span class="badge badge-sm bg-gradient-success">Active</span>
                    </td>
                    <td class="align-middle text-left">
                      <span class="text-secondary text-xs font-weight-bold">{{ product.pDescription }}</span>
                    </td>
                    <td class="align-middle text-left">
                      <img :src="product.imgLink" style="width: 40px; height: 40px" />
                    </td>
                    <td class="align-middle">
                      <button type="button" class="btn btn-primary me-2" data-bs-toggle="modal-edit"
                        data-bs-target="#staticBackdrop-edit" @click="onEdit(product)">
                        Edit
                      </button>
                      <button type="button" class="btn btn-danger" @click="onDelete(product)">
                        Delete
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
              <p></p>
              <nav aria-label="Page navigation example" class="d-flex px-6 justify-content-end">
                <ul class="pagination">
                  <li class="page-item">
                    <a class="page-link" href="#" aria-label="Previous">
                      <span aria-hidden="true">&laquo;</span>
                    </a>
                  </li>
                  <li class="page-item"><a class="page-link" href="#">1</a></li>
                  <li class="page-item"><a class="page-link" href="#">2</a></li>
                  <li class="page-item"><a class="page-link" href="#">3</a></li>
                  <li class="page-item">
                    <a class="page-link" href="#" aria-label="Next">
                      <span aria-hidden="true">&raquo;</span>
                    </a>
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
      <div v-if="showModal" class="modal" id="staticBackdrop" data-bs-backdrop="static">
        <div class="modal-dialog">
          <div class="modal-content" style="min-width: 500px">
            <div class="modal-header">
              <h1 class="modal-title fs-5" id="staticBackdropLabel">Add Product</h1>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
              <form ref="productForm">
                <div class="mb-3">
                  <label class="col-form-label input-require">Product Name</label>
                  <input class="form-control" name="pName" v-model="v$.formData.productName.$model">
                  <div class="error-message">{{
                    v$.formData.productName.$errors.length
                    ? v$.formData.productName.$errors[0].$message : ''
                  }}</div>
                </div>
                <div class="mb-3">
                  <label class="col-form-label">Category</label>
                  <select class="form-select" name="categoryId" v-model="formData.categoryId">
                    <option v-for="item in categories" :key="item.id" :value="item.id">
                      {{ item.catName }}</option>
                  </select>
                  <div class="error-message">{{
                    v$.formData.categoryId.$errors.length
                    ? v$.formData.categoryId.$errors[0].$message : ''
                  }}</div>
                </div>
                <div class="mb-3">
                  <label class="col-form-label input-require">Price</label>
                  <input type="text" class="form-control" name="pPrice" v-model="v$.formData.price.$model">
                  <div class="error-message">{{
                    v$.formData.price.$errors.length
                    ? v$.formData.price.$errors[0].$message : ''
                  }}</div>
                </div>
                <div class="mb-3">
                  <label class="col-form-label input-require">Quantity</label>
                  <input type="text" class="form-control" name="pQuantity" v-model="v$.formData.quantity.$model">
                  <div class="error-message">{{
                    v$.formData.quantity.$errors.length
                    ? v$.formData.quantity.$errors[0].$message : ''
                  }}</div>
                </div>
                <div class="mb-3">
                  <label class="col-form-label">Status</label>
                  <select class="form-select" name="isActive" v-model="formData.status">
                    <option :value="true">Active</option>
                    <option :value="false">Sold</option>
                  </select>
                </div>
                <div class="mb-3">
                  <label class="col-form-label">Description</label>
                  <textarea class="form-control" name="pDescription" v-model="formData.description"></textarea>
                </div>
              </form>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" @click="showModal = false">Close</button>
              <button type="submit" class="btn btn-primary" @click="onSave">Save</button>
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
import { createProduct, getCategory, getProdcutList, updateProduct } from "../data/api";

export default {
  name: "ProductList",
  setup() {
    return { v$: useVuelidate() }
  },
  data() {
    return {
      headers: ['Product', 'Price', 'Quantity', 'Status', 'Description', 'Image', 'Action'],
      products: [],
      categories: [],
      formData: {
        id: '',
        productName: '',
        price: '',
        quantity: '',
        status: true,
        description: '',
        categoryId: ''
      },
      showModal: false
    };
  },
  validations() {
    return {
      formData: {
        categoryId: { required },
        productName: { required },
        price: { required, numeric },
        quantity: { required, numeric },
      }
    }
  },
  async mounted() {
    const { data: listCat } = await getCategory();
    this.categories = listCat.data;
    const { data: listProd } = await getProdcutList();
    this.products = listProd.data;
  },
  methods: {
    async onSave() {
      try {
        this.v$.$touch();
        if (this.v$.$invalid) return;
        const formData = new FormData(this.$refs.productForm);
        if (this.mode === 'edit')
          await updateProduct(this.makeFormData(this.formData));
        else
          await createProduct(formData);

        const { data: listProd } = await getProdcutList();
        this.products = listProd.data;
        
        this.$refs.productForm.reset();
        this.formData = {
          productName: '',
          price: '',
          quantity: '',
          status: true,
          description: '',
          categoryId: ''
        };
        this.v$.$reset();
        this.mode = '';
        this.showModal = false;
        this.$toast("Create successfully", true);
      } catch (error) {
        this.$toast("Create failure", false);
      }
    },
    onEdit(product) {
      this.mode = 'edit';
      this.showModal = true;
      this.formData = {
        id: product.id,
        productName: product.pName,
        price: product.pPrice,
        quantity: product.pQuantity,
        status: product.isActive,
        description: product.pDescription,
        categoryId: product.category.id
      }
    },
    onDelete() {

    },
    makeFormData(formData) {
      return {
        id: formData.id,
        pName: formData.productName,
        pPrice: formData.price.toString(),
        isActive: formData.status,
        categoryId: formData.categoryId,
        pDescription: formData.description,
      }
    }
  }
};
</script>
