<template>
  <div class="main-container">
    <div class="container main-area">
      <div class="product-area">
        <div class="title">
          Product List
        </div>
        <div class="list-product">
          <div
              class="product-item"
              :class="{ 'sold-out': p.pQuantity <= 0 }"
              v-for="p in listProd"
              :key="p.id"
          >
            <div class="product-img">
              <img :src="$filters.getImageLink(p.img)" alt=""/>
              <div class="actions-container">
                <div class="actions-area">
                  <div class="see-detail" @click="seeDetail(p)">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        class="feather feather-eye"
                    >
                      <path
                          d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"
                      ></path>
                      <circle cx="12" cy="12" r="3"></circle>
                    </svg>
                  </div>
                  <div class="divider"></div>
                  <div class="add-to-cart" @click="addToCart(p)">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        class="feather feather-shopping-cart"
                    >
                      <circle cx="9" cy="21" r="1"></circle>
                      <circle cx="20" cy="21" r="1"></circle>
                      <path
                          d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"
                      ></path>
                    </svg>
                  </div>
                </div>
              </div>
            </div>
            <div class="product-info">
              <div class="product-name">{{ p.pName }}</div>
              <div class="product-price">
                <span class="real-price">{{
                    $filters.toDollarFormat(p.price)
                  }}</span>
                <span class="discount-price">{{
                    $filters.toDollarFormat(p.salePrice)
                  }}</span>
              </div>
            </div>
          </div>
        </div>
        <nav
            v-if="pagination.totalPage.length > 0"
            class="d-flex px-6 mt-3 justify-content-center"
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
      <div
          v-if="showProductDetail"
          class="modal prod-detail"
          id="staticBackdrop"
          data-bs-backdrop="static"
      >
        <div class="modal-dialog">
          <div class="modal-content" style="min-width: 500px">
            <div class="modal-body prod-detail-container">
              <div class="close-icon" @click="showProductDetail = false">
                <i class="fas fa-window-close"></i>
              </div>
              <div class="product-image">
                <img :src="$filters.getImageLink(productDetail.img)" alt=""/>
              </div>
              <div class="product-information">
                <div class="p-container">
                  <div class="p-title">{{ productDetail.pName }}</div>
                  <div class="p-price">{{ productDetail.price }}</div>
                  <div class="p-detail">
                    <b>Product Details :</b>
                    <p style="font-size: 14px">
                      {{ productDetail.pDescription }}
                    </p>
                  </div>
                </div>
                <div class="p-actions">
                  <div class="add-to-cart" @click="onAddToCard">
                    Add To Cart
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
const body = document.getElementsByTagName("body")[0];

import {getProdcutList} from "@/data/api";

export default {
  name: "HomeSearch",
  created() {
    this.$store.state.hideConfigButton = true;
    this.$store.state.showNavbar = false;
    this.$store.state.showSidenav = false;
    this.$store.state.showFooter = false;
    body.classList.remove("bg-gray-100");
  },
  beforeUnmount() {
    this.$store.state.hideConfigButton = false;
    this.$store.state.showNavbar = true;
    this.$store.state.showSidenav = true;
    this.$store.state.showFooter = true;
    body.classList.add("bg-gray-100");
  },
  data() {
    return {
      listProd: [],
      searchName: '',
      productDetail: {},
      showProductDetail: false,
      pagination: {
        total: 0,
        viewby: 12,
        totalPage: 0,
        currentPage: 1,
      },
    };
  },
  watch: {
    '$route.query.search': {
      handler: async function (val) {
        if (val) {
          this.pagination.currentPage = 1;
          this.searchName = this.$route.query.search;
          await this.getProductList();
        }
      },
      deep: true,
      immediate: true
    }
  },
  computed: {

  },
  async mounted() {
    this.searchName = this.$route.query.search;
  },
  methods: {
    async getProductList() {
      const params = {
        searchName: this.searchName,
        size: this.pagination.viewby,
        page: this.pagination.currentPage - 1,
      };
      const {data: listProd} = await getProdcutList(params);
      this.listProd = this.handleProductList(listProd.data);
      this.pagination.total = listProd.total;
      this.pagination.totalPage = Array.from(
          Array(Math.ceil(listProd.total / this.pagination.viewby)).keys()
      );
    },
    handleProductList(data) {
      return data.map((item) => ({
        ...item,
        name: item.pName,
        img: item.pImgLink,
        price: item.pPrice,
      }));
    },
    seeDetail(p) {
      this.showProductDetail = true;
      this.productDetail = p;
    },
    addToCart(item) {
      this.$store.commit("setCartData", item);
    },
    onAddToCard() {
      this.addToCart(this.productDetail);
      this.showProductDetail = false;
    },
    onChangePage(direction) {
      let {currentPage, totalPage} = this.pagination;
      if (direction === "next") {
        if (currentPage < totalPage.length)
          this.pagination.currentPage = this.pagination.currentPage + 1;
      } else if (direction === "previous") {
        if (currentPage - 1 > 0) this.pagination.currentPage = currentPage - 1;
      } else {
        this.pagination.currentPage = direction + 1;
      }
      this.getProductList();
    }
  },
};
</script>

