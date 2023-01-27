<template>
	<div class= "container-test" style="height: 100%;">
      		<OrderBookAsks/>
	</div>

</template>

<script>
import axios from 'axios';
import OrderBookBids from "./Orderbook.vue";
import OrderBookAsks from "./OrderbookAsks.vue";
import Trades from "./Trades.vue"

export default {
  name: "Trade",
  components: {
		OrderBookBids,
		OrderBookAsks,
		Trades,
		
  },
	methods: {
		setOrderbookData(data, sideBid,sideAsk) {
				const rowDataBids = [];
				const rowDataAsks = [];
    		const bids = data["bids"]["prices"];
				const asks = data["asks"]["prices"];
    		for (var key in bids) {
      		var quantity = bids[key]["volume"];
      		var row = {bids: quantity,price: key};
      		rowDataBids.push(row);
    		}
				for (var key in asks) {
          var quantity = asks[key]["volume"];
          var row = {asks: quantity,price: key};
          rowDataAsks.push(row);
        }
				sideBid.setData(rowDataBids);
				sideAsk.setData(rowDataAsks);
		}
		

	},
	created () {

	}
};
</script>
<style>


 </style>
