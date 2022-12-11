<script>
export default{ 
  methods: {
    submitForm(side) {
      this.$formkit.get("side").input(side)
      this.$formkit.submit('limitForm')
    },
    submitHandler(data) {
      var params = this.$route.params;
      var order = {Symbol:params["symbol"],Side:data.side,Ordertype:"limit",Quantity:parseFloat(data.quantity),Price:parseFloat(data.price)};
      let xhr = new XMLHttpRequest();
      let url = "http://localhost:8080/order";
      xhr.open("POST",url,true);
      xhr.setRequestHeader("Content-Type", "application/json");
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
  @Submit= "submitHandler"
>
  <FormKit
    type = "text"
    name = "quantity"
    id = "quantity"
    label = "Size"
    placeholder="Bid"
  />

  <FormKit
    type = "text"
    name = "price"
    id = "price"
    label = "Price"
  />
  <FormKit
    name="side"
    id="side"
    type="hidden"
    value="Buy"
  />
</FormKit>

<button type = 'button' @click='submitForm("buy")'>BUY</button>
<button type = 'button' @click='submitForm("sell")'>SELL</button>

</template>
