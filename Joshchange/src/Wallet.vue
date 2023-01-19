<template>
<NavbarHome/>
<div class="row">
<div class="col">
<div class="container2">
<div class="card bg-dark text-white"  style="width: 100%;">
<div class="card-header">
<div class="row">
    <div class="col"></div>
    <div class="col">  <p style="color: grey;">Asset:</p></div>
    <div class="col"> <p style="color: grey;">Available Balance:</p></div>
    <div class="col"> <p style="color: grey;">Balance:</p></div>
    <div class="col"></div>
    <div class="col"></div>

</div>
</div>
<div v-for="item in items">
<div class="row">
    <div class="col"><img :src= item.url style="width: 60px;"> </div>
    <div class="col"> <p style="color: gold;">{{ item.asset }}</p> </div>
    <div class="col"> {{ item.availablewalletbalance }}</div>
    <div class="col"> {{ item.walletbalance }}</div>
    <div class="col"> <button class="btn btn-warning">Deposit</button></div>
    <div class="col"> <button class="btn btn-light">Withdraw</button></div>
</div>
</div>

</div>
</div>
</div>
<div class="col">
    <div class="container2">
    <ag-charts-vue
        style="height: 500px"
        :options="options">
    </ag-charts-vue>
    </div>
</div>
</div>
</template>
<script>
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-balham.css";
import axios from 'axios';
import { AgGridVue } from "ag-grid-vue3";
import { AgChartsVue } from 'ag-charts-vue3';
import { Logger } from "ag-grid-community";
import { parse } from '@vue/compiler-dom';
import NavbarHome from './components/NavbarHome.vue';
export default {
    inject: ['ws'],
  components: {
    NavbarHome,
    AgChartsVue,
  },
	data() {
      return {
				isAuthenticated: false,
                items: [],
                options: null,
      }
	},    
    methods: {
        setData(data){
            data = data["WalletBalances"];
            var res = [];
            for(let key in data) {
                var url = "/src/assets/" + key + ".jpg" 
                var row = {asset: key, availablewalletbalance: data[key][0], walletbalance: data[key][1], url:url};
                res.push(row);
            }
            this.items = res;

        },
        setDataChart(data) {
            data = data["WalletBalances"];
            var res = [];
            for(let key in data) {
                console.log(data)
                var row = {label: key, value:10};
                res.push(row);
            }
            this.options.data = res;

        }


    },
  mounted () {
    if (localStorage.getItem('access_token') && localStorage.getItem('id_token') && localStorage.getItem('expires_at')) {
    let expiresAt = JSON.parse(localStorage.getItem('expires_at'));
    this.isAuthenticated = new Date().getTime() < expiresAt;
    }
    var ref = this;
    var ws = this.ws;
    var params = this.$route.params;
	var msg = {Type: "subscribe", Stream: "walletData", Symbol: params["symbol"], Timeframe: "hrqe", Aggregation: "qrehg", Email: localStorage.getItem('email')}	 
    		ws.onopen= () => {ws.send(JSON.stringify(msg))}
    console.log(ws)
    ws.addEventListener('message', function(evt) {
	var received_msg = evt.data;
    var parsed=JSON.parse(received_msg);
    if (parsed["Stream"] == "walletData") {
        ref.setData(parsed["Data"])
        ref.setDataChart(parsed["Data"])
    }
    });


  },
    created() {
    this.options = {
      theme: 'ag-default-dark',  
      data: [],
      series: [
        {
          type: 'pie',
          angleKey: 'value',
          calloutLabelKey: 'label',
          sectorLabelKey: 'value',
          sectorLabel: {
            color: 'white',
            fontWeight: 'bold',
          },
        },
      ],
    };
  },
  };


</script>
<style>

.container2 {
    margin-top: 20px;
}


</style>