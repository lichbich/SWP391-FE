<template>
  <div class="cart-page">
    <div class="main-container">
      <div class="container main-area">
        <div class="product-area">
          <div class="list-product">
            <div class="product-item" v-for="p in cartList" :key="p.id">
              <div class="product-name">{{ p.pName }}</div>
              <div class="product-info">
                <div class="product-img">
                  <img :src="$filters.getImageLink(p.img)" alt="" />
                </div>
                <div class="product-price">
                  <span>Price</span>
                  <div>
                    <span class="real-price">
                      {{ $filters.toDollarFormat(p.pPrice) }}
                    </span>
                  </div>
                </div>
                <div class="product-total">
                  <span>Item in shop</span>
                  <span class="real-price">
                    {{
                     p.pQuantity
                    }}
                  </span>
                </div>
                <div class="product-quantity">
                  <div class="quantity-container">
                    <span class="minus" @click="subProduct(p)">-</span>
                    <span>{{ p.quantity }}</span>
                    <span class="plus" @click="addProduct(p)">+</span>
                  </div>
                </div>
                <div class="product-total">
                  <span>Total</span>
                  <span class="total-text">
                    {{
                      $filters.toDollarFormat(
                        Number(p.quantity) * Number(p.pPrice)
                      )
                    }}
                  </span>
                </div>
                <div class="product-action">
                  <span>Action</span>
                  <span class="remove-link" @click="removeProduct(p)"
                    >Remove</span
                  >
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="cart-total-area">
          <div class="title">Cart Total</div>
          <div class="cart-total-item total-text">
            <span>Total</span>
            <span>${{ cartTotal }}</span>
          </div>
          <router-link class="btn checkout-btn" to="/checkout"
            >Process To Checkout</router-link
          >
        </div>
      </div>
    </div>
  </div>
</template>
  
<script>
import { mapState } from "vuex";

const body = document.getElementsByTagName("body")[0];

export default {
  name: "Home",
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
      total: "",
    };
  },
  computed: {
    ...mapState({
      cartList: (state) => state.cart,
    }),
    cartTotal() {
      return this.cartList.reduce((total, b) => {
        return total + b.pPrice * b.quantity;
      }, 0);
    },
  },
  methods: {
    subProduct(item) {
      this.calculateQuantity(item, false);
    },
    addProduct(item) {
      if(item.quantity === item.pQuantity) return;
      this.calculateQuantity(item, true);
    },
    calculateQuantity(item, add = true) {
      this.$store.commit("addCartQuantity", { p: item, isAdd: add });
    },
    removeProduct(item) {
      this.$store.commit("removeCartItem", item);
    },
  },
};
</script>
  
<style lang="scss" scoped>
.cart-page {
  .main-container {
    margin-top: 60px;

    .main-area {
      display: flex;
    }

    .product-area {
      flex: 1;
      padding: 15px 20px;
      background: #f8f8f8;

      .list-product {
      }

      .product-item {
        padding: 15px 0;
        border-bottom: 1px solid #ccc;

        &:last-child {
          border: unset;
        }

        .product-name {
          color: #000;
          font-size: 14px;
          font-weight: 600;
        }

        .product-info {
          display: grid;
          grid-template-columns: repeat(6, 1fr);
        }

        .product-img {
          width: 100%;
          height: 100px;
          padding: 10px;
          overflow: hidden;

          img {
            width: 100%;
            height: 100%;
            object-fit: contain;
            object-position: center;
          }
        }

        .product-vendor {
          display: flex;
          color: #000;
          font-size: 14px;
          font-weight: 600;
          padding-top: 15px;
          flex-direction: column;
        }

        .product-price {
          color: #000;
          display: flex;
          font-size: 14px;
          font-weight: 600;
          padding-top: 15px;
          flex-direction: column;

          .save-price {
            color: #0da487;
            font-weight: bold;
          }

          .discount-price {
            font-size: 15px;
            margin-left: 10px;
            text-decoration: line-through;
          }
        }

        .product-quantity {
          color: #000;
          display: flex;
          width: 70%;
          font-size: 14px;
          font-weight: 600;
          padding-top: 15px;
          flex-direction: column;

          .quantity-container {
            display: flex;
            margin-top: 10px;
            align-items: center;
            justify-content: space-between;
          }

          .minus,
          .plus {
            display: flex;
            align-items: center;
            justify-content: center;
            width: 30px;
            height: 30px;
            font-size: 20px;
            border-radius: 50%;
            background: #ccc;
            cursor: pointer;
          }
        }

        .product-total {
          color: #000;
          display: flex;
          font-size: 14px;
          font-weight: 600;
          padding-top: 15px;
          flex-direction: column;

          .total-text {
            font-size: 20px;
          }
        }

        .product-action {
          color: #000;
          display: flex;
          font-size: 14px;
          font-weight: 600;
          padding-top: 15px;
          flex-direction: column;

          .remove-link {
            color: #bf2020;
            text-decoration: underline;
            cursor: pointer;
          }
        }
      }
    }

    .cart-total-area {
      width: 300px;
      margin-left: 25px;
      border-radius: 5px;
      padding: 15px 20px;
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

      .cart-total-item {
        display: flex;
        color: #000;
        font-size: 14px;
        font-weight: 600;
        margin-top: 20px;
        justify-content: space-between;
      }

      .total-text {
        font-size: 24px;
      }

      .checkout-btn {
        width: 100%;
        color: #fff;
        margin-top: 20px;
        background: linear-gradient(90deg, #ff6b6b 0%, #ff4f4f 100%);
      }
    }
  }
}
</style>
  