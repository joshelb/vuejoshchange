<template>
	<div id="myGridasks" style="height:100%">
  <ag-grid-vue
	id="asks"
	:style="{width, height}"
    class="ag-theme-balham-dark"
    :columnDefs="columnDefs"
		@grid-ready="onGridReady"
    :rowData="rowData"
    :getRowId="getRowId"
  >
  </ag-grid-vue>
  </div>
</template>

<script>
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-balham.css";
import axios from 'axios';
import { AgGridVue } from "ag-grid-vue3";
import { Logger, RowHighlightPosition } from "ag-grid-community";
import ResizeSensor from "resize-sensor";
import { time } from "@formkit/inputs";

export default {
	inject: ['ws'],
  name: "Trade",
  components: {
    AgGridVue,
  },
  setup() {
    return {
		height: '100%',
      width: '100%',
      columnDefs: [
        { field: "asks", headerName: 'Size',enableCellChangeFlash:true},
        { field: "price", cellStyle: {color: 'red',},  headerName: 'Price'},
      ],
      gridApi: null,
  		sizeColumnsToFit: true,
      columnApi: null,
      rowData: [],
    };
  },
	methods: {
		getApi(){
			return this.gridApi;
		},
		onGridReady(params){
		  this.gridApi = params.api;
		  
      this.gridColumnApi = params.columnApi;
			this.gridApi.sizeColumnsToFit()
			params.api.setRowData([]);
		},
		setOrderbookData(data) {
				const rowDataAsks = [];
    		const asks = data["asks"]["prices"];
    		for (var key in asks) {
      		var quantity = asks[key]["volume"];
      		var row = {asks: quantity,price: key};
      		rowDataAsks.push(row);
    		}
			rowDataAsks.sort((a, b) => {
          		return a.price - b.price;
        	});
				var params = {};
				this.gridApi.setRowData(rowDataAsks);
		},
		onWindowResize() {
    	if (this.gridApi) {
      	this.gridApi.sizeColumnsToFit();

    	}
		}

	},
	created () {
		this.getRowId = params => params.data.price;
	},
	mounted (){
    var ref = this;
	var params = this.$route.params;
    var ws = this.ws;
	
		var msg = {Type: "subscribe", Stream: "orderbook", Symbol: params["symbol"], Timeframe: "hrqe", Aggregation: "qrehg", Email: "ewg"}
		var msg2 = {Type: "subscribe", Stream: "trades", Symbol: params["symbol"], Timeframe: "hrqe", Aggregation: "qrehg", Email: "ewg"}
		var msg3 = {Type: "subscribe", Stream: "userData", Symbol: params["symbol"], Timeframe: "hrqe", Aggregation: "qrehg", Email: localStorage.getItem('email')}	
		var msg4 = {Type: "subscribe", Stream: "pairData", Symbol: params["symbol"], Timeframe: "hrqe", Aggregation: "qrehg", Email: "ewg"} 
		var msg5 = {Type: "subscribe", Stream: "candlesticksInit", Symbol: params["symbol"], Timeframe: "hrqe", Aggregation: "qrehg", Email: "ewg"}  
		var msg6 = {Type: "subscribe", Stream: "candlesticks", Symbol: params["symbol"], Timeframe: "hrqe", Aggregation: "qrehg", Email: "ewg"}
		console.log(ws)
		ws.onopen= () => {ws.send(JSON.stringify(msg)), ws.send(JSON.stringify(msg2)), ws.send(JSON.stringify(msg3)), ws.send(JSON.stringify(msg4)), ws.send(JSON.stringify(msg5)), ws.send(JSON.stringify(msg6))}
		
		ws.addEventListener('message', function(evt) {
			var received_msg = evt.data;
      var parsed=JSON.parse(received_msg);
      if (parsed["Stream"] == "orderbook") {
        ref.setOrderbookData(parsed["Data"])
      }
		});
		window.addEventListener('resize', this.onWindowResize);
		var container = document.getElementById("all");
		console.log(container)
		var sensor = new ResizeSensor(container, function() {
    		ref.onWindowResize;
		});

		setInterval(ref.onWindowResize,100);

	}
};
</script>
<style>
.ag-theme-alpine {
    --ag-grid-size: 3px;
    --ag-list-item-height: 20px;
}


 </style>
