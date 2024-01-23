<template>
  <div class="container">
    <div >
      <h1 >Product Management</h1>
    </div>
    <router-link class="btn btn-success" to="/product/add">Add Product</router-link>
    <hr>
    <form @submit.prevent="searchProducts" method="get">
      <input type="text" v-model="searchKeyword" placeholder="Tìm kiếm sản phẩm" size="50">
      <button type="submit" class="btn btn-info">Search</button>
      <a class="btn btn-info" @click="resetSearch">Reset</a>
    </form>

    <table class="table table-bordered">
      <thead class="table-dark">
      <tr>
        <th>ProductId</th>
        <th>Name</th>
        <th>Price</th>
        <th>Quantity</th>
        <th>Decription</th>
        <th>Image</th>
        <th>Type</th>
        <th>Action</th>
      </tr>
      </thead>

      <tbody>
      <tr v-for="item in product" :key="item.id">
        <td>{{ item.id }}</td>
        <td>{{ item.name }}</td>
        <td>{{ item.price }}</td>
        <td>{{ item.quantity }}</td>
        <td>{{ item.decription }}</td>
        <td><img :src="item.url" alt="Product Image" style="max-width: 100px; max-height: 100px;"></td>
        <td>{{ item.typeproduct }}</td>
        <td><div class="btn-group">
          <router-link class="btn btn-warning mr-2" :to="`/product/add/${item.id}`">Edit</router-link>
          <a class="btn btn-danger" @click="deleteProduct(item.id)">Delete</a>

        </div></td>
      </tr>
      </tbody>
    </table>

  </div>
</template>
<script>

import ProductClient from "@/client/ProductClient";
import Swal from "sweetalert2";

const swalWithBootstrapButtons = Swal.mixin({
  customClass: {
    confirmButton: "btn btn-success",
    cancelButton: "btn btn-danger"
  },
  buttonsStyling: false
});

export default {
  data() {
    return {
      product: [],
      searchKeyword: ''
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

    deleteProduct(id) {
      swalWithBootstrapButtons.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, delete it!",
        cancelButtonText: "No, cancel!",
        reverseButtons: true
      }).then((result) => {
        if (result.isConfirmed) {

          ProductClient.deleteProduct(id)
              .then(() => {
                swalWithBootstrapButtons.fire({
                  title: "Deleted!",
                  text: "Your product has been deleted.",
                  icon: "success"
                });
                this.getProducts();
              })
              .catch(error => {
                console.error(error);
              });
        } else if (result.dismiss === Swal.DismissReason.cancel) {

          swalWithBootstrapButtons.fire({
            title: "Cancelled",
            text: "Your product is safe !",
            icon: "error"
          });
        }
      });
    },
    searchProducts() {
      if (this.searchKeyword.trim() !== '') {
        ProductClient.searchProducts(this.searchKeyword)
            .then(response => {
              this.product = response.data;
            })
            .catch(error => {
              console.error(error);
            });
      }
    },

    resetSearch() {
      this.searchKeyword = '';
      this.getProducts();
    }

  },

}
</script>
<style scoped>



</style>
