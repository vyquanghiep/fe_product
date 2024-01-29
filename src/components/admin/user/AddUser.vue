<template>
  <div class="container">
    <div>
      <h1>{{ editMode ? 'Edit User' : 'Create New User' }}</h1>
    </div>
    <hr>
    <form action="#" @submit.prevent="formSubmit" method="POST">
      <div class="form-group">
        <input type="hidden" v-model="dataForm.id">
        <input type="text" placeholder="Name" class="form-control mb-4 col-4" v-model="dataForm.name" required>
      </div>

      <div class="form-group">
        <input type="text" placeholder="Email" class="form-control mb-4 col-4" v-model="dataForm.email" required>
      </div>

      <div class="form-group">
        <input type="password" placeholder="Password" class="form-control mb-4 col-4" v-model="dataForm.password" required>
      </div>

      <div class="form-group">
        <input type="text" placeholder="Phone" class="form-control mb-4 col-4" v-model="dataForm.phone" required>
      </div>

      <div class="btn-group">
        <button type="submit" class="btn btn-success">{{ editMode ? 'Update' : 'Save' }}</button>
        <router-link class="btn btn-primary" to="/user">Back</router-link>
      </div>
    </form>
  </div>
</template>

<script>

import UserClient from "@/client/UserClient";
import swal from "sweetalert2";


export default {
  data() {
    return {
      editMode: false,
      dataForm: {
        id: '',
        name: '',
        email: '',
        password: '',
        phone: ''
      }
    };
  },
  mounted() {
    const userId = this.$route.params.id;
    if (userId) {
      this.editMode = true;
      this.getUserById(userId);
    }
  },
  methods: {
    getUserById(userId) {
      UserClient.getUserById(userId)
          .then(response => {
            this.dataForm = response.data;
          })
          .catch(error => {
            console.error('Error fetching user data:', error);
          });
    },
    formSubmit() {
      if (this.editMode) {
        this.updateUser(this.dataForm)
            .then(() => {

              console.log('User updated successfully:', this.dataForm);
              this.navigateToUserPage();
              swal.fire({
                title: "Update!",
                text: "User has been update.",
                icon: "success",
                confirmButtonText: "OK",
                customClass: {
                  confirmButton: "btn btn-success",
                },
              });
            })
            .catch(error => {
              console.error('Error updating user:', error);
            });
      } else {
        this.addUser(this.dataForm)
            .then(() => {
              console.log('User added successfully:', this.dataForm);
              this.navigateToUserPage();
            })
            .catch(error => {
              console.error('Error adding user:', error);
            });
      }
    },

    updateUser(userData) {
      return UserClient.saveUser(userData)
          .then(() => {

            console.log('User updated successfully');
          })
          .catch(error => {
            console.error('Error updating user:', error);
            throw error;
          });
    },

    addUser(userData) {
      return UserClient.saveUser(userData)
          .then(response => {
            console.log('User added successfully:', response.data);
          })
          .catch(error => {
            console.error('Error adding user:', error);
            throw error;
          });
    },

    navigateToUserPage() {
      this.$router.push('/user');
    }

  }
};
</script>


<style scoped>

</style>
