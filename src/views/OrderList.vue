<template>
  <div class="py-4 container-fluid">
    <div class="row">
      <div class="col-12">
        <div class="card">
          <div class="card-header pb-0">
            <h6>Order List</h6>
          </div>
          <div class="card-body px-0 pt-0 pb-2">
            <div class="table-responsive p-0">
              <table class="table align-items-center mb-0">
                <thead>
                  <th
                    class="text-left text-uppercase text-secondary text-xxs font-weight-bolder opacity-8"
                    v-for="(header, index) in headers"
                    :key="index"
                  >
                    {{ header }}
                  </th>
                </thead>
                <tbody
                  v-for="order in orderList"
                  v-bind:key="order"
                  :id="order.orderId"
                >
                  <tr>
                    <td>
                      <p class="text-left text-xs font-weight-bold mb-0">
                        {{ order.user.u_name }}
                      </p>
                    </td>
                    <td>
                      <p class="text-left text-xs font-weight-bold mb-0">
                        {{ order.o_address }}
                      </p>
                    </td>
                    <td>
                      <p class="text-left text-xs font-weight-bold mb-0">
                        {{ order.o_phone }}
                      </p>
                    </td>
                    <td>
                      <p class="text-left text-xs font-weight-bold mb-0">
                        {{ order.createdAt }}
                      </p>
                    </td>
                    <td>
                      <p class="text-left text-xs font-weight-bold mb-0">
                        {{ order.o_status }}
                      </p>
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
</template>

<script>
import useVuelidate from "@vuelidate/core";
import { getOrderList } from "../data/api";

export default {
  name: "OrderList",
  setup() {
    return { v$: useVuelidate() };
  },
  data() {
    return {
      headers: ["Receiver", "Address", "Phone", "Create At", "Status"],
      pagination: {
        total: 0,
        viewby: 10,
        totalPage: 0,
        currentPage: 1,
      },
      orderList: [],
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
      const { data: listProd } = await getOrderList(params);
      this.orderList = listProd.data;
      this.pagination.total = listProd.total;
      this.pagination.totalPage = Array.from(
        Array(Math.ceil(listProd.total / this.pagination.viewby)).keys()
      );
    },
    onChangePage(direction) {
      let { currentPage, totalPage } = this.pagination;
      console.log(currentPage, totalPage.length);
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
  },
};
</script>
