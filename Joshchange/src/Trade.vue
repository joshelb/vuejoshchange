<script>
import OrderbookBids from "./components/Orderbook.vue";
import OrderbookAsks from "./components/OrderbookAsks.vue";
import Topbarmenu from "./components/Navbar.vue";
import Chart from "./components/Chart.vue";
import TradingPanel from "./components/Tradingpanel.vue"
export default {
name: 'Trade',
  components: {
    OrderbookBids,
		OrderbookAsks,
		Topbarmenu,
		Chart,
    TradingPanel,
  }
}

</script>
<template>
  <header>
    <img src="./assets/JoshchangeLogo.png" style="width:20em; height:5em;" />
	</header>
    <div class = "TradingPanel">
    <TradingPanel/>
    </div>
    <div id="chart">
	    <Chart/>
    </div>
		<div class="orderbook-container">
			<div class="orderbook-child bids"><OrderbookAsks/></div>
			<div class="orderbook-child asks"><OrderbookBids/></div>
		</div>

</template>

<style scoped>

.orderbook-container {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: 20px;
		position: relative;
		right: 0;
}

.orderbook-child {
} 

.chart{

}



</style>
