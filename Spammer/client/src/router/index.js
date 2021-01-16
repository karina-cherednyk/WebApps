import Vue from 'vue';
import VueRouter from 'vue-router';
import SendEmailsPage from '../views/SendEmailsPage.vue';
import EmailsInfoPage from  '../views/EmailInfoPage.vue'

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'SendEmailsPage',
    component: SendEmailsPage,
  },
  {
    path: '/emails',
    name: 'EmailsInfoPage',
    component: EmailsInfoPage
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
