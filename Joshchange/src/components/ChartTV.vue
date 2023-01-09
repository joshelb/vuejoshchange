<script setup>
    import { onUnmounted, onMounted, ref, inject } from 'vue';
    import { createChart } from 'lightweight-charts';
	const ws = inject('ws');

    let chart;
    const chartContainer = ref();

    onMounted(() => {
        var ref = this;
        const chartOptions = { height: 466 , width: 900, layout: { textColor: '#71649C', background: { type: 'solid', color: '#212529' } }, grid: {
            vertLines: { color: 'transparent' },
            horzLines: { color: 'transparent' },
        }, };
        chart = createChart(chartContainer.value,chartOptions);
				chart.priceScale().applyOptions({
    			borderColor: '#71649C',
				});
				chart.timeScale().applyOptions({
    			borderColor: '#71649C',
				});
        const candlestickSeries = chart.addCandlestickSeries();
        ws.addEventListener('message', function(evt) {
		    var received_msg = evt.data;
            var parsed=JSON.parse(received_msg);
            
            if (parsed["Stream"] == "candlesticksInit") {
                var data = parsed["Data"];
                var neww = [];
                data = data[0];
                for(let i = 0; i < data.length; i++) {
                    var time = new Date(data[i][0]);
                    var stamp =  Math.floor(time.getTime() / 1000);
                    
                var props= [
                    ["time",stamp],
                    ["open",data[i][1]],
                    ["high",data[i][2]],
                    ["low",data[i][3]],
                    ["close",data[i][4]]
                ];    
                var obj = Object.fromEntries(props);
                
                neww.push(obj);
                }
                candlestickSeries.setData(neww);
            }
            if (parsed["Stream"] == "candlesticks") {
                var data = parsed["Data"];
                data = data[0];    
                var time = new Date(data[0][0]);
                console.log(time)
                var stamp =  Math.floor(time.getTime() / 1000);
                var props= [
                    ["time",stamp],
                    ["open",data[0][1]],
                    ["high",data[0][2]],
                    ["low",data[0][3]],
                    ["close",data[0][4]]
                ];    
                var obj = Object.fromEntries(props);
                console.log(obj)
                candlestickSeries.update(obj);
            }
        });

		chart.timeScale().fitContent();


    });

    onUnmounted(() => {
        if (chart) {
            chart.remove();
            chart = null;
        }
    });

</script>
<template>
    <div class="lw-chart" ref="chartContainer"></div>
</template>
<style scoped>
    .lw-chart {
        height: 100%;
    }
</style>
