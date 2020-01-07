import Vue from 'vue'
import VueRouter from 'vue-router'
import Messages from '../views/Messages.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'messages',
    component: Messages
  },
  {
    path: '/message/:id',
    name: 'message',
    component: Messages,
    props: true
  },
  {
    path: '/problems',
    name: 'problems',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/Problems.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
