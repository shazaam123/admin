import { createWebHistory, createRouter } from 'vue-router'

const routes = [
  {
    path: '/login',
    component: () => import('./components/authen/Login.vue')
  },
  {
    path: '/logout',
    component: () => import('./components/authen/Logout.vue')
  },
  {
    path: '/resetPassword',
    component: () => import('./components/authen/ResetPassword.vue')
  },
  {
    path: '/changePassword/:token',
    component: () => import('./components/authen/ChangePassword.vue')
  },
  {
    path: '/',
    component: () => import('./components/Default.vue')
  },
  {
    path: '/home',
    component: () => import('./components/Home.vue')
  },
  {
    path: '/profile',
    component: () => import('./components/Profile.vue')
  },
  {
    path: '/userAccount',
    name: 'userAccount',
    component: () => import('./components/userAccount/Index.vue')
  },
  {
    path: '/userAccount/create',
    component: () => import('./components/userAccount/Create.vue')
  },
  {
    path: '/userAccount/:id/',
    component: () => import('./components/userAccount/Detail.vue')
  },
  {
    path: '/userAccount/edit/:id/',
    component: () => import('./components/userAccount/Edit.vue')
  },
  {
    path: '/userAccount/delete/:id/',
    component: () => import('./components/userAccount/Delete.vue')
  },
  {
    path: '/student',
    name: 'student',
    component: () => import('./components/student/Index.vue')
  },
  {
    path: '/student/create',
    component: () => import('./components/student/Create.vue')
  },
  {
    path: '/student/:id/',
    component: () => import('./components/student/Detail.vue')
  },
  {
    path: '/student/edit/:id/',
    component: () => import('./components/student/Edit.vue')
  },
  {
    path: '/student/delete/:id/',
    component: () => import('./components/student/Delete.vue')
  },
  {
    path: '/course',
    name: 'course',
    component: () => import('./components/course/Index.vue')
  },
  {
    path: '/course/create',
    component: () => import('./components/course/Create.vue')
  },
  {
    path: '/course/:id/',
    component: () => import('./components/course/Detail.vue')
  },
  {
    path: '/course/edit/:id/',
    component: () => import('./components/course/Edit.vue')
  },
  {
    path: '/course/delete/:id/',
    component: () => import('./components/course/Delete.vue')
  },
  {
    path: '/applications',
    name: 'applications',
    component: () => import('./components/applications/Index.vue')
  },
  {
    path: '/applications/create',
    component: () => import('./components/applications/Create.vue')
  },
  {
    path: '/applications/:id/',
    component: () => import('./components/applications/Detail.vue')
  },
  {
    path: '/applications/edit/:id/',
    component: () => import('./components/applications/Edit.vue')
  },
  {
    path: '/applications/delete/:id/',
    component: () => import('./components/applications/Delete.vue')
  },
  {
    path: '/userRole',
    name: 'userRole',
    component: () => import('./components/userRole/Index.vue')
  },
  {
    path: '/userRole/create',
    component: () => import('./components/userRole/Create.vue')
  },
  {
    path: '/userRole/:userId/:roleId/',
    component: () => import('./components/userRole/Detail.vue')
  },
  {
    path: '/userRole/edit/:userId/:roleId/',
    component: () => import('./components/userRole/Edit.vue')
  },
  {
    path: '/userRole/delete/:userId/:roleId/',
    component: () => import('./components/userRole/Delete.vue')
  },
  {
    path: '/admissionDecision',
    name: 'admissionDecision',
    component: () => import('./components/admissionDecision/Index.vue')
  },
  {
    path: '/admissionDecision/create',
    component: () => import('./components/admissionDecision/Create.vue')
  },
  {
    path: '/admissionDecision/:id/',
    component: () => import('./components/admissionDecision/Detail.vue')
  },
  {
    path: '/admissionDecision/edit/:id/',
    component: () => import('./components/admissionDecision/Edit.vue')
  },
  {
    path: '/admissionDecision/delete/:id/',
    component: () => import('./components/admissionDecision/Delete.vue')
  },
  {
    path: '/enrollment',
    name: 'enrollment',
    component: () => import('./components/enrollment/Index.vue')
  },
  {
    path: '/enrollment/create',
    component: () => import('./components/enrollment/Create.vue')
  },
  {
    path: '/enrollment/:id/',
    component: () => import('./components/enrollment/Detail.vue')
  },
  {
    path: '/enrollment/edit/:id/',
    component: () => import('./components/enrollment/Edit.vue')
  },
  {
    path: '/enrollment/delete/:id/',
    component: () => import('./components/enrollment/Delete.vue')
  },
  {
    path: '/program',
    name: 'program',
    component: () => import('./components/program/Index.vue')
  },
  {
    path: '/program/create',
    component: () => import('./components/program/Create.vue')
  },
  {
    path: '/program/:id/',
    component: () => import('./components/program/Detail.vue')
  },
  {
    path: '/program/edit/:id/',
    component: () => import('./components/program/Edit.vue')
  },
  {
    path: '/program/delete/:id/',
    component: () => import('./components/program/Delete.vue')
  },
  {
    path: '/:path(.*)',
    component: () => import('./components/NotFound.vue')
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router