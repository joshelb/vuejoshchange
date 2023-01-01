<template> 
<div class="sidebar">
<div class="card text-bg-dark" style="border-radius: 0px!important;">
<div class="card-header">
	<input type="radio" class="btn-check" name="options" id="option3" autocomplete="off" @click="handle('active')" checked>
	<label class="btn btn-dark btn-sm" for="option3">Active-Orders</label>
	<input type="radio" class="btn-check" name="options" id="option4" autocomplete="off" @click="handle('history')">
	<label class="btn btn-dark btn-sm" for="option4">Order-History</label>
    <input type="radio" class="btn-check" name="options" id="option5" autocomplete="off" @click="handle('tradehistory')">
	<label class="btn btn-dark btn-sm" for="option5">Trade-History</label>
</div>
  <div class="card-body" style="background-color: #404040;">
		<div class="container" v-if="type == 'active'" id="orderforms">
            <ActiveOrders/>
		</div>
		<div class="container" v-if="type == 'history'" id="orderforms">
            <OrderHistory/>
  	</div>
    <div class="container" v-if="type == 'tradehistory'" id="orderforms">
            <TradeHistory/>
		</div>
	</div>
</div>



</div>

</template>
<script>

import ActiveOrders from "./ActiveOrders.vue";
import OrderHistory from "./OrderHistory.vue";
import TradeHistory from "./TradeHistory.vue";
export default {
  name: 'Trade',
  components: {
    ActiveOrders,
    OrderHistory,
    TradeHistory,
  },
	data() {
      return {
		type: "active",
        selected: 'radio1',
        options: [
          { text: 'Radio 1', value: 'radio1' },
          { text: 'Radio 3', value: 'radio2' },
          { text: 'Radio 3 (disabled)', value: 'radio3', disabled: true },
          { text: 'Radio 4', value: 'radio4' }
        ]
      }
	},
	methods: {
		handle(type) {
			if(type == "active") {
				this.type="active"
			}
			if(type == "history") {
				this.type="history"
			}
            if(type == "tradehistory") {
                this.type="tradehistory"
            }

		}
	}
}


</script>
<style>
.btn-dark{
border-radius: 0px!important;
}
#orderforms{
gap:10%;
}
</style>