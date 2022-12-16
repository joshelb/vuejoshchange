<template> 
<div class="sidebar">
<div class="card text-bg-dark" style="border-radius: 0px!important;">
<div class="card-header">
	<input type="radio" class="btn-check" name="options" id="option1" autocomplete="off" @click="handleclick('limit')" checked>
	<label class="btn btn-dark btn-sm" for="option1">Limit</label>
	<input type="radio" class="btn-check" name="options" id="option2" autocomplete="off" @click="handleclick('market')">
	<label class="btn btn-dark btn-sm" for="option2">Market</label>
</div>
  <div class="card-body" style="background-color: #404040;">
		<div class="container" v-if="type == 'limit'" id="orderforms">
			<Limit/>
		</div>
		<div class="container" v-if="type == 'market'" id="orderforms">
      <Market/>
  	</div>
	</div>
</div>



</div>

</template>
<script>

import Limit from "./Limit.vue";
import Market from "./Market.vue";
export default {
  name: 'Trade',
  components: {
    Limit,
		Market,
  },
	data() {
      return {
				type: "limit",
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
		handleclick(type) {
			if(type == "limit") {
				this.type="limit"
			}
			if(type == "market") {
				this.type="market"
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
