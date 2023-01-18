<script>
import auth from "./authconf.js"
import NavbarHome from "./components/NavbarHome.vue"
import Test from "./components/testt.vue"
export default {
name: 'Base',
  components: {
    NavbarHome,
    Test
  },
    methods: {
      login() {
        auth.authorize();
      }
    }
}

</script>
<template>
<div class="suprr">
  <div class="row">
    <div class="col"></div>
    <div class="col">
    </div>
    <div class="col"></div>
  </div>
        <NavbarHome/>
        <div class="cardcenter">
        <div class="card" id="xm" style=" background-color: #212529; width: 750px;">
            <div class="card-body">
                <h5 class="card-title text-white">Trade for FREE!</h5>
                <p class="card-text text-white">0 Trading fees on all available Pairs!</p>
                <a href="/markets" class="btn btn-warning text-white"> Trade Now</a>
            </div>
        </div>
        </div>
        <div class="cardcenter">
        <div class="card" id="xm" style=" background-color: #212529; width: 750px;">
            <div class="card-body">
                <h5 class="card-title text-white">Build your crypto portfolio.
Start your first trade with these easy steps.</h5>
                <p class="card-text text-white">Register your account by clicking on Register! There you will get redirected to Auth0 our user managment System.
                    Click on Signup and Create an Account for Free.
                </p>
                <a><img  src="/src/assets/user.jpg" style="" width= 150></a>
                <p class="card-text text-white">Next Fund your crypto Wallet by depositing cryptocurrencies onto the exchange.
                </p>
                <a><img  src="/src/assets/deposit.jpg" style="" width= 150></a>
                <p class="card-text text-white">Start Trading your favourite cryptocurrencies!!!
                </p>
                <a><img  src="/src/assets/trade.jpg" style="" width= 150></a>
                <p></p>
                <a @click="login" class="btn btn-warning text-white"> Register</a>
            </div>
        </div>
        </div>
</div>
</template>

<style>

.together {
  /* Center child horizontally*/
  background-color:  #212529;
  display: flex;
  justify-content: center;
}

.btn-warning {
    background-color: orangered !important;
    border-color: orangered !important;
}

.cardcenter {
  margin-top: 30px;
  display: flex;
  justify-content: center;

}

.suprr {
  background-image: url("/src/assets/backcandle.jpg");
}

</style>