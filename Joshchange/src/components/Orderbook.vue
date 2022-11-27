<template>
  <h3>Orderbook</h3>
  <div id="app">
    <v-grid
      theme="compact"
      :source="rows"
      :columns="columns"
    ></v-grid>
  </div>
</template>
<script>
import VGrid from "@revolist/vue3-datagrid";
export default {
  name: "App",
  data() {
    return{
      columns: [{ prop: "bids"}, { prop: "price"}],
      rows: [{bids:"1441", price: "wegwh"},]
    };
  },
  components: {
    VGrid,
  
  },
  methods: {
    update: function() {
      setInterval(updateOrderbookBids,1000)
      async function updateOrderbookBids() {
        const rows = [];
        const response = await fetch("http://localhost:8080/orderbook/btcusd");
        const data = await response.json();
        const bids = data["bids"]["prices"];
        for(var key in bids) {
          var quantity = bids[key]["volume"];
          var row = {bids: quantity, price: key};
          rows.push(row);
        }
        this.rows = rows;
      }
    }
  }
}
</script>
<style></style>
