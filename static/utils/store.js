const store=Vuex.createStore({
    state:{
        loggedIn: false,
        current_user:null,
        role:"",
    },
    mutations:{
        setLoggedIn(state,userStatus){
            state.loggedIn=userStatus;
        },
        setUser(state,userObj){
            state.current_user=userObj;
        },
        setRole(state,userRole){
            state.role=userRole;
        },
        clearUser(state){
            sessionStorage.clear();
            state.loggedIn=false;
            state.current_user=null;
            state.role="";
        },
    },
    actions:{
        login({commit},user){
            commit('setUser',user);
        },
        logout({commit}){
            commit('clearUser');
        },
    },
    getters:{
        getCurrentUser:state=>state.current_user,
    }
});

export default store;