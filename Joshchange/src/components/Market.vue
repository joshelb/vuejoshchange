<script>
export default{ 
  methods: {
    submitForm(side) {
      this.$formkit.get("side").input(side)
      this.$formkit.submit('marketForm')
    },
    submitHandler(data) {
      var params = this.$route.params;
      var order = {Symbol:params["symbol"],Side:data.side,Ordertype:"market",Quantity:parseFloat(data.quantity),Price:1};
      let xhr = new XMLHttpRequest();
      let url = "https://joshchange.website/order";
      xhr.open("POST",url,true);
      xhr.setRequestHeader("Content-Type", "application/json");
      var s = 'Bearer ' + localStorage.getItem('access_token');
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
  id = "marketForm"
  :actions="false"
  @Submit= "submitHandler"
>
  <FormKit
    type = "text"
    name = "quantity"
    id = "quantity"
    label = "Size"
  />

  <FormKit
    name="side"
    id="side"
    type="hidden"
    value="Buy"
  />
</FormKit>

<button type = 'button' @click='submitForm("buy")' class="btn btn-success" style=" --bs-btn-padding-y: .50rem; --bs-btn-padding-x: .50rem; --bs-btn-font-size: .75rem; width:100px; border-radius: 0px!important;">Buy</button>
<button type = 'button' @click='submitForm("sell")' class="btn btn-danger" style=" --bs-btn-padding-y: .50rem; --bs-btn-padding-x: .50rem; --bs-btn-font-size: .75rem; width:100px; border-radius: 0px!important;">Sell</button>

</template>
