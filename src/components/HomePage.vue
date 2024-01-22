<template>
  <div class="container mt-4">
    <div class="row d-flex ">
      <div class="col-card col-lg" v-for="item in product" :key="item.id">
        <div class="product-card card mt-4" >
          <img class="img-card card-img-top" :src="item.url" alt="Card image cap">
          <div class="card-body">
            <h5 class="title card-title">{{ item.name }}</h5>
            <p class="card-text">Giá:{{ item.price }}</p>
            <p class="card-text">Còn: {{ item.quantity }}</p>
            <a href="#" class="buy-btn btn btn-danger">Mua ngay</a>
          </div>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
import ProductClient from "@/client/ProductClient";

export default {
    data() {
      return {
        product: [],
      }
    },
     mounted() {
        this.getProducts();
     },
  methods: {
    getProducts() {
      ProductClient.getProducts()
          .then(response => {
            this.product = response.data;
          })
          .catch(error => {
            console.error(error);
          });
    },

  },

}
</script>

<style scoped>

.buy-btn{
  position: absolute;
  bottom: 0;
  right: 0;
  margin-right: 5%;
  margin-bottom: 5%;
}

.product-card{
  width: 15rem;
  min-height: 400px;
}
.img-card{
  height: 200px;
}
.title{
  font-size: 18px;
}

</style>