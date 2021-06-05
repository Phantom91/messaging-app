import Vue from 'vue';
import App from './App.vue';
import store from './store';
import '@fortawesome/fontawesome-free/css/all.css';
import '@fortawesome/fontawesome-free/js/all.js';

// v-tooltip plugin + style
import VTooltip from 'v-tooltip';
import './assets/tooltip.css';

Vue.config.productionTip = false;

Vue.use(VTooltip);

new Vue({
	store,
	render: (h) => h(App)
}).$mount('#app');
