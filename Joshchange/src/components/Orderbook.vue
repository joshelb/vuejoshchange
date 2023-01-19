<template>
  <ag-grid-vue
    style="height: 500px"
    class="ag-theme-balham-dark"
    :columnDefs="columnDefs"
		@grid-ready="onGridReady"
    :rowData="rowData"
    :getRowId="getRowId"
		:animateRows="true"
  >
  </ag-grid-vue>
</template>

<script>
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-balham.css";
import axios from 'axios';
import { AgGridVue } from "ag-grid-vue3";
import { h } from 'vue'

export default {
	inject:['ws'],
  name: "Trade",
  components: {
    AgGridVue,
  },
  setup() {
    return {
      columnDefs: [
        { field: "bids", headerName:"Size",enableCellChangeFlash:true, 
    cellClassRules: {
    }
			},
        { field: "price", cellStyle: {color: 'green',}},
        { field: "index", cellStyle: {color: 'green',}},
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
			this.gridApi.sizeColumnsToFit()
			params.api.setRowData([]);
		},
		setOrderbookData(data) {
				const rowDataBids = [];
    		const bids = data["bids"]["prices"];
        var index = 0;
        console.log(bids)
    		for (var key in bids) {
      		var quantity = bids[key]["volume"];
      		var row = {index: index,bids: quantity,price: parseFloat(key)};
      		rowDataBids.push(row);
          index +=1;
    		}
				var params = {};
				this.gridApi.setRowData(rowDataBids.reverse());
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
	mounted() {
    var ref = this;
    var ws = this.ws;
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
.ag-theme-balham-dark {
    --ag-grid-size: 3px;
    --ag-list-item-height: 20px;
}

 </style>
