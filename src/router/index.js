import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import CreateJob from '@/components/Jobs/CreateJob'
import Jobs from '@/components/Jobs/Jobs'
import Job from '@/components/Jobs/Job'
import Employer from '@/components/Employer/Employer'
import Employers from '@/components/Employer/Employers'
import Profile from '@/components/User/Profile'
import Signup from '@/components/User/Signup'
import Signin from '@/components/User/Signin'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/jobs',
      name: 'Jobs',
      component: Jobs
    },
    {
      path: '/job/new',
      name: CreateJob,
      component: CreateJob
    },
    {
      path: '/profile',
      name: 'Profile',
      component: Profile
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
      path: '/employers',
      name: 'Employers',
      component: Employers
    },
    {
      path: '/employer/:id',
      name: 'Employer',
      component: Employer
    },
    {
      path: '/job/:id',
      name: 'Job',
      props: true,
      component: Job
    }

  ],
  mode: 'history'
})
