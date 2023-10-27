<template>
  <div class="card">
    <div class="card-header pb-0">
      <h6>Category List</h6>
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
            Add Category
          </button>
          

        </div>
      </div>


    </div>
    <div class="card-body px-0 pt-0 pb-2">
      <div class="table-responsive p-0">
        <table class="table align-items-center mb-0">
          <thead>
            <tr>
              <th class="text-left text-uppercase text-secondary text-xxs font-weight-bolder opacity-8">Category</th>
              <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-8 ">Category ID
              </th>
              <th class="text-left text-secondary opacity-7"></th>
            </tr>
          </thead>
          <tbody v-for="category in categories" v-bind:key="category" :id="category.categoryId">
            <tr>
              <td>
                <div class="d-flex px-2 py-1">
                  <div>
                    <img src="../../assets/img/icons/category-svgrepo-com.svg" class="avatar avatar-sm me-3"
                      alt="user1" />
                  </div>
                  <div class="d-flex flex-column justify-content-center">
                    <h6 class="mb-0 text-sm">{{ category.categoryName }}</h6>
                  </div>
                </div>
              </td>
              <td>
                <p class="text-center text-xs font-weight-bold mb-0">{{ category.categoryId }}</p>
              </td>
              <td class="align-middle">
                <!-- <a href="" class="text-secondary font-weight-bold text-xs" data-toggle="tooltip"
                  data-original-title="Edit user">Edit</a> -->
                <button type="button" class="btn btn-primary me-2" data-bs-toggle="modal-edit"
                  data-bs-target="#staticBackdrop-edit">
                  Edit
                </button>
                <!-- <span class="m-1"></span> -->
                <button type="button" class="btn btn-danger" @click="onDelete(category)">
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
// import ModalAddCategory from './Modal/Modal-AddCategory.vue';
import axios from 'axios';
import { ref } from 'vue';
export default {
  // components: { ModalAddCategory },
  name: "category-table",
  setup() {


    const categories = ref([]);

    const getAllCategory = async () => {
      try {
        const res = await axios.get('http://localhost:8080/api/v0_01/category')
        categories.value = res.data
        console.log(res.data);
      } catch (error) {
        console.log(error);
      }
    }

    getAllCategory();

    return {
      categories,
      getAllCategory
      // columns
    }
  },
  methods: {
    async onDelete(item) {
      await axios.delete(`http://localhost:8080/api/v0_01/category/delete/${item.categoryId}`)
      await this.getAllCategory();
    },
    onAdd() {
      this.$emit('on-add-new')
    },

    
  }

};
</script>
