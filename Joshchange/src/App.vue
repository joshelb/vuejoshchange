<script>
import OrderbookBids from "./components/Orderbook.vue";
import OrderbookAsks from "./components/OrderbookAsks.vue";
import Topbarmenu from "./components/Navbar.vue";
import Chart from "./components/Chart.vue";
export default {
name: 'App',
  components: {
    OrderbookBids,
		OrderbookAsks,
		Topbarmenu,
		Chart,
  }
}

</script>
<template>
	<Chart/>
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

#page {
	position:relative;

}



</style>
