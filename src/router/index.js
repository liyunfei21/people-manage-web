import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export const constantRouterMap = [
  {
    path: '/',
    redirect: '/login',
    hidden: true
  },
  {
    path: '/login',
    name: '登录页面',
    hidden: true,
    component: resolve => require(['../views/login'], resolve)
  },
  { path: '/404', component: () => import('@/views/errorPage/404'), hidden: true },
  { path: '/401', component: () => import('@/views/errorPage/401'), hidden: true },
  {
    path: '/poverty',
    index: '0',
    name: 'poverty',
    redirect: '/poverty/povertyPeopleManage',
    hidden: false,
    meta: { title: 'povertyPeopleManage', icon: 'icon iconfont icon-my_peoples' },
    component: resolve => require(['../components/common/Home.vue'], resolve),
    children: [
      {
        index: '0-1',
        path: '/poverty/povertyPeopleManage',
        name: 'povertyPeopleManage',
        component: resolve => require(['../views/people/family/poverty-people-manage'], resolve),
        meta: { title: 'povertyPeopleManage', icon: 'icon iconfont icon-my_peoples', parent: false }
      },
      {
        index: '0-2',
        path: '/poverty/info',
        name: 'info',
        hidden: true,
        component: resolve => require(['../views/people/family/info'], resolve),
        meta: { title: 'info', icon: 'icon iconfont icon-my_peoples' }
      },
      {
        index: '0-3',
        path: '/poverty/infoRefresh',
        name: 'infoRefresh',
        hidden: true,
        component: resolve => require(['../views/people/family/infoRefresh'], resolve),
        meta: { title: 'infoRefresh', icon: 'icon iconfont icon-my_peoples' }
      }
    ]
  },
  {
    path: '/help',
    index: '1',
    name: 'help',
    component: resolve => require(['../components/common/Home.vue'], resolve),
    redirect: '/help/helpPerson',
    meta: { title: 'help', icon: 'icon iconfont icon-my_people' },
    children: [
      {
        index: '1-1',
        path: '/help/helpPerson',
        name: 'helpPerson',
        component: resolve => require(['../views/people/help/help-person'], resolve),
        meta: { title: 'helpPerson', parent: false, icon: 'icon iconfont icon-my_people' }
      },
      {
        index: '1-1-1',
        path: '/help/helpedPerson',
        name: 'helpedPerson',
        hidden: true,
        component: resolve => require(['../views/people/help/helped-person'], resolve),
        meta: { title: 'helpedPerson', icon: 'icon iconfont icon-my_people', parent: { path: '/help/helpPerson', title: 'helpPerson' }}
      },
      {
        index: '1-3',
        path: '/help/screen',
        name: 'screen',
        hidden: true,
        component: resolve => require(['../views/people/help/screen'], resolve),
        meta: { title: 'screen', icon: 'icon iconfont icon-my_people' }

      },
      {
        index: '1-4',
        path: '/help/help_person-sign',
        name: 'help-sign',
        component: resolve => require(['../views/people/help/help-sign'], resolve),
        meta: { title: 'help-sign', parent: false, icon: 'icon iconfont icon-my_people' }
      },
      {
        index: '1-5',
        path: '/help/help_person-sign-info',
        name: 'help-sign-info',
        hidden: true,
        component: resolve => require(['../views/people/help/help-sign-info'], resolve),
        meta: { title: 'help-sign-info', icon: 'icon iconfont icon-my_people', parent: { path: '/help/help_person-sign', title: 'help-sign' }}

      }
    ]
  },
  {
    path: '/project',
    index: '5',
    name: 'projectMaintenance',
    redirect: '/project/povertyAlleviationProject',
    meta: { title: 'projectMaintenance', icon: 'icon iconfont icon-my_picture' },
    component: resolve => require(['../components/common/Home.vue'], resolve),
    children: [
      {
        index: '5-1',
        path: '/project/povertyAlleviationProject',
        name: 'poverty-alleviation-project',
        component: resolve => require(['../views/project/poverty-alleviation-project-maintenance'], resolve),
        meta: { title: 'povertyAlleviationProject', parent: false, icon: 'icon iconfont icon-my_picture' }
      },
      {
        index: '5-2',
        path: '/project/projectFundingProgress',
        name: 'project-funding-progress',
        component: resolve => require(['../views/project/project-funding-progress'], resolve),
        meta: { title: 'projectFundingProgress', parent: false, icon: 'icon iconfont icon-my_picture' }
      },
      {
        index: '5-3',
        hidden: true,
        path: '/project/beneficiary',
        name: 'project-beneficiary',
        component: resolve => require(['../views/project/beneficiary'], resolve),
        meta: { title: 'beneficiary', parent: { path: '/project/povertyAlleviationProject', title: 'povertyAlleviationProject' }, icon: 'icon iconfont icon-my_picture' }
      }
    ]
  },
  {
    path: '/policy',
    index: '2',
    name: 'PovertyAlleviationPolicy',
    redirect: '/policy/PovertyAlleviationPolicy',
    component: resolve => require(['../components/common/Home.vue'], resolve),
    meta: { title: 'policy', icon: 'icon iconfont icon-my_document' },
    children: [
      {
        index: '2-1',
        path: '/policy/PovertyAlleviationPolicy',
        name: 'PovertyAlleviationPolicy',
        component: resolve => require(['../views/policy/poverty-alleviation-policy.vue'], resolve),
        meta: { title: 'PovertyAlleviationPolicy', icon: 'icon iconfont icon-my_document', parent: false }
      }, {
        hidden: true,
        index: '2-2',
        path: '/policy/create',
        name: 'policy_create',
        component: resolve => require(['../views/policy/poverty-alleviation-policy-create.vue'], resolve),
        meta: { title: 'policy_create', parent: { path: '/policy/PovertyAlleviationPolicy', title: 'PovertyAlleviationPolicy' }, icon: 'icon iconfont icon-my_document' }
      }, {
        index: '2-3',
        hidden: true,
        path: '/policy/modify',
        name: 'policy_modify',
        component: resolve => require(['../views/policy/poverty-alleviation-policy-modify.vue'], resolve),
        meta: { title: 'policy_modify', parent: { path: '/policy/PovertyAlleviationPolicy', title: 'PovertyAlleviationPolicy' }, icon: 'icon iconfont icon-my_document' }
      }, {
        index: '2-3',
        hidden: true,
        path: '/policy/info',
        name: 'policy_info',
        component: resolve => require(['../views/policy/poverty-alleviation-policy-info.vue'], resolve),
        meta: { title: 'policy_info', parent: { path: '/policy/PovertyAlleviationPolicy', title: 'PovertyAlleviationPolicy' }, icon: 'icon iconfont icon-my_document' }
      }
    ]
  },
  {
    path: '/effect',
    index: '3',
    name: 'effect',
    redirect: '/effect/manage',
    component: resolve => require(['../components/common/Home.vue'], resolve),
    meta: { title: 'effect', icon: 'icon iconfont icon-my_up' },
    children: [
      {
        index: '3-1',
        path: '/effect/manage',
        name: 'effect-manage',
        component: resolve => require(['../views/effect/effect-manage'], resolve),
        meta: { title: 'effect', icon: 'icon iconfont icon-my_up', parent: false }
      }
    ]
  },
  {
    name: 'sys',
    path: '/sys',
    index: '6',
    redirect: '/sys/account',
    component: resolve => require(['../components/common/Home.vue'], resolve),
    meta: { title: 'sys', icon: 'icon iconfont icon-my_setting' },
    children: [
      {
        path: '/sys/account',
        index: '6-1',
        name: 'sys-account',
        component: resolve => require(['../views/sys/account'], resolve),
        meta: { title: 'sys-account', icon: 'icon iconfont icon-my_setting', parent: false }
      }
    ]
  }
]

export default new Router({
  // mode: 'history',
  routes: constantRouterMap
})
// 异步挂载的路由
// 动态需要根据权限加载的路由表
export const asyncRouterMap = [
  {
    path: '/permission',
    name: 'permission',
    hidden: true,
    index: '3',
    meta: {
      title: 'permission',
      icon: 'el-icon-setting',
      roles: ['admin']
    },
    component: resolve => require(['../components/common/Home.vue'], resolve),
    children: [
      {
        index: '3-1',
        name: 'permission',
        path: '/permission',
        meta: {
          title: 'permission', icon: 'el-icon-setting', roles: ['admin']
        },
        component: resolve => require(['../components/page/permission.vue'], resolve)
      }
    ]
  },
  {
    path: '*', redirect: '/404', hidden: true
  }
]

