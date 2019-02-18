import Vue from 'vue'
import Router from 'vue-router'
import Calculator from '@/components/calculator/Calculator'
import Comments from '@/components/comments/Comments'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Calculator',
      component: Calculator
    },
    {
      path: '/calculator',
      name: 'Calculator',
      component: Calculator
    },
    {
      path: '/comments',
      name: 'Comments',
      component: Comments
    },
  ]
})
