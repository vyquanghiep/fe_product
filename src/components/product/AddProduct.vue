
<template>
  <div class="container" >
    <h1>{{ editMode ? 'Edit Product' : 'Create New Product' }}</h1>
    <hr>
    <form action="#"  @submit.prevent="formSubmit"   method="POST">

      <div class="form-group">
        <input type="hidden" v-model="dataForm.id">
        <input type="text"  placeholder="name" class="form-control mb-4 col-4" v-model="dataForm.name">
      </div>
      <div class="form-group">

        <input type="text" placeholder="quantity" class="form-control mb-4 col-4" v-model="dataForm.quantity">
      </div>
      <div class="form-group">

        <input type="text"  placeholder="price" class="form-control mb-4 col-4" v-model="dataForm.price">
      </div>
      <div class="form-group">

        <input type="text" placeholder="decription" class="form-control mb-4 col-4" v-model="dataForm.decription">
      </div>
      <div class="form-group">

        <input type="text" placeholder="url" class="form-control mb-4 col-4" v-model="dataForm.url">
      </div>
      <div class="form-group">
        <label for="image">Image:</label>
        <input type="file" id="image" @change="handleFileChange">
      </div>
      <div class="form-group">

        <input type="text" placeholder="typeproduct" class="form-control mb-4 col-4" v-model="dataForm.typeproduct">
      </div>
      <div class="btn-group">
        <button type="submit" class="btn btn-success">{{ editMode ? 'Update' : 'Save' }}</button>
        <router-link class="btn btn-primary" to="/product"> Back</router-link>
      </div>
    </form>

  </div>
</template>
<script>
import ProductClient from "@/client/ProductClient";
import swal from "sweetalert2";

export default{
  data(){
    return{
      editMode: false,
      dataForm: {
        id:'',
        name:'',
        price: '',
        quantity: '',
        decription: '',
        url: '',
        typeproduct:'',
      }
    }
  },
  created() {
    const productId = this.$route.params.id;
    if (productId) {
      this.editMode = true;
      this.getProductById(productId);
    }
  },
  methods: {
    getProductById(productId) {
      ProductClient.getProductById(productId)
          .then(response => {
            this.dataForm = response.data;
          })
          .catch(error => {
            console.error('Error fetching product data:', error);
          });
    },
    formSubmit() {
      if (this.editMode) {
        this.updateProduct(this.dataForm)
            .then(() => {
              console.log('Product updated successfully:', this.dataForm);
              this.navigateToProductPage();
              swal.fire({
                title: "Update!",
                text: "Product has been update.",
                icon: "success",
                confirmButtonText: "OK",
                customClass: {
                  confirmButton: "btn btn-success",
                },
              });
            })
            .catch(error => {
              console.error('Error updating product:', error);
            });
      } else {
        this.addProduct(this.dataForm)
            .then(() => {
              console.log('Product added successfully:', this.dataForm);
              this.navigateToProductPage();
            })
            .catch(error => {
              console.error('Error adding product:', error);
            });
      }
    },

    updateProduct(productData) {
      return ProductClient.saveProduct(productData)
          .then(() => {
            console.log('Product updated successfully');
          })
          .catch(error => {
            console.error('Error updating product:', error);
            throw error;
          });
    },

    addProduct(productData) {
      return ProductClient.saveProduct(productData)
          .then(response => {
            console.log('Product added successfully:', response.data);
          })
          .catch(error => {
            console.error('Error adding product:', error);
            throw error;
          });
    },

    navigateToProductPage() {
      this.$router.push('/product');
    }

  }
};
</script>
<style scoped>

</style>