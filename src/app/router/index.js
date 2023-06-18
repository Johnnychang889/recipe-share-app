import { createRouter, createWebHistory } from 'vue-router';
import NotFound from '../components/NotFound.vue';
import LoginBox from '../components/login/LoginBox.vue';
import DishList from '../components/dish/DishList.vue'
import DishDetail from '../components/dish/DishDetail.vue'
import ShareRecipe from '../components/dish/ShareRecipe.vue'

const router = createRouter({ 
  history: createWebHistory(), 
  routes: [
    {
      path: '/login', 
      component: LoginBox,
      beforeEnter: (to, from, next) => {
        const token = localStorage.getItem("token"); 
        if (token) 
          next('/dishes');
        else 
          next();
      }
    },
    {
      path: "/",
      redirect: "/dishes",
    },
    {
      path: '/:pathMatch(.*)*',
      component: NotFound
    },
    {
      path: "/dishes",
      component: DishList
    },
    {
      path: "/dishes/:id",
      component: DishDetail,
      props: true,
      beforeEnter: (to, from, next) => {
        const id = to.params.id;
        // if (!["1", "2", "3", "test1", "test2", "test3"].includes(id)) 
        //   next('/not-found'); 
        // else 
        next();
      }
    },
    {
      path: "/share",
      component: ShareRecipe,
    }
  ],
});

	
router.beforeEach((to, from, next) => {
  const token = localStorage.getItem("token");
  if (!token && to.path !== '/login' && to.path !== '/dishes') 
    next('/login'); 
  else 
    next();
});

export default router;