<template>
	<div id="chart">
 		<apexchart type="candlestick" height="350" :options="chartOptions" :series="series"></apexchart>
  </div>
</template>
<script>
import VueApexCharts from 'vue3-apexcharts';
export default {
	name: "App",
	components: {
		apexchart: VueApexCharts,
	},
	data (){
		return {
			series: [],
	chartOptions: {
  	chart: {
    	type: 'candlestick',
      height: 350
    },
   	title: {
    	text: 'CandleStick Chart',
      align: 'left'
    },
    xaxis: {
    	type: 'datetime'
    },
   	yaxis: {
    	tooltip: {
      	enabled: true
      }
    }
	},

	}

	},
	methods: {
		setCandlestickData() {
			axios.get()



	}



	},
	created () {
		this.setCandlestickData()	


	},
	

}
</script>
