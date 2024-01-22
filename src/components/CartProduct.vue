<template>
  <div class="container">
    <div class="modal-body">
      <div class="cart-row">
        <span class="cart-item cart-header cart-column">Sản Phẩm</span>
        <span class="cart-price cart-header cart-column">Giá</span>
        <span class="cart-quantity cart-header cart-column">Số Lượng</span>
      </div>
      <div class="cart-items">
        <div v-for="product in cart" :key="product.id" class="cart-row">
          <div class="cart-item cart-column">
            <img class="cart-item-image" :src="product.url" width="100" height="100">
            <span class="cart-item-title">{{ product.name }}</span>
          </div>
          <span class="cart-price cart-column">{{ product.price }}đ</span>
          <div class="cart-quantity cart-column">
            <button :disabled="product.isDisablel" @click="giamSo(product)" class="quantity-btn">-</button>
            <b class="quantity-display">{{ product.count }}</b>
            <button :disabled="product.isDisabler" @click="tangSo(product)" class="quantity-btn">+</button>
            <button class="btn btn-danger ml-2" @click="xoaSo(product)">Xóa</button>
          </div>
        </div>

        <div class="cart-total">

          <strong class="cart-total-title">Tổng Cộng:</strong>
          <span class="cart-total-price">{{ tongCong }} VNĐ</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      cart: [
        {
          id: 1,
          name: 'Bộ Thể Thao Kéo Khóa Phối LOGO72 Cao Cấp',
          price: 109000,
          quantity: 20,
          decription: 'Thời trang',
          url: 'https://down-vn.img.susercontent.com/file/sg-11134201-22120-hqusw1bn97kv52',
          producttype: 1,
          count: 1,
          isDisablel: false,
          isDisabler: false,
        },
        {
          id: 2,
          name: 'Combo 2 quần thể thao nam',
          price: 100000,
          quantity: 20,
          decription: 'Thời trang',
          url: 'https://down-vn.img.susercontent.com/file/a3a2310774c08cb879994851257fa202',
          producttype: 1,
          count: 1,
          isDisablel: false,
          isDisabler: false,
        },
      ],
    };
  },
  methods: {
    tangSo(product) {
      product.count++;
      product.isDisablel = product.count <= 1 ? true : false;
      product.isDisabler = product.count >= product.quantity ? true : false;
    },
    giamSo(product) {
      product.count--;
      product.isDisablel = product.count <= 1 ? true : false;
      product.isDisabler = product.count >= product.quantity ? true : false;
    },
    xoaSo(product) {
      const index = this.cart.indexOf(product);
      if (index !== -1) {
        this.cart.splice(index, 1);
      }
    },
  },
  computed: {
    tongCong() {
      return this.cart.reduce((total, product) => total + product.count * product.price, 0);
    },
  },
};
</script>
<style>
.cart-header {
  font-weight: bold;
  font-size: 1.25em;
  color: #333;
}

.cart-column {
  display: flex;
  align-items: center;
  border-bottom: 1px solid black;
  margin-right: 1.5em;
  padding-bottom: 10px;
  margin-top: 10px;
}

.cart-row {
  display: flex;
}

.cart-item {
  width: 45%;
}

.cart-price {
  width: 20%;
  font-size: 1.2em;
  color: #333;
}

.cart-quantity {
  width: 35%;
}

.cart-item-title {
  color: #333;
  margin-left: .5em;
  font-size: 1.2em;
}

.cart-item-image {
  width: 75px;
  height: auto;
  border-radius: 10px;
}

.btn-danger {
  color: white;
  background-color: #EB5757;
  border: none;
  border-radius: .3em;
  font-weight: bold;
}

.btn-danger:hover {
  background-color: #CC4C4C;
}

.cart-quantity-input {
  height: 34px;
  width: 50px;
  border-radius: 5px;
  border: 1px solid #56CCF2;
  background-color: #eee;
  color: #333;
  padding: 0;
  text-align: center;
  font-size: 1.2em;
  margin-right: 25px;
}

.cart-row:last-child {
  border-bottom: 1px solid black;
}

.cart-row:last-child .cart-column {
  border: none;
}

.cart-total {
  text-align: end;
  margin-top: 10px;
  margin-right: 10px;
}

.cart-total-title {
  font-weight: bold;
  font-size: 1.5em;
  color: black;
  margin-right: 20px;
}

.cart-total-price {
  color: #333;
  font-size: 1.1em;
}
</style>
