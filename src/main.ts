import { createApp, type App as AppType } from 'vue'
import { createMetaManager } from 'vue-meta'
import { onAuthStateChanged } from 'firebase/auth'
import { createPinia } from 'pinia'
import { PiniaLogger } from 'pinia-logger'
// @ts-ignore:next-line
import Paginate from 'vuejs-paginate-next'

import App from './App.vue'
import router from './router'
import { auth } from './services/firebase'
import messagePlugin from './plugins/message'
import dropdown from './directives/dropdown'
import select from './directives/select'
import tooltip from './directives/tooltip'
import AppLoader from './components/app/AppLoader.vue'

import 'materialize-css/dist/css/materialize.min.css'
import 'materialize-css/dist/js/materialize.min.js'
import './assets/index.css'

const pinia = createPinia()
pinia.use(
  PiniaLogger({
    disabled: import.meta.env.MODE === 'production',
    expanded: false
  })
)

let app: AppType
onAuthStateChanged(auth, async () => {
  if (!app) {
    app = createApp(App)
    app.use(pinia)
    app.use(router)
    app.use(createMetaManager())
    app.use(messagePlugin)
    app.directive('dropdown', dropdown)
    app.directive('select', select)
    app.directive('tooltip', tooltip)
    app.component('AppLoader', AppLoader)
    app.component('AppPagination', Paginate)
    await router.isReady()
    app.mount('#app')
  }
})
