<template>
  <div class="card">
    <div class="card-header pb-0">
      <h6>Product List</h6>
      <div class="row" style="display: flex">
        <div class="col" style="display: flex; justify-content: end">
          <button type="button" class="btn btn-primary" @click="onAdd">
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
                    <h6 class="mb-0 text-sm">{{ product.p_name }}</h6>
                  </div>
                </div>
              </td>
              <td>
                <p class="text-center text-xs font-weight-bold mb-0">{{ product.p_price }}</p>
              </td>
              <td>
                <p class="text-center text-xs font-weight-bold mb-0">{{ product.quantity }}</p>
              </td>
              <td class="align-middle text-center text-sm">
                <span class="badge badge-sm bg-gradient-success">Active</span>
              </td>
              <td class="align-middle text-left">
                <span class="text-secondary text-xs font-weight-bold">{{ product.p_description }}</span>
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
</template>

<script>
import http from "@/axios";
import { ref } from 'vue';
export default {
  name: "product-table",
  setup() {
    const products = ref([]);
    const headers = ref(['Product', 'Price', 'Quantity', 'Status', 'Description', 'Image', 'Action']);

    const getAllProducts = async () => {
      try {
        const res = await http.get(`${process.env.VUE_APP_API}/api/product`, { params: { page: 0, size: 10 } })
        console.log(res.data)
        products.value = res.data.data.map(item => ({ ...item, imgLink: `${process.env.VUE_APP_API}/${item.p_img_link}` }))
      } catch (error) {
        console.log(error);
      }
    }

    getAllProducts();

    return {
      products,
      headers,
      getAllProducts
      // columns
    }
  },
  methods: {
    async onDelete(item) {
      try {
        await http.delete(`${process.env.VUE_APP_API}/api/v0_01/product/delete/${item.productId}`)
        await this.getAllProducts();
        this.$toast("Delete successfully", true);
      } catch (error) {
        this.$toast("Delete failure", false);
      }
    },
    onAdd() {
      this.$emit('on-add-new')
    },
    onEdit(item) {
      console.log('aaaaa', item)
      this.$emit('on-edit', item)
    }
  }
};
</script>
