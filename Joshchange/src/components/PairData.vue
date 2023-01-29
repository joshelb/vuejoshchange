<template>
<div class="row">
<div class="col">
<div class="card text-white bg-dark" style="width: 50rem;">
  <div class="card-body">
    <div class="row">
    <div class="col-1">
        <img id="iconAsset3" src="" width="40" height="40">
    </div>
    <div class="col">
        <a><h3>{{ symbol1 }}</h3><a style="color:gray;">/{{ symbol2 }}</a></a>
    </div>
    <div class="col">
        <div class="row">
          <a style=""><small>24h Change </small><small id="change1">{{ hchange }} <a id="arrow"> </a> </small> <small style="color:gray;">${{ symbol2 }}</small></a>
        </div>
        <div class="row">
           <small id="change2"> {{ dchange }} %</small>
         </div>
    </div>
    <div class="col">
        <div class="row">
            
            <small>24h Vol (<a style="color:gray;">{{ symbol1 }}</a>)   {{ hvol }} </small>
        </div>
        <div class="row">
            <small>7d Vol(<a style="color:gray;">{{ symbol1 }}</a>)    {{ dvol }} </small>
        </div>
    </div>
    </div>
  </div>
</div>
</div>
<div class="col"> 
    <div>
    </div>
</div>
</div>


</template>
<script>
export default {
inject: ['ws'],
data () {
    return {
        symbols: null,
        symbol1: null,
        symbol2: null,
        hvol: 50000,
        dvol: 70000000,
        hchange: 20,
        dchange: 40,
        previoushvol: null,
        previousdvol: null,


    }


},
methods: {
    setVolumeData(data) {
        this.hvol = data["tradeHistory"+(this.symbol1+"_"+this.symbol2)][0];
        this.dvol = data["tradeHistory"+(this.symbol1+"_"+this.symbol2)][1];
        var hchange = data["tradeHistory"+(this.symbol1+"_"+this.symbol2)][2]; 
        var dchange = data["tradeHistory"+(this.symbol1+"_"+this.symbol2)][3];
        var last = data["tradeHistory"+(this.symbol1+"_"+this.symbol2)][4]; 
        console.log(hchange)
        console.log(last)
        if (hchange < 0) {
            this.hchange = hchange;
            this.dchange = dchange * 100;
            document.getElementById("change1").style.color = "red";
            document.getElementById("change2").style.color = "red";
            document.getElementById("arrow").innerHTML = "&#129055";
        }
        if (hchange > 0){
            this.hchange = hchange;
            this.dchange = dchange *100;
            document.getElementById("change1").style.color = "green";
            document.getElementById("change2").style.color = "green";
            document.getElementById("arrow").innerHTML = "&#129053";
        }
        if (hchange == 0){
        this.hchange = hchange;
        this.dchange = dchange *100;
        document.getElementById("change1").style.color = "white";
        document.getElementById("change2").style.color = "white";
        }

    }
},
mounted () {
    var params = this.$route.params;
    var symbols = params["symbol"].split(":"); 
    this.symbols = symbols;
    this.symbol1 = this.symbols[0];
    this.symbol2 = this.symbols[1];
    document.getElementById("iconAsset3").src = "../src/assets/" + symbols[0] +".jpg"
    //document.getElementById("iconAsset4").src = "../src/assets/" + "JOSH" +".jpg"
    var ws = this.ws;
    var ref = this;
    ws.addEventListener('message', function(evt) {
		var received_msg = evt.data;
        var parsed=JSON.parse(received_msg);
        if (parsed["Stream"] == "pairData") {
            ref.setVolumeData(parsed["Data"])
        }
    });




},


}
</script>

<style>

h3, h4, h5, h6 {display: inline;}

</style>