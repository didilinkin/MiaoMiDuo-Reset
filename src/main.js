// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue 	            from 'vue'
import App              from './App'
import store            from './store'
import router           from './router'
import filter           from './filter'
import infiniteScroll   from 'vue-infinite-scroll'
Vue.use(infiniteScroll)

Vue.config.productionTip    = false
Vue.config.devtools         = true
Vue.config.debug            = true

//import wxjssdk from './../static/jweixin-1.0.0.js'
	//判断是否微信
    let ua = window.navigator.userAgent.toLowerCase();
    let isWx = (ua.match(/MicroMessenger/i) == 'micromessenger');
	if (isWx) {

	}

new Vue({
    el: '#app',
    router,
    store,
    template: '<App/>',
    components: { App }
})
