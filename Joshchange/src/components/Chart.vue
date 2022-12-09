<template>
	<select name="timeframes" id="timeframes" @change="change_CandlestickData($event)">
  	<option value="1min">1 minute</option>
  	<option value="5min" selected>5 minute</option>
  	<option value="15min">15 minute</option>
  	<option value="30min">30 minute</option>
		<option value="1h">1 hour</option>
		<option value="4h">4 hour</option>
		<option value="1d">1 day</option>
	</select>
	<div id="chart">
 		<apexchart type="candlestick" height="350" :options="chartOptions" :series="series"></apexchart>
  </div>
</template>
<script>
import axios from 'axios';
import VueApexCharts from 'vue3-apexcharts';
export default {
	name: "Trade",
	components: {
		apexchart: VueApexCharts,
	},
	data (){
		return {
			series: [{data:[]}],
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
	currentTimeframe : "",

	}

	},
	methods: {
		get_CandlestickData(symbol,timeframe) {
			var url = 'http://localhost:8080/candlesticks/' + symbol + "/" + timeframe;
			console.log(url)
			axios.get(url).then(({ data }) =>
			{
	   		this.series = [{
    			data: []
   			}]
				console.log(data)
			});
		},
		change_CandlestickData(event) {
			var params = this.$route.params;
			clearInterval(this.currentTimeframe);
			this.get_CandlestickData(params["symbol"],event.target.value)
			var refreshIntervalId = setInterval(() => this.get_CandlestickData(params["symbol"],event.target.value),500);
    	this.currentTimeframe = refreshIntervalId;
		}
	},
	created () {
		var params = this.$route.params;
		this.get_CandlestickData(params["symbol"],"5min")
		var refreshIntervalId = setInterval(() => this.get_CandlestickData(params["symbol"],"5min"),500);
		this.currentTimeframe = refreshIntervalId;

	},
	

}
</script>
