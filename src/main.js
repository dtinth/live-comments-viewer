import 'bulma/css/bulma.css'

import App from './App.vue'
import HomePage from './components/HomePage'
import LiveCommentsPage from './components/LiveCommentsPage'
import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.config.productionTip = false
Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'history',
  routes: [
    { path: '/', component: HomePage },
    { path: '/:id/comments', component: LiveCommentsPage }
  ]
})

new Vue({
  render: h => h(App),
  router
}).$mount('#app')
