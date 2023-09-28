import { initializeApp } from 'firebase/app'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import 'materialize-css/dist/css/materialize.min.css'
import 'materialize-css/dist/js/materialize.min.js'
import { createApp } from 'vue'
import { createMetaManager } from 'vue-meta'
import Paginate from 'vuejs-paginate-next'

import App from './App.vue'
import './assets/index.css'
import AppLoader from './components/app/AppLoader'
import tooltipDirective from './directives/tooltip'
import messagePlugin from './plugins/message'
import router from './router'
import store from './store'

initializeApp({
  apiKey: 'AIzaSyC2DiliMxVbxN5OsYUwc5d9Pos7A2yH9mw',
  appId: '1:207435020724:web:96e6c441679d83cc6adae1',
  authDomain: 'vue-crm-93feb.firebaseapp.com',
  databaseURL: 'https://vue-crm-93feb-default-rtdb.europe-west1.firebasedatabase.app/',
  messagingSenderId: '207435020724',
  projectId: 'vue-crm-93feb',
  storageBucket: 'vue-crm-93feb.appspot.com'
})

let app
const auth = getAuth()
onAuthStateChanged(auth, async () => {
  if (!app) {
    app = createApp(App)
    app.use(store)
    app.use(router)
    app.use(createMetaManager())
    app.use(messagePlugin)
    app.directive('tooltip', tooltipDirective)
    app.component('AppLoader', AppLoader)
    app.component('AppPagination', Paginate)
    await router.isReady()
    app.mount('#app')
  }
})
