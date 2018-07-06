import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import './registerServiceWorker'

Vue.prototype.$http = axios.create({
  baseURL: 'https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/place/'
})
Vue.prototype.$google = process.env.GOOGLE_KEY
Vue.config.productionTip = process.env.NODE_ENV === 'production'

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
