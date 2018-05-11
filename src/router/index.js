import Vue from 'vue'
import Router from 'vue-router'
import Summary from '@/components/Summary'
import List from '@/components/List'
import Charts from '@/components/Charts'

Vue.use(Router)

export default new Router({
  linkExactActiveClass: 'active',
  routes: [
    {
      path: '/',
      name: 'Summary',
      component: Summary
    },
    {
      path: '/List',
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
