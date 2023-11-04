<template>
  <div class="main-container">
    <div class="container main-area">
      <div class="category-area">
        <div class="title">Catregory</div>
        <ul class="list-category">
          <li class="category-item" v-for="item in categories" :key="item.id"
              @click="active = item.id"
              :class="{active:active === item.id}">{{item.catName}}</li>
        </ul>
      </div>
      <div class="product-area">
        <div class="title">Product List</div>
        <div class="list-product">
          <div class="product-item" v-for="p in listProd" :key="p.id">
            <div class="product-img">
              <img :src="p.img" alt="">
            </div>
            <div class="product-info">
              <div class="product-name">{{ p.pName }}</div>
              <div class="product-price">
                <span class="real-price">{{ p.pPrice }}</span>
              </div>
            </div>
            <div class="add-to-cart" @click="addToCart(p)">Add</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import http from "@/axios";

const body = document.getElementsByTagName("body")[0];

export default {
  name: "Home",
  components: {},
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
      listProd: [
        {
          id: 1,
          pPrice: 28.56,
          img: require('../assets/img/products/1.png'),
          pName: 'Fantasy Crunchy Choco Chip Cookies',
        },
        {
          id: 2,
          pPrice: 28.56,
          img: require('../assets/img/products/2.png'),
          pName: 'Fantasy Crunchy Choco Chip Cookies',
        },
        {
          id: 3,
          pPrice: 28.56,
          img: require('../assets/img/products/3.png'),
          pName: 'Fantasy Crunchy Choco Chip Cookies',
        },
        {
          id: 4,
          pPrice: 28.56,
          img: require('../assets/img/products/4.png'),
          pName: 'Fantasy Crunchy Choco Chip Cookies',
        },
        {
          id: 5,
          pPrice: 28.56,
          img: require('../assets/img/products/1.png'),
          pName: 'Fantasy Crunchy Choco Chip Cookies',
        },
        {
          id: 6,
          pPrice: 28.56,
          img: require('../assets/img/products/2.png'),
          pName: 'Fantasy Crunchy Choco Chip Cookies',
        },
        {
          id: 7,
          pPrice: 28.56,
          img: require('../assets/img/products/3.png'),
          pName: 'Fantasy Crunchy Choco Chip Cookies',
        },
        {
          id: 8,
          pPrice: 28.56,
          img: require('../assets/img/products/4.png'),
          pName: 'Fantasy Crunchy Choco Chip Cookies',
        },

      ],
      categories: [],
      active: null
    }
  },
  async mounted() {
    this.categories = (await http.get(`${process.env.VUE_APP_API}/api/category/customer`))?.data
  },
  methods: {
    addToCart(item) {
      let cart = []
      let storage = sessionStorage.getItem('cart')
      if(storage) {
        cart = JSON.parse(storage)
      }
      let product = cart.find(el => el.id === item.id)
      if(product) {
        product.quantity += 1
      } else {
        cart.push({...item, quantity: 1})
      }
      this.$store.commit('setQuantity', cart.length)
      sessionStorage.setItem('cart', JSON.stringify(cart))
    }
  }
};
</script>

<style lang="scss" scoped>
.main-container {
  .active {
    color: red;
    font-size: 20px;
    font-weight: bold;
  }
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
      transition: .3s ease-in-out;
      cursor: pointer;

      &::after {
        content: "";
        position: absolute;
        width: 0;
        height: 2px;
        bottom: -8px;
        left: 0;
        opacity: .5;
        transition: .3s ease-in-out;
        background-color: #0da487;
      }

      &:hover {
        letter-spacing: 0.5px;

        &::after {
          width: 70px;
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
      border-radius: 10px;
      grid-template-columns: 1fr 1fr 1fr 1fr;
    }

    .product-item {
      display: flex;
      padding: 15px;
      flex-direction: column;
      justify-content: space-between;
      border: 1px solid #ccc;

      .product-img {
        text-align: center;
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

      .add-to-cart {
        width: 100%;
        margin-top: 10px;
        padding: 5px;
        text-align: center;
        border-radius: 20px;
        background: #eee;
        cursor: pointer;
      }

      // &:nth-child(3n - 1) {
      //   margin-left: 10px;
      //   margin-right: 10px;
      // }
    }
  }
}
</style>
