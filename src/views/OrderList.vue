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
                    class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-8 text-center"
                    v-for="(header, index) in headers"
                    :key="index"
                  >
                    {{ header }}
                  </th>
                </thead>
                <tbody>
                  <tr
                    v-for="order in orderList"
                    v-bind:key="order"
                    :id="order.id"
                  >
                  <td style="max-width: 200px" class="tooltip-custom">
                    <span class="text-secondary text-xs font-weight-bold" data-bs-toggle="tooltip" :title="getProductName(order)">{{
                      getProductName(order)
                    }}</span>    
                  </td>  
                  <td style="width: 200px">
                      <p class="text-left text-xs font-weight-bold mb-0">
                        {{ order.user.u_name }}
                      </p>
                    </td>
                    <td style="max-width: 200px" class="tooltip-custom">
                      <span class="text-secondary text-xs font-weight-bold" data-bs-toggle="tooltip" :title="order.o_address">{{
                        order.o_address
                      }}</span>
                    </td>
                    <td style="width: 150px" class="text-center">
                      <p class="text-left text-xs font-weight-bold mb-0">
                        {{ order.o_phone }}
                      </p>
                    </td>
                    <td style="width: 200px">
                      <p class="text-center text-xs font-weight-bold mb-0">
                        {{ new Date(order.createdAt).toLocaleDateString() }}
                      </p>
                    </td>
                    <td style="width: 200px">
                      <p class="text-center text-xs font-weight-bold mb-0">
                        {{ $filters.toDollarFormat(getTotalOrderPrice(order)) }}
                      </p>
                    </td>
                    <td style="width: 100px">
                      <p class="text-center text-xs font-weight-bold mb-0">
                        {{ getStatus(order.o_status) }}
                      </p>
                    </td>
                    <td style="width: 100px; text-align: center">
                      <div
                        v-if="order.o_status === 0"
                        class="btn btn-secondary"
                        style="margin: 0; margin-right: 10px"
                        @click="handleCancel(order.id)"
                      >
                        Cancel
                      </div>
                      <div
                        v-if="order.o_status === 0"
                        class="btn btn-primary"
                        style="margin: 0"
                        @click="handleApprove(order.id)"
                      >
                        Approve
                      </div>
                      <div
                        v-if="order.o_status === 4"
                        class="btn btn-primary"
                        style="margin: 0"
                        @click="handleShipping(order.id)"
                      >
                        Shipping
                      </div>
                      <div
                        v-if="order.o_status === 1"
                        class="btn btn-primary"
                        style="margin: 0"
                        @click="handleComplete(order.id)"
                      >
                        Complete
                      </div>
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
                    :class="{ active: page === pagination.currentPage - 1 }"
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
import { getOrderList } from "@/data/api";
import {
  approveOrder,
  cancelOrder,
  completeOrder,
  shippingOrder,
} from "../data/api";

export default {
  name: "OrderList",
  setup() {
    return { v$: useVuelidate() };
  },
  data() {
    return {
      headers: [
        "Product",
        "Receiver",
        "Address",
        "Phone",
        "Create At",
        "Total",
        "Status",
        "Action",
      ],
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
    async handleApprove(orderId) {
      await approveOrder(orderId);
      this.getProductList();
    },
    async handleCancel(orderId) {
      await cancelOrder(orderId);
      this.getProductList();
    },
    async handleShipping(orderId) {
      await shippingOrder(orderId);
      this.getProductList();
    },
    async handleComplete(orderId) {
      await completeOrder(orderId);
      this.getProductList();
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
    getStatus(status) {
      let text = "";
      switch (status) {
        case 0:
          text = "PENDING";
          break;
        case 1:
          text = "SHIPPING";
          break;
        case 2:
          text = "COMPLETE";
          break;
        case 3:
          text = "CANCEL";
          break;
        case 4:
          text = "APPROVE";
          break;
      }
      return text;
    },
    getTotalOrderPrice(order) {
      return order.product_orders.reduce((total, nextProduct) => {
        return total + nextProduct.price;
      }, 0);
    },
    getProductName(data){
      console.log(data)
      return data.product_orders.map(item => item.product?.pName).join(',').toString();
    }
  },
};
</script>
