<template>
    <div class="home-page">
        <div class="header">
            <div class="container header-container">
                <div class="logo">
                  <router-link to="/home" class="action-btn">
                    <img src="../../assets/img/logos/home-logo.png" alt="">
                  </router-link>
                </div>
                <div class="search-area">
                    <input type="text" placeholder="I'm searching for..." />
                    <div class="search-btn">Search</div>
                </div>
                <div class="action-area">
                    <router-link to="/cart" class="action-btn">Cart
                      <span class="action-area__card-item">{{quantity}}</span>
                    </router-link>
                    <div class="action-btn">Account</div>
                </div>
            </div>
        </div>
    <router-view />
    <div style="margin-top: 60px">asd</div>
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
    computed: {
      quantity() {
        return this.$store.getters.quantity
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
            position: relative;

            .action-btn {
                padding: 5px 15px;
                border-left: 1px solid #eee;
            }
          &__card-item{
            position: absolute;
            top:0;
            font-size: 12px;
            color: white;
            background-color: red;
            width: 15px;
            height: 18px;
            border: 1px solid red;
            align-items: center;
            text-align: center;
            border-radius: 3px;
          }
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
</style>
  