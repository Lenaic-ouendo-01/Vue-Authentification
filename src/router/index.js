import { createRouter, createWebHistory } from 'vue-router'
import LogIn from '../views/LogIn.vue'
import axios from 'axios';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'login',
      component: LogIn
    },
    
    {
      path: '/protected-page',
      name: 'protectedpage',
      component: () => import("../views/ProtectedPage.vue")
    },
    {
      path: '/signup',
      name: 'signup',
      component: () => import('../views/SignUp.vue')
    },
    {
      path: '/forgotten-passwords',
      name: 'forgottenpasswords',
      component: () => import('../views/ForgottenPasswords.vue')
    }
  ]
})

router.beforeEach(async (to) => {
  let isAuthenticated = false
  const config = {
    headers:{
      Authorization: 'Bearer ' + localStorage.getItem('token'),    
    }
  };
  const url = "http://127.0.0.1:8000/api/me";
  axios
  .get(url, config)
  .then(res=> {
    console.log(res)
    if(res.status === 200){
      isAuthenticated = true;
      if ( !isAuthenticated && to.name !== 'signup' && to.name !== 'login') {
        // redirect the user to the login page
        return ({ name: 'login' })
      }
    }
  })
  .catch(err=> {
    console.log(err)
  }) 
})

export default router
