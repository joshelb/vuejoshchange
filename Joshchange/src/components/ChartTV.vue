<script setup>
    import { onUnmounted, onMounted, ref, inject} from 'vue';
    import { createChart } from 'lightweight-charts';
    import ResizeSensor from "resize-sensor";
	const ws = inject('ws');
    const chartContainer = ref();
    let chart;

    onMounted(() => {
        var ref = this;
        const chartOptions = { height: 0, width: 0,layout: { textColor: '#71649C', background: { type: 'solid', color: '#2d3436' } }, grid: {
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
				})
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
        new ResizeSensor(document.getElementsByClassName('lw-chart'), event => {
            chart.resize(document.getElementById("charttv").offsetWidth, document.getElementById("charttv").offsetHeight)
        })
        ws.addEventListener('message', function(evt) {
		    var received_msg = evt.data;
            var parsed=JSON.parse(received_msg);
            
            if (parsed["Stream"] == "candlesticksInit") {
                var data = parsed["Data"];
                var neww = [];
                data = data[0];
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
    <div style="height:100%;">
    <div class="card-header bg-dark" style="color:azure;">
        Chart
    </div>
    <a>
    <div class="lw-chart" id="charttv"  ref="chartContainer"></div>
    </a>
    </div>
</template>
<style scoped>
    .lw-chart {
        height: 90%;
        width: 100%;
    }
</style>