<style lang="scss" scoped>
.main-container {
  margin-top: 60px;

  .main-area {
    display: flex;
  }

  .category-area {
    width: 300px;
    padding: 30px;
    border-radius: 5px;
    background: #f8f8f8;

    .title {
      display: inline;
      font-size: 18px;
      font-weight: 600;
      color: #000;
      position: relative;

      &::before {
        content: "";
        position: absolute;
        width: 70%;
        height: 2px;
        bottom: -8px;
        left: 0;
        background-color: #0da487;
      }
    }

    .list-category {
      margin-top: 10px;
      padding-left: 0;
      list-style: none;
    }

    .category-item {
      margin-top: 30px;
      position: relative;
      transition: 0.3s ease-in-out;
      cursor: pointer;

      &::after {
        content: "";
        position: absolute;
        width: 0;
        height: 2px;
        bottom: -8px;
        left: 0;
        opacity: 0.5;
        transition: 0.3s ease-in-out;
        background-color: #0da487;
      }

      &:hover {
        letter-spacing: 0.5px;

        &::after {
          width: 70px;
        }
      }

      &.active {
        &::after {
          width: 70px;
          letter-spacing: 0.5px;
        }
      }
    }
  }

  .product-area {
    flex: 1;
    margin-left: 25px;

    .title {
      display: inline;
      font-size: 28px;
      font-weight: 600;
      color: #000;
      position: relative;

      &::before {
        content: "";
        position: absolute;
        width: 70%;
        height: 2px;
        bottom: -8px;
        left: 0;
        background-color: #0da487;
      }
    }

    .list-product {
      gap: 15px;
      display: grid;
      margin-top: 30px;
      min-height: 500px;
      border-radius: 10px;
      grid-template-columns: 1fr 1fr 1fr 1fr;
    }

    .product-item {
      display: flex;
      padding: 15px;
      height: 280px;
      border-radius: 5px;
      position: relative;
      flex-direction: column;
      justify-content: space-between;
      border: 1px solid #ccc;

      .product-img {
        width: 100%;
        height: 170px;
        overflow: hidden;
        text-align: center;
        position: relative;

        img {
          width: 100%;
        }
      }

      .product-name {
        color: #000;
        font-size: 14px;
        font-weight: 600;
      }

      .product-price {
        .real-price {
          color: #0da487;
          font-weight: bold;
        }

        .discount-price {
          font-size: 15px;
          margin-left: 10px;
          text-decoration: line-through;
        }
      }

      .product-rate {
        font-size: 14px;
        color: #0da487;
        font-weight: bold;
      }

      .actions-container {
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        display: flex;
        position: absolute;
        align-items: flex-end;
        justify-content: center;
      }

      .actions-area {
        opacity: 0;
        display: flex;
        height: 35px;
        width: 120px;
        bottom: 15px;
        padding: 5px 0;
        visibility: hidden;
        position: relative;
        border-radius: 10px;
        background: #fff;
        justify-content: space-around;
        transition: 0.3s all ease-in-out;
        box-shadow: 0 0 5px 0px #ccc;
      }

      .add-to-cart,
      .see-detail {
        width: 60px;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;

        svg {
          width: 18px;
        }
      }

      .divider {
        height: 100%;
        border-left: 1px solid #ccc;
      }

      &:hover .actions-area {
        opacity: 1;
        bottom: 30px;
        visibility: visible;
      }
    }
  }

  .best-seller::before {
    content: "";
    right: 120px;
    width: 50px;
    top: -15px;
    height: 40px;
    display: block;
    position: absolute;
    background: url("../assets/img/icons/pngaaa.com-3003256.png") no-repeat center;
    background-size: contain;
    transform: rotate(-55deg);
  }

  .p-best-seller::after {
    content: "";
    right: -40px;
    width: 50px;
    top: -10px;
    height: 40px;
    display: block;
    position: absolute;
    background: url("../assets/img/icons/pngaaa.com-3003256.png") no-repeat center;
    background-size: contain;
    transform: rotate(-55deg);
  }

  .sold-out {
    pointer-events: none;
  }

  .sold-out::before {
    content: "";
    top: 0;
    right: 0;
    z-index: 3;
    width: 50px;
    height: 40px;
    display: block;
    position: absolute;
    background: url("../assets/img/icons/3734383.png") no-repeat center;
    background-size: contain;
  }

  .sold-out::after {
    content: "";
    top: 0;
    left: 0;
    z-index: 2;
    width: 100%;
    height: 100%;
    display: block;
    position: absolute;
    background: rgba($color: #000000, $alpha: 0.2);
  }
}

.prod-detail {
  .close-icon {
    top: -10px;
    right: -10px;
    display: flex;
    font-size: 25px;
    color: #0da487;
    position: absolute;
    cursor: pointer;

    &::after {
      content: "";
      top: 3px;
      right: 5px;
      z-index: -1;
      width: 20px;
      height: 20px;
      background: #fff;
      position: absolute;
    }
  }

  .modal-dialog {
    max-width: 800px;
  }

  .prod-detail-container {
    z-index: 0;
    width: 100%;
    display: flex;
    min-width: 700px;
    min-height: 400px;
  }

  .product-image {
    flex: 1;

    img {
      width: 100%;
      height: 100%;
      object-fit: scale-down;
    }
  }

  .product-information {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding-left: 30px;
  }

  .p-container {
    display: flex;
    flex-direction: column;

    .p-title {
      color: #000;
      font-weight: 600;
    }

    .p-price {
      color: #000;
    }

    .p-detail {
      color: #000;
      font-size: 14px;
      margin-top: 10px;
      padding-top: 10px;
      border-top: 1px dashed #ececec;
    }
  }

  .p-actions {
    .add-to-cart {
      width: 200px;
      height: auto;
      padding: 5px;
      font-size: 18px;
      color: #fff;
      font-weight: bold;
      border-radius: 5px;
      text-align: center;
      background: #0da487;
      border: 1px solid #0da487;
      cursor: pointer;
    }
  }
}
</style>
