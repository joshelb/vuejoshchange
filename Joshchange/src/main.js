import { createApp } from 'vue'
import App from './App.vue'
import Trade from './Trade.vue'
import { createRouter, createWebHistory } from 'vue-router'
import { plugin, defaultConfig } from '@formkit/vue'


import './assets/main.css'
import "bootstrap/dist/css/bootstrap.min.css"

const Home = { template: '<div>Home</div>' };

const routes = [
	{ path: "/", component: App },
	{ path: "/trade/:symbol", component: Trade, name:'Trade' }			
];
const router = createRouter({
	history: createWebHistory(),
	routes
});
var app = createApp(App);
app.use(router);
app.use(plugin, defaultConfig).mount('#app')
