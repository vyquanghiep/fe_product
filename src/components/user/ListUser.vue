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

    deleteUser(userId) {
      UserClient.deleteUser(userId)
          .then(() => {
            this.getUsers();
          })
          .catch(error => {
            console.error(error);
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
