<template>
  <span>
    <button @click="btnClickedHandler()"  class="btn btn-danger btn-sm" style="width:80px;">Cancel</button>
  </span>
</template>

<script>
  export default {
    name: 'BtnCellRenderer',
    mounted() {
    },
    methods: {
        btnClickedHandler() {
            var params = this.$route.params;
            var order = {Symbol:params["symbol"],OrderID: this.params.value};
            let xhr = new XMLHttpRequest();
            let url = "https://joshchange.website/cancel";
            xhr.open("POST",url,true);
            xhr.setRequestHeader("Content-Type", "application/json");
			var s = 'Bearer ' + localStorage.getItem('access_token')
			xhr.setRequestHeader('Authorization', s);
            var data = JSON.stringify(order);
            xhr.send(data);
        }
    },
  };
</script>
<style>

 </style>