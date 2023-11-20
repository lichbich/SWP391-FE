<template>
  <div class="py-4 container-fluid">
    <div class="row">
      <div class="col-12">
        <div class="card">
          <div class="card-header pb-0">
            <div style="display: flex; justify-content: space-between">
              <h6>Product Best Seller</h6>
              <div class="search-area">
                <input type="text" placeholder="Enter product name..." v-model="searchText"/>
                <div class="search-btn" @click="onSearch">Search</div>
              </div>
            </div>
            <div class="row" style="display: flex">
              <div class="col" style="display: flex; justify-content: end; margin-top: 10px">
                <button
                  type="button"
                  class="btn btn-primary"
                  @click="openListProd"
                >
                  Add Product
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
                  <tr
                    v-for="product in products"
                    v-bind:key="product"
                    :id="product.id"
                  >
                    <td style="max-width: 200px" class="tooltip-custom">
                      <span
                        class="text-secondary text-xs font-weight-bold"
                        data-bs-toggle="tooltip"
                        :title="product.pName"
                        >{{ product.pName }}</span
                      >
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
                    <td style="max-width: 100px">
                      <p class="text-center text-xs font-weight-bold mb-0">
                        {{ product.isActive ? "Active" : "Sold" }}
                      </p>
                    </td>
                    <td class="tooltip-custom" style="max-width: 300px">
                      <span
                        class="text-secondary text-xs font-weight-bold"
                        data-bs-toggle="tooltip"
                        :title="product.pDescription"
                        >{{ product.pDescription }}</span
                      >
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
                        class="btn btn-danger"
                        @click="removeProductBestSeller(product.id)"
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
    <add-product-best-seller-modal
      ref="listProductModal"
      @addBestSellerItem="onAddBestSellerSuccess"
    />
    <div
            v-if="showDeleteModal"
            class="modal"
            id="staticBackdrop"
            data-bs-backdrop="static"
          >
            <div class="modal-dialog">
              <div class="modal-content" style="min-width: 500px">
                <div class="modal-header">
                  <h1 class="modal-title fs-5" id="staticBackdropLabel">
                    Delete Confirm
                  </h1>
                  <button
                    type="button"
                    class="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  ></button>
                </div>
                <div class="modal-body">
                  Do you want to delete?
                </div>
                <div class="modal-footer">
                  <button
                    type="button"
                    class="btn btn-secondary"
                    @click="onCloseDeleteModal"
                  >
                    Close
                  </button>
                  <button type="submit" class="btn btn-primary" @click="onConfirmDelete">
                    Confirm
                  </button>
                </div>
              </div>
            </div>
        </div>
  </div>
</template>
  
  <script>
import { getProdcutBestSeller, removeBestSellerTagApi } from "../data/api";
import AddProductBestSellerModal from "./AddProductBestSellerModal.vue";

export default {
  name: "ProductList",
  components: {
    AddProductBestSellerModal,
  },
  data() {
    return {
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
      pagination: {
        total: 0,
        viewby: 10,
        totalPage: 0,
        currentPage: 1,
      },
      showModal: false,
      searchText: '',
      showDeleteModal: false,
      deleteItem: {}
    };
  },
  async mounted() {
    this.getProductList();
  },
  methods: {
    async getProductList() {
      const params = {
        searchName: this.searchText,
        size: this.pagination.viewby,
        page: this.pagination.currentPage - 1,
      };
      const { data: listProd } = await getProdcutBestSeller(params);
      this.products = listProd.data;
      this.pagination.total = listProd.total;
      this.pagination.totalPage = Array.from(
        Array(Math.ceil(listProd.total / this.pagination.viewby)).keys()
      );
    },
    onSearch() {
      this.pagination.viewby = 10
      this.pagination.currentPage = 1
      this.getProductList()
    },
    async removeProductBestSeller(pid) {
      this.deleteItem = pid;
      this.showDeleteModal = true;
      
    },
     
    async onConfirmDelete() {
        try {
          await removeBestSellerTagApi(this.deleteItem);
          this.getProductList();
          this.$toast("Remove Product Successfully!");
        } catch (error) {
          this.$toast("Delete failure", false);
        } finally {
          this.showDeleteModal = false;
        }
      },
      onCloseDeleteModal() {
        this.showDeleteModal = false;
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
    openListProd() {
      this.$refs.listProductModal.open();
    },
    onAddBestSellerSuccess() {
      this.getProductList();
    },
  },
};
</script>

<style lang="scss">
.search-area {
  width: 500px;
  display: flex;
  align-items: center;
  height: fit-content;

  input {
    width: 100%;
    height: 100%;
    padding: 5px;
    border-top-left-radius: 5px;
    border-bottom-left-radius: 5px;
    border: 1px solid #ccc;
    outline: none;
  }

  .search-btn {
    height: 100%;
    padding: 3px 3px 3.5px;
    border: 1px solid #ccc;
    border-left: none;
    border-top-right-radius: 5px;
    border-bottom-right-radius: 5px;
    cursor: pointer;
  }
}
</style>
  