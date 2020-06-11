import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import panZoom from 'vue-panzoom'
import Landing from './components/Landing'
import Questions from './components/Questions'
import Mixing from './components/Mixing'
import Results from './components/Results'
import ResultsList from './components/ResultsList'
import ResultsGallery from './components/ResultsGallery'
import store from './store'


Vue.config.productionTip = false
Vue.use(panZoom)
Vue.use(VueRouter)

const routes = [
  { path: '/', component: Landing, name: "landing" },
  { path: '/questions', component: Questions, name: "questions" },
  { path: '/mixing', component: Mixing, name: "mixing" },
  { path: '/results', component: Results, name: "results" },
  { path: '/results-list', component: ResultsList, name: "resultsList" },
  { path: '/results-gallery', component: ResultsGallery, name: "resultsGallery" },
]

const router = new VueRouter({
  mode: 'history',
  routes,
})

// If the page doesn't exist, default to signin page.
router.beforeResolve( ( to, from, next ) => {
  if ( to.matched.length === 0 ) {
    next('/')
  } else {
    next()
  }
})

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')