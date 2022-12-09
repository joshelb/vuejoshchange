import { createApp } from 'vue'
import App from './App.vue'
import Trade from './Trade.vue'
import { createRouter, createWebHistory } from 'vue-router'


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

createApp(App).use(router).mount('#app')
