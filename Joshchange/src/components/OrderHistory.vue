<template>
  <ag-grid-vue
    id = "activeorders"
    :style="{width, height}"
    class="ag-theme-balham-dark"
    :columnDefs="columnDefs"
		@grid-ready="onGridReady"
    :rowData="rowData"
    :getRowId="getRowId"
    :rowHeight= 40
    :suppressHorizontalScroll="suppressHorizontalScroll"
  >
  </ag-grid-vue>
</template>

<script>
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-balham.css";
import axios from 'axios';
import { AgGridVue } from "ag-grid-vue3";
import { h } from 'vue'
import BtnCellRenderer from "./btn-cell-renderer.vue"

export default {
	inject:['ws'],
  name: "Trade",
  components: {
    AgGridVue,
    btnCellRenderer: BtnCellRenderer   
  },
  setup() {
    return {
      height: '100%',
      width: '100%',
      columnDefs: [
        { field: "orderid", headerName: 'OrderID'},
        { field: "timestamp", headerName: 'Time', cellStyle: {color: 'orange',}},
				{ field: "quantity", headerName: 'Quantity'},
        { field: "price",  headerName: 'Price'},
				{ field: "side", headerName: 'Side',
        cellStyle: (params) => {
            if (params.value === 'sell') {
                return {color: 'red'};
            }
            if (params.value === 'buy') {
              return {color: 'green'}
            }
            return null;
        }
				},
      ],
      gridApi: null,
      suppressHorizontalScroll: true,
      columnApi: null,
      rowData: [],
    };
  },
	methods: {
		onGridReady(params){
		  this.gridApi = params.api;
      this.gridColumnApi = params.columnApi;
      this.gridColumnApi.setColumnVisible('orderid', false)
			this.gridApi.sizeColumnsToFit()
			params.api.setRowData([]);
		},
		setAciveOrderData(data) {
        if (data == null) {
          return;
        }
        data = data["OrderHistory"]
        const grid = [];
        for (let i = 0; i < data.length; i++) {
          var orderid = data[i][0]
          var timestamp = data[i][5];  
          timestamp = new Date(timestamp * 1000);
          var quantity = data[i][3];   
          var price = data[i][4];
          var side = data[i][2];
          var row = {orderid: orderid, timestamp: timestamp ,quantity: parseFloat(parseFloat(quantity).toFixed(10)),price: parseFloat(parseFloat(price).toFixed(10)), side: side};
          grid.push(row);
        }
        this.gridApi.setRowData(grid);
		},
    onWindowResize() {
      if (this.gridApi) {
        this.gridApi.sizeColumnsToFit();
      }
    },
    msgHandler(evt) {
      var received_msg = evt.data;
			var parsed=JSON.parse(received_msg);
      if (parsed["Stream"] == "userData") {
        console.log(parsed["Data"])
        this.setAciveOrderData(parsed["Data"])
      }
    }
      

	},
	created () {
		this.getRowId = params => params.data.orderid;
	},
	mounted() {
    var ref = this;
    var ws = this.ws;
    ws.addEventListener('message', this.msgHandler);
		window.addEventListener('resize', this.onWindowResize);
    		setInterval(ref.onWindowResize,100);
	},
  beforeUnmount() {
    console.log("ALLAH IS GREAT")
    this.gridApi=null;
    this.ws.removeEventListener('message', this.msgHandler);
    this.ws.removeEventListener('resize', this.onWindowResize);
  },
};
</script>
<style>

 </style>