<template>
  <div>
    <button @click="login">Log in</button>
  </div>
</template>

<script>
import auth from "../authconf.js"
  export default {
    methods: {
      login() {
        auth.authorize();
      }
    }
  };
</script>
