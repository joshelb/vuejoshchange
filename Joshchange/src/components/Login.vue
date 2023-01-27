<template>
    <grid-layout
            v-model:layout="layout"
            :col-num="12"
            :row-height="30"
    >
      <template #default="{ gridItemProps }">
        <!-- | gridItemProps props from GridLayout | -->
        <!--breakpointCols: props.cols-->
        <!--colNum: props.colNum-->
        <!--containerWidth: width.value-->
        <!--isDraggable: props.isDraggable-->
        <!--isResizable: props.isResizable-->
        <!--lastBreakpoint: lastBreakpoint.value-->
        <!--margin: props.margin-->
        <!--maxRows: props.maxRows-->
        <!--responsive: props.responsive-->
        <!--rowHeight: props.rowHeight-->
        <!--useCssTransforms: props.useCssTransforms-->
        <!--width: width.value-->
        <grid-item
          id="all"
          v-for="item in layout"
          :key="item.i"
          v-bind="gridItemProps"
          :x="item.x"
          :y="item.y"
          :w="item.w"
          :h="item.h"
          :i="item.i"
          :minW="item.minW"
          :minH="item.minH"
          :maxH="item.maxH"
          :dragIgnoreFrom="item.dragIgnoreFrom"
          @resized="resize"
          @resize="resize"
        >
        <div id="1" style="height:100%;" v-if="item.i == '0'">
          <OrderbookAsks ref="asks"></OrderbookAsks>
        </div>
        <div id="2" style="height:100%;" v-if="item.i == '1'">
          <OrderbookBids ref="bids"></OrderbookBids>
        </div>
        <div id="3" style="height:100%;" v-if="item.i == '2'">
          <Trades ref="trades"></Trades>
        </div>
        <div style="height:100%;" v-if="item.i == '3'">
          <ChartTV ref="chart"></ChartTV>
        </div>
        <div style="height:100%;" v-if="item.i == '4'">
          <Tradingpanel ref="panel"></Tradingpanel>
        </div>
        <div style="height:100%;" v-if="item.i == '5'">
          <Orders ref="panel"></Orders>
        </div>
        <div style="height:100%;" v-if="item.i == '6'">
          <DiscordComponent ref="panel"></DiscordComponent>
        </div>
        </grid-item>
      </template>
    </grid-layout>
  </template>
  <script>
  import OrderbookComponent from './OrderbookComponent.vue';
  import OrderbookAsks from './OrderbookAsks.vue';
  import OrderbookBids from './Orderbook.vue';
  import Trades from './Trades.vue';
  import ChartTV from './ChartTV.vue';
  import Tradingpanel from './Tradingpanel.vue';
  import Orders from './Orders.vue';
  import DiscordComponent from './DiscordComponent.vue'
  import ResizeSensor from "resize-sensor";
  export default {
    name: 'App',
    components: {
      OrderbookComponent,
      OrderbookAsks,
      OrderbookBids,
      Trades,
      ChartTV,
      Tradingpanel,
      Orders,
      DiscordComponent,
    },
    data () {
      return {
        layout: [
           { x: 0, y: 0, w: 2, h: 10, i: 0},
          { x: 2, y: 0, w: 2, h: 10, i: 1 },
          { x: 4, y: 0, w: 2, h: 10, i: 2 },
          { x: 6, y: 0, w: 6, h: 10, i: 3 },
          { x: 0, y: 8, w: 6, h: 7, i: 4, dragIgnoreFrom:""},
          { x: 6, y: 8, w: 6, h: 20, i: 5 },
          { x: 0, y: 12, w: 6, h: 14, i: 6 },
        ]
      }
    },
    methods: {
      resize: function(i, newH, newW, newHPx, newWPx){
        console.log("qgr")
        if (i == 0){
          (this.$refs.asks[0].getApi()).sizeColumnsToFit();
        }
        if (i == 1){
          (this.$refs.bids[0].getApi()).sizeColumnsToFit();
        }
        if (i == 2){
          (this.$refs.trades[0].getApi()).sizeColumnsToFit();
        }
        if (i == 3){
        }
      },

    },
    mounted() {
    

    }
  }
  </script>