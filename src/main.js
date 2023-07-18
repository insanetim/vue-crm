import Vue from 'vue'
import Vuelidate from 'vuelidate'
import { initializeApp } from 'firebase/app'
import { getAuth, onAuthStateChanged } from 'firebase/auth'

import App from './App.vue'
import router from './router'
import store from './store'
import dateFilter from './filters/date.filter'
import currencyFilter from './filters/currency.filter'
import messagePlugin from './utils/message.plugin'
import tooltipDirective from './directives/tooltip.directive'
import Loader from './components/app/Loader'

import './registerServiceWorker'
import 'materialize-css/dist/js/materialize.min.js'

Vue.config.productionTip = false

Vue.use(messagePlugin)
Vue.use(Vuelidate)
Vue.filter('date', dateFilter)
Vue.filter('currency', currencyFilter)
Vue.directive('tooltip', tooltipDirective)
Vue.component('Loader', Loader)

initializeApp({
  apiKey: 'AIzaSyCqDZUQMiZnkXq02KSgrb_nJPfWoQ8STEA',
  authDomain: 'vue-644e1.firebaseapp.com',
  projectId: 'vue-644e1',
  storageBucket: 'vue-644e1.appspot.com',
  messagingSenderId: '424568971407',
  appId: '1:424568971407:web:1e1fe556e0b036b1a6d0fa',
  databaseURL: 'https://vue-644e1-default-rtdb.europe-west1.firebasedatabase.app/'
})

let app
const auth = getAuth()
onAuthStateChanged(auth, () => {
  if (!app) {
    app = new Vue({
      router,
      store,
      render: h => h(App)
    }).$mount('#app')
  }
})
