<template>
<NavbarHome/>
<div class="cardcenter">
<div class="card bg-dark text-white"  style="width: 1000px;">
<div class="card-header">
<div class="row">
        <div class="col"> </div>
    <div class="col">  <p style="color: grey;">Pair:</p></div>
    <div class="col"> <p style="color: grey;">Current Traded Price:</p></div>
    <div class="col"> <p style="color: grey;">24H-Volume:</p></div>
    <div class="col"> <p style="color: grey;">7D-Volume:</p></div>

</div>
</div>
<div v-for="item in items">
<a class="btn btn-dark" id="buttontarde" :href=item.urltrade role="button">
<div class="row">
    <div class="col"><img :src= item.url style="width: 60px;"> </div>
    <div class="col"> <p style="color: gold;">{{ item.pair }}</p> </div>
    <div class="col"> {{ item.price }}</div>
    <div class="col"> {{ item.volumeH }}</div>
    <div class="col"> {{ item.volumeD }}</div>
</div>
</a>
</div>

</div>
</div>
</template>
<script>
import { parse } from '@vue/compiler-dom';
import NavbarHome from './components/NavbarHome.vue';
export default {
    inject: ['ws'],
  components: {
    NavbarHome,
  },
	data() {
      return {
				isAuthenticated: false,
                items: [],
      }
	},    
    methods: {
        setData(data){
            var res = [];
            for(var key in data) {
                var pair = key.slice(12);
                var symbols = pair.split("_");
                var url = "/src/assets/" + pair + ".jpg" 
                var urltrade = "/trade/" + symbols[0] + ":" + symbols[1];
                var row = {url: url, pair: symbols[0]+"/"+symbols[1], price: 0, volumeH: data[key][0], volumeD: data[key][1], urltrade: urltrade}
                res.push(row)
            }
            this.items = res;
            this.previtems = res;
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
    var msg = {Type: "subscribe", Stream: "pairData", Symbol: params["symbol"], Timeframe: "hrqe", Aggregation: "qrehg", Email: "ewg"} 
    		ws.onopen= () => {ws.send(JSON.stringify(msg))}
    console.log(ws)
    ws.addEventListener('message', function(evt) {
	var received_msg = evt.data;
    var parsed=JSON.parse(received_msg);
    console.log(parsed)
    if (parsed["Stream"] == "pairData") {
        ref.setData(parsed["Data"])
    }
    });


  }
  };


</script>
<style>

#buttontarde {
        width:100%;
    display:block;
}

</style>