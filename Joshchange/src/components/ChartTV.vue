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
        },        
            timeScale: {
            timeVisible: true,
            secondsVisible: false,
        }, 
        };

        chart = createChart(chartContainer.value,chartOptions);
				chart.priceScale().applyOptions({
    			borderColor: '#71649C',
				});
				chart.timeScale().applyOptions({
                barSpacing: 1,
    			borderColor: '#71649C',
				});
        const candlestickSeries = chart.addCandlestickSeries({
              fillUpCandle: true,
            fillDownCandle: true,
            priceFormat: {
                type: 'price',
                precision: 6,
                minMove: 0.000001,
            },
        }
        );
        ws.addEventListener('message', function(evt) {
		    var received_msg = evt.data;
            var parsed=JSON.parse(received_msg);
            
            if (parsed["Stream"] == "candlesticksInit") {
                var data = parsed["Data"];
                var neww = [];
                data = data[0];
                console.log(data)
                for(let i = 0; i < data.length; i++) {
                var times =  parseInt(data[i][0]);
                var date = new Date(times * 1000);
                var props= [
                    ["time",times],
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
                var times =  parseInt(data[0][0]);
                var date = new Date(times * 1000);
                var props= [
                    ["time",times],
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
