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
        {{ symbol1 }}/{{ symbol2 }}
    </div>
    <div class="col">
        <div class="row">
            <small>24h-Change: {{ hchange }} </small>
        </div>
        <div class="row">
            <small>7d-Change: {{ dchange }}</small>
         </div>
    </div>
    <div class="col">
        <div class="row">
            
            <small>24h-Volume({{ symbol1 }}): {{ hvol }} </small>
        </div>
        <div class="row">
            <small>7d-Volume({{ symbol1 }}): {{ dvol }} </small>
        </div>
    </div>
    </div>
  </div>
</div>
</div>
<div class="col"> 
    <div>
        <div class="card text-danger bg-light" style="height: 76px; width: 40rem;"> 
            <div class="row">
                <div class="col">     
                    <h3>NOW 0 FEE TRADING ALL PAIRS!</h3> 
                </div>
                <div class="col">
                    <img id="iconAsset4" src="" width="60" height="60">
                </div>
            </div>
        </div>
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
        previous: null,


    }


},
methods: {
    setVolumeData(data) {
        this.hvol = data["tradeHistory"+(this.symbol1+"_"+this.symbol2)][0];
        this.dvol = data["tradeHistory"+(this.symbol1+"_"+this.symbol2)][1];
    }
},
mounted () {
    var params = this.$route.params;
    var symbols = params["symbol"].split(":"); 
    this.symbols = symbols;
    this.symbol1 = this.symbols[0];
    this.symbol2 = this.symbols[1];
    document.getElementById("iconAsset3").src = "../src/assets/" + symbols[0] +".jpg"
    document.getElementById("iconAsset4").src = "../src/assets/" + "JOSH" +".jpg"
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