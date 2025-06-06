import router from './utils/router.js';
import Navbar from './components/navbar.js';
import store from './utils/store.js'

// Register the component globally (useful for testing)

const app=Vue.createApp({
template:`
   
    <div>
        <router-view/>
    </div>
`,
});

app.component('Navbar',Navbar);
app.use(router);
app.use(store);
app.mount('#app');
