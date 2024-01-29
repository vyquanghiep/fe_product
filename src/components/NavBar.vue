<template>

  <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
    <div class="container">
    <a class="navbar-brand" href="#">Shop</a>
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>

    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav mr-auto">
        <li class="nav-item">
          <router-link class="nav-link" to="/">Trang chủ</router-link>
        </li>
        <li class="nav-item">
          <router-link class="nav-link" to="/product">QL Sản phẩm</router-link>
        </li>
        <li class="nav-item">
          <router-link class="nav-link" to="/user">QL Người dùng</router-link>
        </li>
        <li class="nav-item">
          <router-link class="nav-link" to="/cart">Giỏ hàng</router-link>
        </li>

      </ul>
      <form class="form-inline my-2 my-lg-0">
        <router-link class="login-btn btn btn-outline-success my-2 my-sm-0 " to="/login">
          Login
        </router-link>
      </form>
    </div>
    </div>
  </nav>


<router-view></router-view>

</template>
<script>

</script>
<style>

</style>