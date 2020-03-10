import Vue from 'vue'
import './registerServiceWorker'
import router from '@router'
import store from '@state/store'
import vuetify from '@plugins/vuetify'
import http from '@utils/api'
import App from './App.vue'

Vue.prototype.$http = http
Vue.config.productionTip = false

new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App),
}).$mount('#app')
