<template>
  <div class="py-4 container-fluid">
    <div class=" row">
      <div class="col-12">
        <div class="card">
          <div class="card-header pb-0">
            <h6>Order List</h6>


          </div>
          <div class="card-body px-0 pt-0 pb-2">
            <div class="table-responsive p-0">
              <table class="table align-items-center mb-0">
                <thead>
                <th class="text-left text-uppercase text-secondary text-xxs font-weight-bolder opacity-8" v-for="(header,index) in headers" :key="index">
                  {{header}}
                </th>
                </thead>
                <tbody v-for="order in orders" v-bind:key="order" :id="order.orderId">
                <tr>
                  <td>
                    <p class="text-left text-xs font-weight-bold mb-0">{{ category.orderId }}</p>
                  </td>
                  <td>
                    <div class="d-flex px-2 py-1">
                      <div>
                      </div>
                      <div class="d-flex flex-column justify-content-center">
                        <h6 class="mb-0 text-sm">{{ category.orderId }}</h6>
                      </div>
                    </div>
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
  </div>
</template>

<script>

import {ref} from "vue";
import http from "@/axios";

export default {
  name: "OrderList",
  setup() {
    const orders = ref([]);
    const headers = ref(['Order ID','Receiver','Address','Phone','Create At','Status']);

    const getOrders = async () => {
      try {
        const res = await http.get(`${process.env.VUE_APP_API}/api/v0_01/orders`)
        console.log(res.data)
        orders.value = res.data
      } catch (error) {
        console.log(error);
      }
    }

    getOrders();

    return {
      orders,
      headers,
      getOrders
    }
  },
  data() {
    return {
    };
  },
};
</script>
