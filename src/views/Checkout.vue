<template>
    <div class="payment-page">
        <div class="main-container">
            <div class="container main-area">
                <div class="product-area">
                    <h5 class="title">Product Information</h5>
                    <div class="list-product">
                        <div class="product-item" v-for="p in listProd" :key="p.id">
                            <div class="product-name">{{ p.pName }}</div>
                            <div class="product-info">
                                <div class="product-img">
                                    <img :src="p.img" alt="">
                                </div>
                                <div class="product-vendor">
                                    <span class="price">Price: {{ $filters.toDollarFormat(p.pPrice) }}</span>
                                    <span class="quantity">Quantity: {{ p.quantity }}</span>
                                </div>
                                <div class="product-price"></div>
                                <div class="product-quantity"></div>
                                <div class="product-action"></div>
                                <div class="product-total">
                                    <span>Total</span>
                                    <span class="total-text">{{ $filters.toDollarFormat(p.quantity * p.pPrice) }}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="cart-total-area">
                    <div class="title">Order Summery</div>
                    <div class="cart-total-item total-text">
                        <span>Total</span>
                        <span>${{total}}</span>
                    </div>
                    <div class="btn checkout-btn" @click="showBillingAddressForm">Place Order</div>
                </div>
            </div>
        </div>
        <checkout-delivery-form ref="billingAddressForm" @order="onOrder" />
    </div>
</template>
  
<script>
import http from "@/axios";

const body = document.getElementsByTagName("body")[0];

import CheckoutDeliveryForm from './CheckoutDeliveryForm.vue';

export default {
    name: "Home",
    components: {
        CheckoutDeliveryForm
    },
    filters: {

    },
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
            total: ''
        }
    },
    mounted() {
      this.listProd = JSON.parse(sessionStorage.getItem('cart'));
      this.total = this.calculateTotal();
    },
    methods: {
        showBillingAddressForm() {
            this.$refs.billingAddressForm.show();
        },
        async onOrder(data) {
            const formData = {}
            formData.userId = JSON.parse(sessionStorage.getItem('user'))?.id;
            formData.address = data.address;
            formData.phone = data.phoneNumber;
            formData.product = this.listProd;

          try {
            await http.post(`${process.env.VUE_APP_API}/api/order`, formData);
            sessionStorage.removeItem('cart');
            this.listProd = JSON.parse(sessionStorage.getItem('cart'));
            this.$toast("Create successfully", true);
          } catch (error) {
            this.$toast("Create failure", false);
          }
        },
      calculateTotal(){
          if(this.listProd){
            return this.listProd.reduce((total, item) => {
              return total + (Number(item['quantity']) * Number(item['pPrice']))
            }, 0)
          } else return 0;
      }
    }
};
</script>
  
<style lang="scss" scoped>
.payment-page {
    .main-container {
        margin-top: 60px;

        .main-area {
            display: flex;
        }

        .product-area {
            flex: 1;
            padding: 15px 20px;
            background: #f8f8f8;

            .title {
                display: inline-block;
                color: #000;
                font-weight: 600;
                position: relative;
                margin-bottom: 15px;

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
                background: #0da487;
            }
        }
    }
}
</style>
  