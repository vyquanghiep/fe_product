<template>
  <div class="container mt-4">
    <div class="row">
      <div class="col-md-3">
        <h4>Danh mục sản phẩm</h4>
        <ul class="list-group">
          <li class="list-group-item" v-for="itemc in category" :key="itemc.id">
            <router-link :to="`/homepage/${itemc.id}`" @click="getProductsByCategory(itemc.id)">{{ itemc.name }}</router-link>
          </li>
        </ul>
      </div>

      <div class="col-md-9">
        <div class="row d-flex">
          <div class="col-card col-lg-4" v-for="item in product" :key="item.id">
            <div class="product-card card mt-4 ">
              <img class="img-card card-img-top" :src="item.url" alt="Card image cap">
              <div class="card-body">
                <h5 class="title card-title">{{ item.name }}</h5>
                <p class="card-text">Giá: {{ item.price }}</p>
                <router-link class="buy-btn btn btn-danger" :to="`/product/detail/${item.id}`">Mua ngay</router-link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ProductClient from "@/client/ProductClient";
import CategoryClient from "@/client/CategoryClient";

export default {
  data() {
    return {
      product: [],
      category: [],
    };
  },
  created() {
    this.getCategories();
    this.getProducts();
  },
  watch: {
    $route(to, from) {
      if (to.path === '/' && from.path !== '/') {
        this.getProducts();
      }
    }
  },
  methods: {
    getCategories() {
      CategoryClient.getCategories()
          .then(response => {
            this.category = response.data;
          })
          .catch(error => {
            console.error(error);
          });
    },
    getProducts() {
      ProductClient.getProducts()
          .then(response => {
            this.product = response.data;
          })
          .catch(error => {
            console.error(error);
          });
    },
    getProductsByCategory(categoryId) {
      CategoryClient.getProductsByIdCategory(categoryId)
          .then(response => {
            this.product = response.data;
          })
          .catch(error => {
            console.error(error);
          });
    },
  },
};
</script>

<style scoped>
.product-card{
  width: 100%;
  min-height: 300px;
}
.img-card{
  height: 200px;
}
.title{
  font-size: 18px;
}

</style>
