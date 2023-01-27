<template>
  <span class="button">
    <button type="button" @click="btnClickedHandler()"  class="" style="width:80px; height:25px; background-color: #dc3545;">Cancel</button>
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
            let url = "https://www.joshchange.website/cancel";
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

.button {
	display:block;
	text-align:center;
}

 </style>