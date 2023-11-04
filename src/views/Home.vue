<template>
  <div class="main-container">
    <div class="container main-area">
      <div class="category-area">
        <div class="title">Catregory</div>
        <ul class="list-category">
          <li class="category-item" v-for="c in categories" :key="c.id" :class="{ active: c.id === selectCatId }"
            @click="selectCatId = c.id">
            {{ c.catName }}
          </li>
        </ul>
      </div>
      <div class="product-area">
        <div class="title">Product List</div>
        <div class="list-product">
          <div class="product-item" v-for="p in listProd" :key="p.id">
            <div class="product-img">
              <img :src="p.img" alt="" />
            </div>
            <div class="product-info">
              <div class="product-name">{{ p.name }}</div>
              <div class="product-price">
                <span class="real-price">{{ p.price }}</span>
                <span class="discount-price">{{ p.salePrice }}</span>
              </div>
              <div class="product-rate">
                <span>{{ "⭐⭐⭐⭐⭐".slice(0, p.star) }}</span>
                <span style="margin-left: 5px">{{ p.inStock && "In Stock" }}</span>
              </div>
            </div>
            <div class="add-to-cart">Add</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getCategory, getProdcutListByCategory } from "@/data/api";
export default {
  name: "Home",
  components: {},
  data() {
    return {
      selectCatId: "",
      categories: [],
      listProd: [
        {
          id: 1,
          star: 4,
          inStock: true,
          price: "$28.56",
          salePrice: "$26.69",
          img: require("../assets/img/products/1.png"),
          name: "Fantasy Crunchy Choco Chip Cookies",
        },
        {
          id: 2,
          star: 5,
          inStock: true,
          price: "$28.56",
          salePrice: "$26.69",
          img: require("../assets/img/products/2.png"),
          name: "Peanut Butter Bite Premium Butter Cookies 600 g",
        },
        {
          id: 3,
          star: 2,
          inStock: true,
          price: "$28.56",
          salePrice: "$26.69",
          img: require("../assets/img/products/3.png"),
          name: "Peanut Butter Bite Premium Butter Cookies 600 g",
        },
        {
          id: 4,
          star: 3,
          inStock: true,
          price: "$28.56",
          salePrice: "$26.69",
          img: require("../assets/img/products/4.png"),
          name: "Peanut Butter Bite Premium Butter Cookies 600 g",
        },
        {
          id: 1,
          star: 4,
          inStock: true,
          price: "$28.56",
          salePrice: "$26.69",
          img: require("../assets/img/products/1.png"),
          name: "Fantasy Crunchy Choco Chip Cookies",
        },
        {
          id: 2,
          star: 5,
          inStock: true,
          price: "$28.56",
          salePrice: "$26.69",
          img: require("../assets/img/products/2.png"),
          name: "Peanut Butter Bite Premium Butter Cookies 600 g",
        },
        {
          id: 3,
          star: 2,
          inStock: true,
          price: "$28.56",
          salePrice: "$26.69",
          img: require("../assets/img/products/3.png"),
          name: "Peanut Butter Bite Premium Butter Cookies 600 g",
        },
        {
          id: 4,
          star: 3,
          inStock: true,
          price: "$28.56",
          salePrice: "$26.69",
          img: require("../assets/img/products/4.png"),
          name: "Peanut Butter Bite Premium Butter Cookies 600 g",
        },
      ],
    };
  },
  watch: {
    async selectCatId(val) {
      const { data } = await getProdcutListByCategory({ categoryId: val });
      this.listProd = this.handleProductList(data.data);
    },
  },
  async mounted() {
    const { data } = await getCategory();
    this.categories = data.data;
  },
  methods: {
    handleProductList(data) {
      return data.map((item) => ({
        ...item,
        img: require("../assets/img/products/2.png"),
        name: item.pName,
        price: item.pPrice,
      }));
    },
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
