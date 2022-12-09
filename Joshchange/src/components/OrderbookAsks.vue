<template>
  <ag-grid-vue
    style="width: 300px; height: 300px"
    class="ag-theme-alpine"
    :columnDefs="columnDefs"
		@grid-ready="onGridReady"
    :rowData="rowData"
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
        { field: "asks", width:149 },
        { field: "price", width: 149 },
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
		getOrderbookData() {
    		axios.get("http://localhost:8080/orderbook/btcusd").then(({ data }) => 
				{const rowDataAsks = [];
    		const asks = data["asks"]["prices"];
    		for (var key in asks) {
      		var quantity = asks[key]["volume"];
      		var row = {asks: quantity,price: key};
      		rowDataAsks.push(row);
    		}
				var params = {};
				this.gridApi.setRowData(rowDataAsks);
				});
		}
		

	},
	created () {
		this.getOrderbookData()
		setInterval(() => this.getOrderbookData(),1000);
	}
};
</script>
