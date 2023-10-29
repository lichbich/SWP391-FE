<template>
  <div class="card">
    <div class="card-header pb-0">
      <h6>Category List</h6>

      <div class="row" style="display: flex">
        <div class="col" style="display: flex; justify-content: end">
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
          <th class="text-left text-uppercase text-secondary text-xxs font-weight-bolder opacity-8" v-for="(header,index) in headers" :key="index">
            {{header}}
          </th>
          </thead>
          <tbody v-for="category in categories" v-bind:key="category" :id="category.categoryId">
            <tr>
              <td>
                <p class="text-left text-xs font-weight-bold mb-0">{{ category.categoryId }}</p>
              </td>
              <td>
                <div class="d-flex px-2 py-1">
                  <div>
                  </div>
                  <div class="d-flex flex-column justify-content-center">
                    <h6 class="mb-0 text-sm">{{ category.categoryName }}</h6>
                  </div>
                </div>
              </td>
              <td class="align-middle">
                <button type="button" class="btn btn-primary me-2" data-bs-toggle="modal-edit"
                  data-bs-target="#staticBackdrop-edit" @click="onEdit(category)">
                  Edit
                </button>
                <button type="button" class="btn btn-danger" @click="onDelete(category)">
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
  name: "category-table",
  setup() {


    const categories = ref([]);
    const headers = ref(['Category ID','Category Name', 'Action'])

    const getAllCategory = async () => {
      try {
        const res = await http.get(`${process.env.VUE_APP_API}/api/v0_01/category`)
        categories.value = res.data
      } catch (error) {
        console.log(error);
      }
    }

    getAllCategory();

    return {
      categories,
      headers,
      getAllCategory
      // columns
    }
  },
  methods: {
    async onDelete(item) {
      try {
        await http.delete(`${process.env.VUE_APP_API}/api/v0_01/category/delete/${item.categoryId}`)
        await this.getAllCategory();
        this.$toast("Delete successfully", true);
      } catch (error) {
        this.$toast("Delete failure", false);
      }

    },
    onAdd() {
      this.$emit('on-add-new');
    },
    onEdit(item) {
      this.$emit('on-edit', item);
    },
    
  }

};
</script>
