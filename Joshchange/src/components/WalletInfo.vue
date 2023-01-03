<template>
    <div class="row top-1">
        <div class="col-3">
            <div className="img-size">
                <img id="iconAsset" src="" width="50" height="50">
            </div>
        </div>
        <div class="col">
            <div class="row">
                AvailableBalance:
            </div>
            <div class="row">
                Balance:
            </div>
        </div>
        <div class="col" style=" margin-left: 0px;"></div>
        <div class="col left-1" style=" margin-right: 15px;">
            <div class="row">
                {{ availablebalance1 }}
            </div>
            <div class="row">
                {{ balance1 }}
            </div>
        </div>
        <div class="col">
            <div class="row">
                {{ symbol1 }}
            </div>
            <div class="row">
                {{ symbol1 }}
            </div>
        </div>
    </div>
    <div class="row" style="margin-top: 40px;">

    </div>
    <div class="row top-1">
        <div class="col-3">
            <div className="img-size">
                <img id="iconAsset2" src="" width="50" height="50">
            </div>
        </div>
        <div class="col">
            <div class="row">
                AvailableBalance:
            </div>
            <div class="row">
                Balance:
            </div>
        </div>
        <div class="col" style=" margin-right: 0px;"></div>
        <div class="col left-1" style=" margin-right: 15px;">
            <div class="row">
                {{ availablebalance2 }}
            </div>
            <div class="row">
                {{ balance2 }}
            </div>
        </div>
        <div class="col">
            <div class="row">
                {{ symbol2 }}
            </div>
            <div class="row">
                {{ symbol2 }}
            </div>
        </div>

    </div>



</template>
<script>
import { RowHighlightPosition } from 'ag-grid-community';

export default{
    inject: ['ws'],
    data() {
        return {
            message : "Wallet Balance:",
            balance1 : null,
            balance2 : null,
            availablebalance1 : null,
            availablebalance2 : null, 
            symbol1: "",
            symbol2: "", 
        }    
    },
    methods: {
        setWalletBalance(data) {
            data = data["WalletBalances"];
            console.log("hi")
            for (let key in data) {
                if (this.symbol1 == key){
                    this.availablebalance1 = data[key][0];
                    this.balance1 = data[key][1];
                }
                if (this.symbol2 == key){
                    this.availablebalance2 = data[key][0];
                    this.balance2 = data[key][1];

                }
            }
        


        }


    },
    mounted() {
        var params = this.$route.params;
        var symbols = params["symbol"].split(":");
        this.symbol1 = symbols[0]
        this.symbol2 = symbols[1]
        document.getElementById("iconAsset").src = "../src/assets/" + symbols[0] +".jpg"
        document.getElementById("iconAsset2").src = "../src/assets/" + symbols[1] +".jpg"
        var ws = this.ws;
        var ref = this;
        ws.addEventListener('message', function(evt) {
		    var received_msg = evt.data;
            var parsed=JSON.parse(received_msg);
            if (parsed["Stream"] == "userData") {
                console.log(parsed["Data"])
                ref.setWalletBalance(parsed["Data"])
            }
		});

    }

    

}


</script>
<style>
.top-1 {border-style: groove; border-color: grey;}

</style>