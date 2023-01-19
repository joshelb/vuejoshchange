import { createApp } from 'vue'
import App from './App.vue'
import Trade from './Trade.vue'
import Base from './Base.vue'
import Login from './components/Login.vue'
import Markets from './Markets.vue'
import Wallet from './Wallet.vue'
import auth0 from 'auth0-js';
import auth from './authconf'
import Callback from './components/Callback.vue'
import { createRouter, createWebHistory } from 'vue-router'
import { plugin, defaultConfig } from '@formkit/vue'
//import { config } from './authconf'



import './assets/main.css'
import "bootstrap/dist/css/bootstrap.css"
import 'bootstrap-vue/dist/bootstrap-vue.css'
import 'bootstrap/dist/js/bootstrap.min.js'
//import 'jquery/src/jquery.js'


const routes = [
	{ path: "/", component: Base, name:'Base', meta: {requiresAuth: false}},
		{ path: "/wallet", component: Wallet, name:'Wallet', meta: {requiresAuth: true}},
	{ path: "/markets", component: Markets, name:'Markets', meta: {requiresAuth: false}},
	{ path: "/trade/:symbol", component: Trade, name:'Trade', meta: {requiresAuth: true} },			
	{ path: "/login", component: Login, name:'Login', meta: {requiresAuth: false}},
	{ path: "/callback", component: Callback, name:'Callback', meta: {requiresAuth: false}},
];
const router = createRouter({
	history: createWebHistory(),
	routes
});

router.beforeEach((to, from, next) => {
	let isAuthenticated = false;
	if (to.name == 'Callback'){
		auth.parseHash((err, authResult) => {
			console.log(authResult)
			if (authResult && authResult.accessToken && authResult.idToken) {
				let expiresAt = JSON.stringify(authResult.expiresIn * 1000 + new Date().getTime());
				localStorage.setItem('access_token', authResult.accessToken);
				localStorage.setItem('id_token', authResult.idToken);
				localStorage.setItem('expires_at', expiresAt);
				localStorage.setItem('email', authResult.idTokenPayload["name"]);



				router.replace('/');
			} 
			else if (err) {
				console.log("lmao")
				router.replace('/');
				console.log(err);
			} 	
		});		
		next(false); 
		return; 
	}

  if (localStorage.getItem('access_token') && localStorage.getItem('id_token') && localStorage.getItem('expires_at')) {
    let expiresAt = JSON.parse(localStorage.getItem('expires_at'));
    isAuthenticated = new Date().getTime() < expiresAt;
  }
	console.log(isAuthenticated)

	if (to.matched.some(record => record.meta.requiresAuth)) {
		if (isAuthenticated) {
			next();
		} else {
			router.replace("/");
		}
	} else {
		next();
	} 



});




var app = createApp(App);
app.use(router);
app.use(plugin, defaultConfig);
var ws = new WebSocket("wss://joshchange.website/wsdata");
app.provide('ws', ws)
app.mount('#app')
