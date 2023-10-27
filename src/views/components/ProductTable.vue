<template>
  <div class="card">
    <div class="card-header pb-0">
      <h6>Product List</h6>
      <div class="row">
        <div class="col">
          <div class="btn-group">
            <div class="dropdown px-2">
              <button class="btn btn-secondary dropdown-toggle btn-sm" type="button" data-bs-toggle="dropdown"
                aria-expanded="false">
                Filter
              </button>
              <ul class="dropdown-menu">
                <li><a class="dropdown-item" href="#">Action</a></li>
                <li><a class="dropdown-item" href="#">Another action</a></li>
                <li><a class="dropdown-item" href="#">Something else here</a></li>
              </ul>
            </div>
            <div class="dropdown">
              <button class="btn btn-secondary dropdown-toggle btn-sm" type="button" data-bs-toggle="dropdown"
                aria-expanded="false">
                Filter
              </button>
              <ul class="dropdown-menu">
                <li><a class="dropdown-item" href="#">Action</a></li>
                <li><a class="dropdown-item" href="#">Another action</a></li>
                <li><a class="dropdown-item" href="#">Something else here</a></li>
              </ul>
            </div>
          </div>
        </div>
        <div class="col">

        </div>
        <div class="col">
          <!-- Button trigger modal -->
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
              <th class="text-left text-uppercase text-secondary text-xxs font-weight-bolder opacity-8">Product</th>
              <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-8 ">Product ID</th>
              <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-8 ">Price</th>
              <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-8">Quantity</th>
              <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-8">Status</th>
              <th class="text-left text-uppercase text-secondary text-xxs font-weight-bolder opacity-8">Description</th>
              <th class="text-left text-secondary opacity-7"></th>
            </tr>
          </thead>
          <tbody v-for="product in products" v-bind:key="product" :id="product.productId">
            <tr>
              <td>
                <div class="d-flex px-2 py-1">
                  <div>
                    <img src="../../assets/img/team-2.jpg" class="avatar avatar-sm me-3" alt="user1" />
                  </div>
                  <div class="d-flex flex-column justify-content-center">
                    <h6 class="mb-0 text-sm">{{ product.productName }}</h6>
                  </div>
                </div>
              </td>
              <td>
                <p class="text-center text-xs font-weight-bold mb-0">{{ product.productId }}</p>
              </td>
              <td>
                <p class="text-center text-xs font-weight-bold mb-0">{{ product.price }}</p>
              </td>
              <td>
                <p class="text-center text-xs font-weight-bold mb-0">{{ product.quantity }}</p>
              </td>
              <td class="align-middle text-center text-sm">
                <span class="badge badge-sm bg-gradient-success">Active</span>
              </td>
              <td class="align-middle text-left">
                <span class="text-secondary text-xs font-weight-bold">{{ product.description }}</span>
              </td>
              <td class="align-middle">
                <!-- <a href="" class="text-secondary font-weight-bold text-xs" data-toggle="tooltip"
                  data-original-title="Edit user">Edit</a> -->
                <button type="button" class="btn btn-primary me-2" data-bs-toggle="modal-edit"
                  data-bs-target="#staticBackdrop-edit">
                  Edit
                </button>
                <!-- <span class="m-1"></span> -->
                <button type="button" class="btn btn-danger" @click="onDelete(product)">
                  Delete
                </button>
              </td>
              <!-- <td class="align-middle"> -->
              <!-- <a href="javascript:;" class="text-secondary font-weight-bold text-xs " style="color: red !important;"
                  data-toggle="tooltip" data-original-title="Edit user"
                  @click="$event => deleteProduct(product.productId)">Delete</a> -->

              <!-- </td> -->
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
// import { context } from 'ant-design-vue/es/vc-image/src/PreviewGroup';
import axios from 'axios';
import { ref } from 'vue';
export default {
  name: "product-table",
  setup() {


    const products = ref([]);

    const getAllProducts = async () => {
      try {
        const res = await axios.get('http://localhost:8080/api/v0_01/product')
        products.value = res.data
        console.log(res.data);
      } catch (error) {
        console.log(error);
      }
    }

    getAllProducts();

    return {
      products,
      getAllProducts
      // columns
    }
  },
  methods:{
    async onDelete(item){
      await axios.delete(`http://localhost:8080/api/v0_01/product/delete/${item.productId}`)
      await this.getAllProducts();
    },
    onAdd(){
      this.$emit('on-add-new')
    }
  }
};
</script>
