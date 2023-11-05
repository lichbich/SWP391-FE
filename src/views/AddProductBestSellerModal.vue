<template>
  <!-- Modal -->
  <div
    v-if="showModal"
    class="modal"
    id="staticBackdrop"
    data-bs-backdrop="static"
  >
    <div class="modal-dialog">
      <div class="modal-content" style="min-width: 1000px">
        <div class="modal-body">
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
                      class="btn btn-primary me-2"
                      data-bs-toggle="modal-edit"
                      data-bs-target="#staticBackdrop-edit"
                      @click="addBestSellerTag(product.id)"
                    >
                      Add
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
        <div class="modal-footer">
          <button
            type="button"
            class="btn btn-secondary"
            @click="showModal = false"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
    
  <script>
import { addBestSellerTagApi, getProdcutNoneBestSeller } from "../data/api";

export default {
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
    };
  },
  mounted() {
    this.getProductList();
  },
  methods: {
    async getProductList() {
      const params = {
        size: this.pagination.viewby,
        page: this.pagination.currentPage - 1,
      };
      const { data: listProd } = await getProdcutNoneBestSeller(params);
      this.products = listProd.data;
      this.pagination.total = listProd.total;
      this.pagination.totalPage = Array.from(
        Array(Math.ceil(listProd.total / this.pagination.viewby)).keys()
      );
    },
    async addBestSellerTag(pid) {
      await addBestSellerTagApi(pid);
      this.$toast("Add Product Successfully!");
      await this.getProductList();
      this.$emit("add-best-seller-item");
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
    open() {
      this.showModal = true;
    },
    onSave() {},
  },
};
</script>
    
<style lang="scss" scoped>
.modal-dialog {
  max-width: unset;
}
</style>
    