import Vue from 'vue'
import Router from 'vue-router'
import List from '@/components/List'
import Charts from '@/components/Charts'

Vue.use(Router)

export default new Router({
  linkExactActiveClass: 'active',
  routes: [
    {
      path: '/',
      name: 'List',
      component: List
    },
    {
      path: '/charts',
      name: 'Charts',
      component: Charts
    }
  ]
})
