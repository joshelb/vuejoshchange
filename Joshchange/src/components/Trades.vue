<template>
  <ag-grid-vue
    :style="{width, height}"
    class="ag-theme-balham-dark"
    :columnDefs="columnDefs"
		@grid-ready="onGridReady"
    :rowData="rowData"
		:getRowId="getRowId"
		:suppressHorizontalScroll="suppressHorizontalScroll"
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
		height: '100%',
      width: '100%',
      columnDefs: [
				{ field: "index"},
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
			rowModelType:'infinite',
      gridApi: null,
			suppressHorizontalScroll: true,
  		sizeColumnsToFit: true,
      columnApi: null,
      rowData: [],
    };
  },
	methods: {
		getApi(){
			return this.gridApi;
		},
		coloring(value) {
      if (value =='buy') {
        return { color:'green' };
      }
			if (value =='sell'){
				return { color:'red'}
			}
    },
		onGridReady(params){
		  this.gridApi = params.api;
      this.gridColumnApi = params.columnApi;
			this.gridColumnApi.setColumnVisible('index', false)
			params.api.setRowData([]);
			this.gridApi.sizeColumnsToFit()
		},
		setTradesData(data) {
				if (data == null){
					return;
				}
				const grid = [];
    		for (let i = 0; i < data.length; i++) {
      		var quantity = data[i][2];
					var index = data[i][0];
					var price = data[i][3];
					var side = data[i][1];
					var timestamp = data[i][4];
					timestamp = new Date(timestamp * 1000);
					var hours = timestamp.getHours();
					var minutes = "0" + timestamp.getMinutes();
					var seconds = "0" + timestamp.getSeconds();
					timestamp = hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);
      		var row = {index: index, timestamp: timestamp ,quantity: parseFloat(parseFloat(quantity).toFixed(10)),price: parseFloat(parseFloat(price).toFixed(10)), side: side};
      		grid.push(row);
    		}
				var params = {};
				this.gridApi.setRowData(grid);
		},
		onWindowResize() {
    	if (this.gridApi) {
      	this.gridApi.sizeColumnsToFit();
    	}
		}

	},
	created () {
		this.getRowId = params => params.data.index;
	},
	mounted (){
    var ref = this;
    var ws = this.ws;
		ws.addEventListener('message', function(evt) {
			var received_msg = evt.data;
			var parsed = JSON.parse(received_msg);
			if (parsed["Stream"] == "trades" ) {
      	ref.setTradesData(parsed["Data"])
			}
		});
		window.addEventListener('resize', this.onWindowResize);
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
