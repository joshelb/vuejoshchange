<template>
  <ag-grid-vue
    style="height: 500px"
    class="ag-theme-balham-dark"
    :columnDefs="columnDefs"
		@grid-ready="onGridReady"
    :rowData="rowData"
    :getRowId="getRowId"
  >
  </ag-grid-vue>
</template>

<script>
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-balham.css";
import axios from 'axios';
import { AgGridVue } from "ag-grid-vue3";

export default {
	inject: ['ws'],
  name: "Trade",
  components: {
    AgGridVue,
  },
  setup() {
    return {
      columnDefs: [
        { field: "asks", headerName: 'Size'},
        { field: "price", cellStyle: {color: 'red',},  headerName: 'Price'},
      ],
      gridApi: null,
  		sizeColumnsToFit: true,
      columnApi: null,
      rowData: [],
    };
  },
	methods: {
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
    var ws = this.ws;
		var msg = {Type: "subscribe", Stream: "orderbook", Symbol: "btcusd", Timeframe: "hrqe", Aggregation: "qrehg"}
		var msg2 = {Type: "subscribe", Stream: "trades", Symbol: "btcusd", Timeframe: "hrqe", Aggregation: "qrehg"}
		console.log(ws)
		ws.onopen= () => {ws.send(JSON.stringify(msg)), ws.send(JSON.stringify(msg2))}
		ws.addEventListener('message', function(evt) {
			var received_msg = evt.data;
      var parsed=JSON.parse(received_msg);
      if (parsed["Stream"] == "orderbook") {
        ref.setOrderbookData(parsed["Data"])
      }
		});
		window.addEventListener('resize', this.onWindowResize);

	}
};
</script>
<style>
.ag-theme-alpine {
    --ag-grid-size: 3px;
    --ag-list-item-height: 20px;
}


 </style>
