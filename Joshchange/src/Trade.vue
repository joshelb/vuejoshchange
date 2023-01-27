<script>
import OrderbookBids from "./components/Orderbook.vue";
import OrderbookAsks from "./components/OrderbookAsks.vue";
import OrderBook from "./components/OrderbookComponent.vue";
import Topbarmenu from "./components/Navbar.vue";
import ChartTV from "./components/ChartTV.vue";
import TradingPanel from "./components/Tradingpanel.vue"
import Trades from "./components/Trades.vue"
import Orders from "./components/Orders.vue"
import Discord from "./components/DiscordComponent.vue"
import PairData from "./components/PairData.vue"
import TestX from "./components/Login.vue"
import { GridLayout, GridItem } from "vue-grid-layout"
export default {
name: 'Trade',
  components: {
		GridLayout,
		GridItem,
		OrderBook,
		Topbarmenu,
		ChartTV,
    TradingPanel,
		Orders,
		Trades,
		Discord,
		PairData,
		TestX,
  },
  data() {
	return {
		layout: [
			 {"x":0,"y":0,"w":2,"h":2,"i":"0", static: false},
		],
		draggable: true,
        resizable: true,
		index:0
	}
  },

  created () {
  }
}
</script>
<template>
<Topbarmenu/>


<div class="container-fluid">
		<div class="row top-buffer">
			<PairData/>
		</div>
		<TestX style="height:100%; width:100%;"></TestX>
</div>
</template>

<style scoped>
.top-buffer { margin-top:20px; }
</style>
