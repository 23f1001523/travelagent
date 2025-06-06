
import About from '../pages/about.js';
import Home from '../pages/home.js';
import TourPlanner from '../pages/tourplan.js';

// ******************** Tour *****************************************

const routes=[
    {path:'/' ,component :Home},
     {path:'/about' ,component :About},
    {path:'/tourplan', component:TourPlanner},
 
];

const router=VueRouter.createRouter({
    history: VueRouter.createWebHistory(),
    mode:'history',
    routes,
});

export default router;