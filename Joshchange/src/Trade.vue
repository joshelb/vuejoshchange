<script>
import OrderbookBids from "./components/Orderbook.vue";
import OrderbookAsks from "./components/OrderbookAsks.vue";
import OrderBook from "./components/OrderbookComponent.vue";
import Topbarmenu from "./components/Navbar.vue";
import ChartTV from "./components/ChartTV.vue";
import TradingPanel from "./components/Tradingpanel.vue"
import Trades from "./components/Trades.vue"
import Orders from "./components/Orders.vue"
export default {
name: 'Trade',
  components: {
		OrderBook,
		Topbarmenu,
		ChartTV,
    TradingPanel,
		Orders,
		Trades,
  },


  created () {
  }
}
</script>
<template>
<Topbarmenu/>
<div class="container-fluid">
		<div class="row top-buffer">
				<div class = "col-xl">
					<OrderBook/>
				</div>
				<div class="col-xl">
					<div class="card text-bg-dark" style="border-radius: 0px!important;">
  					<div class="card-body">
							<ChartTV/>
  					</div>
					</div>
				</div>
		</div>
		<div class="row top-buffer">
			<div class="col-md">
				<TradingPanel/>
			</div>
			<div class="col-md">
				<Orders/>
			</div>
		</div>
</div>
</template>

<style scoped>
.top-buffer { margin-top:20px; }
</style>
