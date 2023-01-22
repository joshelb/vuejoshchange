<template>
<nav class="navbar navbar-expand-lg bg-dark">
  <div class="container-fluid">
    <a class="navbar-brand" href="/">
    <img src="/src/assets/alpha2.jpg" style="width: 400px;">
    </a>
  <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav mr-auto" sytle="padding-right: 10px;">
        <li class="nav-item">
          <div class="container" v-if="isAuthenticated==false">
          </div>
          <div class="container" v-if="isAuthenticated==true">
            <a class="nav-link" aria-current="page" style="color: grey;" href="/wallet">Wallet</a>
          </div>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="/markets" style="color: grey;" >Markets</a>
        </li>
      </ul>

    </div>
    <ul class="navbar-nav mr-auto" sytle="padding-right: 10px;">
    <li>
      <div class="container" v-if="isAuthenticated==false">
      <a @click="login" class="btn btn-warning text-white"> Login</a>
      </div>
      <div class="container" v-if="isAuthenticated==true">
      <a @click="logout" class="btn btn-warning text-white"> Logout</a>
      </div>

    </li>
          <li class="nav-item">
          <div class="container" v-if="isAuthenticated==false">
          </div>
          <div class="container" v-if="isAuthenticated==true">
            <a class="nav-link" aria-current="page" style="color: grey;" href="/profile">Profile</a>
          </div>
        </li>
    </ul>
  </div>
</nav>
</template>

<script>
import $ from 'jquery'
import { onMounted } from 'vue';

import auth from "../authconf.js"
import { logouthelp } from "../authconf.js"
  export default {
	data() {
      return {
				isAuthenticated: false,
      }
	},    
    methods: {
      login() {
        auth.authorize();
      },
      logout() {
        logouthelp();
        auth.logout();
      }
    },
  mounted () {
    if (localStorage.getItem('access_token') && localStorage.getItem('id_token') && localStorage.getItem('expires_at')) {
    let expiresAt = JSON.parse(localStorage.getItem('expires_at'));
    this.isAuthenticated = new Date().getTime() < expiresAt;
    }


  }
  };

</script>

