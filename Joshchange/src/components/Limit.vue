<script>
import auth from "../authconf.js"
export default{ 
  methods: {
    submitForm(side) {
      this.$formkit.get("sidee").input(side)
      this.$formkit.submit('limitForm')
    },
    submitHandler(data) {
      var params = this.$route.params;
      var order = {Symbol:params["symbol"],Side:data.side,Ordertype:"limit",Quantity:parseFloat(data.quantity),Price:parseFloat(data.price)};
      let xhr = new XMLHttpRequest();
      let url = "http://localhost:8080/order";
      xhr.open("POST",url,true);
      xhr.setRequestHeader("Content-Type", "application/json");
			var s = 'Bearer ' + localStorage.getItem('access_token')
			console.log(s)
			xhr.setRequestHeader('Authorization', s);
      var data = JSON.stringify(order);
      console.log(data)
      xhr.send(data);
    }


  },

}

</script>

<template>

<FormKit 
  type="form" 
  id = "limitForm"
  :actions="false"
	:config="{
		classes: {
			label: 'super-red'
		}
	}"
  @Submit= "submitHandler"
>
  <FormKit
    type = "text"
    name = "quantity"
    id = "quantity"
    label = "Size"
  />

  <FormKit
    type = "text"
    name = "price"
    id = "price"
    label = "Price"
  />
  <FormKit
    name="side"
    id="sidee"
    type="hidden"
    value="Buy"
  />
</FormKit>

<button type = 'button' @click='submitForm("buy")' class="btn btn-success" style=" --bs-btn-padding-y: .50rem; --bs-btn-padding-x: .50rem; --bs-btn-font-size: .75rem; width:100px; border-radius: 0px!important;">Buy</button>
<button type = 'button' @click='submitForm("sell")' class="btn btn-danger" style=" --bs-btn-padding-y: .50rem; --bs-btn-padding-x: .50rem; --bs-btn-font-size: .75rem; width:100px; border-radius: 0px!important;">Sell</button>

</template>
<style>

.formkit-inner {
}
[data-type="text"] input {
  background: grey;
	max-width: 200px;
}
.btn-success{
	margin-top:20px;
	margin-right: 20px;
}
.btn-danger{
	margin-top:20px;
}
</style>
