<template>
  <section class="product-page mb-4">
    <div class="container">
      <div class="product-detail bg-white p-4">
        <div class="row">
          <div class="col-md-5 khoianh">
            <div class="anhto mb-4">
              <img class="product-image" :src="dataForm.url" alt="Product Image">
            </div>
          </div>
          <div class="col-md-7 khoithongtin">
            <div class="row">
              <div class="col-md-12 header">
                <p class="product-name">{{ dataForm.name }}</p>
              </div>
              <div class="col-md-7">
                <div class="gia">
                  <div>
                    <b class="gia-ban">Giá bán:</b>
                    <span class="product-price"><b>{{ dataForm.price }} đ</b></span>
                  </div>
                </div>
                <div>
                  <b>Mô tả: </b><p>{{ dataForm.decription }}</p>
                </div>
                <form @submit.prevent="onSubmit">
                  <div class="soluong d-flex">
                    <label class="font-weight-bold mr-2">Số lượng: </label>
                    <div class="cart-quantity cart-column">
                      <button :disabled="isDisablel" @click="decrementCount" class="quantity-btn">-</button>
                      <b class="quantity-display">{{ count }}</b>
                      <button :disabled="isDisabler" @click="incrementCount" class="quantity-btn">+</button>
                    </div>
                  </div>
                  <button class="buy-btn btn w-100 text-uppercase" type="submit">
                    <i> Chọn mua </i>
                  </button>
                </form>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import ProductClient from "@/client/ProductClient";

export default {
  data() {
    return {
      isDisablel: false,
      isDisabler: false,
      count: 1,
      dataForm: {
        id: '',
        decription: '',
        name: '',
        price: '',
        quantity: '',
        url: '',
        typeproduct: '',
      },
    };
  },
  created() {
    const productId = this.$route.params.id;
    if (productId) {
      this.getProductById(productId);
    }
  },
  methods: {
    getProductById(productId) {
      ProductClient.getProductById(productId)
          .then((response) => {
            this.dataForm = response.data;
            console.log(response.data);
          })
          .catch((error) => {
            console.error("Error fetching product data:", error);
          });
    },
    incrementCount() {
      this.count++;
      this.updateQuantityLimits();
    },
    decrementCount() {
      this.count--;
      this.updateQuantityLimits();
    },
    updateQuantityLimits() {
      this.isDisablel = this.count <= 1;
      this.isDisabler = this.count >= this.dataForm.quantity;
    },
    onSubmit() {

    },
  },
};
</script>

<style scoped>
.product-image {
  width: 100%;
  height: 350px;
}

.product-name {
  font-size: 29px;
}

.gia-ban {
  margin-left: 0px;
  font-size: 17px;
  color: black;
}

.product-price {
  margin-left: 0px;
  font-size: 27px;
  color: red;
}
.buy-btn{
  background: #F5A623;
}
</style>
