import Vue from 'vue'
import Router from 'vue-router'
import Employer from '@/components/Employer/detailemployer'
import CreateEmployer from '@/components/Employer/CreateEmployer'
import Employers from '@/components/Employer/Employers'
import Profile from '@/components/User/Profile'
import Signup from '@/components/User/Signup'
import Signin from '@/components/User/Signin'
import AuthGuard from './auth-guard'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/profile/:id',
      name: 'Profile',
      component: Profile,
      props: true,
      beforeEnter: AuthGuard
    },
    {
      path: '/signup',
      name: 'Signup',
      component: Signup
    },
    {
      path: '/signin',
      name: 'Signin',
      component: Signin
    },
    {
      path: '/employer/new',
      name: 'CreateEmployer',
      component: CreateEmployer
    },
    {
      path: '/',
      name: 'Employers',
      component: Employers
    },
    {
      path: '/employer/:id',
      name: 'Employer',
      component: Employer,
      props: true,
      beforeEnter: AuthGuard
    }

  ],
  mode: 'history'
})
