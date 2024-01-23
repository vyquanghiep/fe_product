<template>
  <div class="container">
    <div>
      <h1>User Management</h1>
    </div>
    <router-link class="btn btn-success" to="/user/add">Add User</router-link>
    <hr>

    <form @submit.prevent="searchUsers" method="get">
      <input type="text" v-model="searchKeyword" placeholder="Tìm kiếm user" size="50">
      <button type="submit" class="btn btn-info">Search</button>
      <a class="btn btn-info" @click="resetSearch">Reset</a>
    </form>
    <table class="table table-bordered">
      <thead class="table-dark">
      <tr>
        <th>UserId</th>
        <th>Name</th>
        <th>Email</th>
        <th>Password</th>
        <th>Phone</th>
        <th>Action</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="item in user" :key="item.id">
        <td>{{ item.id }}</td>
        <td>{{ item.name }}</td>
        <td>{{ item.email }}</td>
        <td>{{ item.password }}</td>
        <td>{{ item.phone }}</td>
        <td>
          <div class="btn-group">
            <router-link :to="`/user/add/${item.id}`" class="btn btn-warning mr-2">Edit</router-link>
            <a class="btn btn-danger" @click="deleteUser(item.id)">Delete</a>
          </div>
        </td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import UserClient from "@/client/UserClient";
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
      user: [],
      searchKeyword: ''
    };
  },
  mounted() {
    this.getUsers();
  },

  methods: {
    getUsers() {
      UserClient.getUsers()
          .then(response => {
            this.user = response.data;
          })
          .catch(error => {
            console.error(error);
          });
    },


    deleteUser(id) {
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

          UserClient.deleteUser(id)
              .then(() => {
                swalWithBootstrapButtons.fire({
                  title: "Deleted!",
                  text: "Your User has been deleted.",
                  icon: "success"
                });
                this.getUsers();
              })
              .catch(error => {
                console.error(error);
              });
        } else if (result.dismiss === Swal.DismissReason.cancel) {

          swalWithBootstrapButtons.fire({
            title: "Cancelled",
            text: "Your User is safe !",
            icon: "error"
          });
        }
      });
    },
    searchUsers() {
      if (this.searchKeyword.trim() !== '') {
        UserClient.searchUsers(this.searchKeyword)
            .then(response => {
              this.user = response.data;
            })
            .catch(error => {
              console.error(error);
            });
      }
    },

    resetSearch() {
      this.searchKeyword = '';
      this.getUsers();
    }
  },
};
</script>

<style scoped>

</style>
