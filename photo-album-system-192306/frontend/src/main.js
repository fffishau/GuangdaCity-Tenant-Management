import { createApp } from 'vue';
import { createRouter, createWebHashHistory } from 'vue-router';
import App from './App.vue';
import Login from './components/Login.vue';
import Register from './components/Register.vue';
import UserPanel from './components/UserPanel.vue';
import AdminPanel from './components/AdminPanel.vue';
import { getCurrentUser } from './utils/storage.js';

const routes = [
  {
    path: '/',
    name: 'Login',
    component: Login,
    meta: { title: '相簿管理系統 - 登入 By HAISNAP' }
  },
  {
    path: '/register',
    name: 'Register',
    component: Register,
    meta: { title: '相簿管理系統 - 註冊 By HAISNAP' }
  },
  {
    path: '/user',
    name: 'UserPanel',
    component: UserPanel,
    meta: { requiresAuth: true, role: 'user', title: '我的相簿 By HAISNAP' }
  },
  {
    path: '/admin',
    name: 'AdminPanel',
    component: AdminPanel,
    meta: { requiresAuth: true, role: 'admin', title: '管理員後台 By HAISNAP' }
  }
];

const router = createRouter({
  history: createWebHashHistory(),
  routes
});

router.beforeEach((to, from, next) => {
  document.title = to.meta.title || '相簿管理系統 By HAISNAP';
  
  const currentUser = getCurrentUser();
  
  if (to.meta.requiresAuth) {
    if (!currentUser) {
      next('/');
      return;
    }
    
    if (to.meta.role && currentUser.role !== to.meta.role) {
      if (currentUser.role === 'admin') {
        next('/admin');
      } else {
        next('/user');
      }
      return;
    }
  }
  
  if (currentUser && to.path === '/') {
    if (currentUser.role === 'admin') {
      next('/admin');
    } else {
      next('/user');
    }
    return;
  }
  
  next();
});

const app = createApp(App);
app.use(router);
app.mount('#app');