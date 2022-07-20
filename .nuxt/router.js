import Vue from 'vue'
import Router from 'vue-router'
import { normalizeURL, decode } from 'ufo'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _50b005d1 = () => interopDefault(import('..\\pages\\customer_order\\index.vue' /* webpackChunkName: "pages/customer_order/index" */))
const _39221104 = () => interopDefault(import('..\\pages\\customer_storage.vue' /* webpackChunkName: "pages/customer_storage" */))
const _dd535396 = () => interopDefault(import('..\\pages\\login.vue' /* webpackChunkName: "pages/login" */))
const _4bda1867 = () => interopDefault(import('..\\pages\\product\\index.vue' /* webpackChunkName: "pages/product/index" */))
const _f1c3efc4 = () => interopDefault(import('..\\pages\\provider_order\\index.vue' /* webpackChunkName: "pages/provider_order/index" */))
const _6729caf2 = () => interopDefault(import('..\\pages\\register.vue' /* webpackChunkName: "pages/register" */))
const _2e4eb999 = () => interopDefault(import('..\\pages\\snooker\\index.vue' /* webpackChunkName: "pages/snooker/index" */))
const _665b7347 = () => interopDefault(import('..\\pages\\storage.vue' /* webpackChunkName: "pages/storage" */))
const _c8145282 = () => interopDefault(import('..\\pages\\testeee.vue' /* webpackChunkName: "pages/testeee" */))
const _e33f3f68 = () => interopDefault(import('..\\pages\\vision.vue' /* webpackChunkName: "pages/vision" */))
const _3307ccdd = () => interopDefault(import('..\\pages\\VisionBase.vue' /* webpackChunkName: "pages/VisionBase" */))
const _49a0f738 = () => interopDefault(import('..\\pages\\visionia.vue' /* webpackChunkName: "pages/visionia" */))
const _78e7b9b8 = () => interopDefault(import('..\\pages\\visionweb.vue' /* webpackChunkName: "pages/visionweb" */))
const _e3b223e2 = () => interopDefault(import('..\\pages\\customer_order\\calendar.vue' /* webpackChunkName: "pages/customer_order/calendar" */))
const _25f601e6 = () => interopDefault(import('..\\pages\\customer_order\\create.vue' /* webpackChunkName: "pages/customer_order/create" */))
const _f7517340 = () => interopDefault(import('..\\pages\\provider_order\\create.vue' /* webpackChunkName: "pages/provider_order/create" */))
const _79867776 = () => interopDefault(import('..\\pages\\snooker\\create.vue' /* webpackChunkName: "pages/snooker/create" */))
const _3a3cb234 = () => interopDefault(import('..\\pages\\snooker\\stats.vue' /* webpackChunkName: "pages/snooker/stats" */))
const _bd116f0e = () => interopDefault(import('..\\pages\\customer_order\\_id.vue' /* webpackChunkName: "pages/customer_order/_id" */))
const _47ddeee2 = () => interopDefault(import('..\\pages\\product\\_id.vue' /* webpackChunkName: "pages/product/_id" */))
const _97a90bf4 = () => interopDefault(import('..\\pages\\provider_order\\_id.vue' /* webpackChunkName: "pages/provider_order/_id" */))
const _4d404e41 = () => interopDefault(import('..\\pages\\snooker\\_id.vue' /* webpackChunkName: "pages/snooker/_id" */))
const _70a299c4 = () => interopDefault(import('..\\pages\\index.vue' /* webpackChunkName: "pages/index" */))

const emptyFn = () => {}

Vue.use(Router)

export const routerOptions = {
  mode: 'history',
  base: '/',
  linkActiveClass: 'nuxt-link-active',
  linkExactActiveClass: 'nuxt-link-exact-active',
  scrollBehavior,

  routes: [{
    path: "/customer_order",
    component: _50b005d1,
    name: "customer_order"
  }, {
    path: "/customer_storage",
    component: _39221104,
    name: "customer_storage"
  }, {
    path: "/login",
    component: _dd535396,
    name: "login"
  }, {
    path: "/product",
    component: _4bda1867,
    name: "product"
  }, {
    path: "/provider_order",
    component: _f1c3efc4,
    name: "provider_order"
  }, {
    path: "/register",
    component: _6729caf2,
    name: "register"
  }, {
    path: "/snooker",
    component: _2e4eb999,
    name: "snooker"
  }, {
    path: "/storage",
    component: _665b7347,
    name: "storage"
  }, {
    path: "/testeee",
    component: _c8145282,
    name: "testeee"
  }, {
    path: "/vision",
    component: _e33f3f68,
    name: "vision"
  }, {
    path: "/VisionBase",
    component: _3307ccdd,
    name: "VisionBase"
  }, {
    path: "/visionia",
    component: _49a0f738,
    name: "visionia"
  }, {
    path: "/visionweb",
    component: _78e7b9b8,
    name: "visionweb"
  }, {
    path: "/customer_order/calendar",
    component: _e3b223e2,
    name: "customer_order-calendar"
  }, {
    path: "/customer_order/create",
    component: _25f601e6,
    name: "customer_order-create"
  }, {
    path: "/provider_order/create",
    component: _f7517340,
    name: "provider_order-create"
  }, {
    path: "/snooker/create",
    component: _79867776,
    name: "snooker-create"
  }, {
    path: "/snooker/stats",
    component: _3a3cb234,
    name: "snooker-stats"
  }, {
    path: "/customer_order/:id",
    component: _bd116f0e,
    name: "customer_order-id"
  }, {
    path: "/product/:id",
    component: _47ddeee2,
    name: "product-id"
  }, {
    path: "/provider_order/:id",
    component: _97a90bf4,
    name: "provider_order-id"
  }, {
    path: "/snooker/:id",
    component: _4d404e41,
    name: "snooker-id"
  }, {
    path: "/",
    component: _70a299c4,
    name: "index"
  }],

  fallback: false
}

export function createRouter (ssrContext, config) {
  const base = (config._app && config._app.basePath) || routerOptions.base
  const router = new Router({ ...routerOptions, base  })

  // TODO: remove in Nuxt 3
  const originalPush = router.push
  router.push = function push (location, onComplete = emptyFn, onAbort) {
    return originalPush.call(this, location, onComplete, onAbort)
  }

  const resolve = router.resolve.bind(router)
  router.resolve = (to, current, append) => {
    if (typeof to === 'string') {
      to = normalizeURL(to)
    }
    return resolve(to, current, append)
  }

  return router
}
