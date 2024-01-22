<template>

<nav class="navbar navbar-expand-sm navbar-dark bg-dark">
  <div class="container">
    <ul class="navbar-nav">
        <li class="nav-item">
          <router-link class="nav-link" to="/product">Product</router-link>
        </li>
        <li class="nav-item">
          <router-link class="nav-link" to="/user">User</router-link>
        </li>
        <li class="nav-item">
          <router-link class="nav-link" to="/homepage">Home Page</router-link>
        </li>
        <li class="nav-item">
          <router-link class="nav-link" to="/cart">CartProduct</router-link>
        </li>
    </ul>
    <ul class="navbar-nav ml-auto">
      <li class="nav-item">
        <router-link class="login-btn btn btn-outline-success my-2 my-sm-0 " to="/login">
          Login
        </router-link>
      </li>
    </ul>
  </div>
</nav>

<router-view></router-view>

</template>
<script>

</script>
<style>

</style>