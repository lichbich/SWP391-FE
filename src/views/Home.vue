<template>
  <div class="home-page">
    <div class="header">
      <div class="container header-container">
        <div class="logo">
          <img src="../assets/img/logos/home-logo.png" alt="">
        </div>
        <div class="search-area">
          <input type="text" placeholder="I'm searching for..." />
          <div class="search-btn">Search</div>
        </div>
        <div class="action-area">
          <div class="action-btn">Like</div>
          <div class="action-btn">Cart</div>
          <div class="action-btn">Account</div>
        </div>
      </div>
    </div>
    <div class="main-container">
      <div class="container main-area">
        <div class="category-area">
          <div class="title">Catregory</div>
          <ul class="list-category">
            <li class="category-item">Vegetables & Fruit</li>
            <li class="category-item">Beverages</li>
            <li class="category-item">Meats & Seafood</li>
            <li class="category-item">Frozen Foods</li>
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
                <div class="product-name">{{ p.name }}</div>
                <div class="product-price">
                  <span class="real-price">{{ p.price }}</span>
                  <span class="discount-price">{{ p.salePrice }}</span>
                </div>
                <div class="product-rate">
                  <span>{{ '⭐⭐⭐⭐⭐'.slice(0, p.star) }}</span>
                  <span style="margin-left: 5px;">{{ p.inStock && 'In Stock' }}</span>
                </div>
              </div>
              <div class="add-to-cart">Add</div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div style="margin-top: 60px;">asd</div>
  </div>
</template>

<script>
const body = document.getElementsByTagName("body")[0];

export default {
  name: "Home",
  components: {
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
      listProd: [
        {
          id: 1,
          star: 4,
          inStock: true,
          price: '$28.56',
          salePrice: '$26.69',
          img: require('../assets/img/products/1.png'),
          name: 'Fantasy Crunchy Choco Chip Cookies',
        },
        {
          id: 2,
          star: 5,
          inStock: true,
          price: '$28.56',
          salePrice: '$26.69',
          img: require('../assets/img/products/2.png'),
          name: 'Peanut Butter Bite Premium Butter Cookies 600 g',
        },
        {
          id: 3,
          star: 2,
          inStock: true,
          price: '$28.56',
          salePrice: '$26.69',
          img: require('../assets/img/products/3.png'),
          name: 'Peanut Butter Bite Premium Butter Cookies 600 g',
        },
        {
          id: 4,
          star: 3,
          inStock: true,
          price: '$28.56',
          salePrice: '$26.69',
          img: require('../assets/img/products/4.png'),
          name: 'Peanut Butter Bite Premium Butter Cookies 600 g',
        },
        {
          id: 1,
          star: 4,
          inStock: true,
          price: '$28.56',
          salePrice: '$26.69',
          img: require('../assets/img/products/1.png'),
          name: 'Fantasy Crunchy Choco Chip Cookies',
        },
        {
          id: 2,
          star: 5,
          inStock: true,
          price: '$28.56',
          salePrice: '$26.69',
          img: require('../assets/img/products/2.png'),
          name: 'Peanut Butter Bite Premium Butter Cookies 600 g',
        },
        {
          id: 3,
          star: 2,
          inStock: true,
          price: '$28.56',
          salePrice: '$26.69',
          img: require('../assets/img/products/3.png'),
          name: 'Peanut Butter Bite Premium Butter Cookies 600 g',
        },
        {
          id: 4,
          star: 3,
          inStock: true,
          price: '$28.56',
          salePrice: '$26.69',
          img: require('../assets/img/products/4.png'),
          name: 'Peanut Butter Bite Premium Butter Cookies 600 g',
        },
      ]
    }
  }
};
</script>

<style lang="scss" scoped>
.home-page {
  .header {
    padding: 25px 0;
    box-shadow: 0 0 8px 0px #ccc;
  }

  .header-container {
    display: flex;
    align-items: center;
    justify-content: space-between;

    .logo {
      width: 150px;

      img {
        width: 100%;
      }
    }

    .search-area {
      width: 500px;
      height: 50px;
      display: flex;
      align-items: center;
      height: fit-content;

      input {
        width: 100%;
        height: 100%;
        padding: 10px;
        border-top-left-radius: 5px;
        border-bottom-left-radius: 5px;
        border: 1px solid #ccc;
        outline: none;
      }

      .search-btn {
        height: 100%;
        padding: 8px 8px 8.5px;
        border: 1px solid #ccc;
        border-left: none;
        border-top-right-radius: 5px;
        border-bottom-right-radius: 5px;
        cursor: pointer;
      }
    }

    .action-area {
      display: flex;

      .action-btn {
        padding: 5px 15px;
        border-left: 1px solid #eee;
      }
    }
  }

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
}
</style>
