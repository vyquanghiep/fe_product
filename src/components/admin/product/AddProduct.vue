
<template>
  <div class="container" >
    <h1>{{ editMode ? 'Edit Product' : 'Create New Product' }}</h1>
    <hr>
    <form action="#"  @submit.prevent="formSubmit"   method="POST">

      <div class="form-group">
        <input type="hidden" v-model="dataForm.id">
        <input type="text"  placeholder="name" class="form-control mb-4 col-4" v-model="dataForm.name" required>
      </div>
      <div class="form-group">
        <input type="text" placeholder="quantity" class="form-control mb-4 col-4" v-model="dataForm.quantity" required>
      </div>
      <div class="form-group">
        <input type="text"  placeholder="price" class="form-control mb-4 col-4" v-model="dataForm.price" required>
      </div>
      <div class="form-group">
        <input type="text" placeholder="decription" class="form-control mb-4 col-4" v-model="dataForm.decription" required>
      </div>
      <div class="form-group">
        <input type="text" placeholder="url" class="form-control mb-4 col-4" v-model="dataForm.url" required>

      </div>

      <p>Category: </p>
      <div class="form-group">
        <select class="form-control" v-model="dataForm.category.id">
          <option v-for="category in categories" :key="category.id" :value="category.id">{{ category.name }}</option>
        </select>
      </div>

      <div class="btn-group">
        <button type="submit" class="btn btn-success">{{ editMode ? 'Update' : 'Save' }}</button>
        <router-link class="btn btn-primary" to="/product"> Back</router-link>
      </div>
    </form>

  </div>
</template>
<script>
import CategoryClient from "@/client/CategoryClient";
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
        category: {
          id: ''
        }
      },
      categories: []
    }
  },
  mounted() {
    const productId = this.$route.params.id;
    if (productId) {
      this.editMode = true;
      this.getProductById(productId);
    }
    this.fetchCategories();
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
    fetchCategories() {
      CategoryClient.getCategories()
          .then(response => {
            this.categories = response.data;
          })
          .catch(error => {
            console.error('Error fetching categories:', error);
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
    handleImageChange(event) {
      const file = event.target.files[0];
      this.uploadImage(file);
    },

    uploadImage(file) {
      // Lấy id của sản phẩm từ dataForm
      const productId = this.dataForm.id;

      // Gọi phương thức uploadImage của ProductClient
      ProductClient.uploadImage(productId, file)
          .then(response => {
            // Lấy đường dẫn ảnh từ response và gán vào dataForm.url
            this.dataForm.url = response.data;
            console.log("Image uploaded successfully:", this.dataForm.url);
          })
          .catch(error => {
            console.error("Error uploading image:", error);
          });
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
.form-control{
  width: 300px;
}
</style>