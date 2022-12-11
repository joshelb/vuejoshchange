<template>
  <ag-grid-vue
    style="width: 300px; height: 300px"
    class="ag-theme-alpine"
    :columnDefs="columnDefs"
		@grid-ready="onGridReady"
    :rowData="rowData"
    :getRowId="getRowId"
  >
  </ag-grid-vue>
</template>

<script>
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import axios from 'axios';
import { AgGridVue } from "ag-grid-vue3";

export default {
  name: "Trade",
  components: {
    AgGridVue,
  },
  setup() {
    return {
      columnDefs: [
        { field: "bids", width:149 },
        { field: "price", width:149},
      ],
      gridApi: null,
      columnApi: null,
      rowData: [],
    };
  },
	methods: {
		onGridReady(params){
		  this.gridApi = params.api;
      this.gridColumnApi = params.columnApi;
			params.api.setRowData([]);
		},
		setOrderbookData(data) {
				const rowDataBids = [];
    		const bids = data["bids"]["prices"];
    		for (var key in bids) {
      		var quantity = bids[key]["volume"];
      		var row = {bids: quantity,price: key};
      		rowDataBids.push(row);
    		}
				var params = {};
				this.gridApi.setRowData(rowDataBids);
		}
		

	},
	created () {
  var ref = this;
    this.getRowId = params => params.data.price;
    var ws = new WebSocket("ws://localhost:8080/orderbook/btcusd");
    ws.onopen = function() {
      ws.send("Hello my Fren Tangent");
    }
    ws.onmessage = function (evt) {
      var received_msg = evt.data;
      console.log(JSON.parse(received_msg)) 
      ref.setOrderbookData(JSON.parse(received_msg))
    }
    ws.onclose= function (evt) {
      console.log("Websocket Connection to Exchange closed")
    }

	}
};
</script>
<style>
.ag-theme-alpine {
    --ag-grid-size: 3px;
    --ag-list-item-height: 20px;
}


 </style>
