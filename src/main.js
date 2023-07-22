import Vue from 'vue'
import Vuelidate from 'vuelidate'
import { initializeApp } from 'firebase/app'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import Paginate from 'vuejs-paginate'

import App from './App.vue'
import router from './router'
import store from './store'
import dateFilter from './filters/date.filter'
import currencyFilter from './filters/currency.filter'
import localizeFilter from './filters/localize.filter'
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
Vue.filter('localize', localizeFilter)
Vue.directive('tooltip', tooltipDirective)
Vue.component('Loader', Loader)
Vue.component('Paginate', Paginate)

initializeApp({
  apiKey: 'AIzaSyC2DiliMxVbxN5OsYUwc5d9Pos7A2yH9mw',
  authDomain: 'vue-crm-93feb.firebaseapp.com',
  projectId: 'vue-crm-93feb',
  storageBucket: 'vue-crm-93feb.appspot.com',
  messagingSenderId: '207435020724',
  appId: '1:207435020724:web:96e6c441679d83cc6adae1',
  databaseURL: 'https://vue-crm-93feb-default-rtdb.europe-west1.firebasedatabase.app/'
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
