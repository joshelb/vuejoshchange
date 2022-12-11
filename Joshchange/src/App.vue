<script>
import OrderbookBids from "./components/Orderbook.vue";
import OrderbookAsks from "./components/OrderbookAsks.vue";
import Topbarmenu from "./components/Navbar.vue";
import Chart from "./components/Chart.vue";
export default {
name: 'Trade',
  components: {
    OrderbookBids,
		OrderbookAsks,
		Topbarmenu,
		Chart,
  }
}

</script>
<template>
<router-view />

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
