import axios from "axios";

const state = { 
    token: null,
    user: null,
    loading: false,
    loginFailed: false
};

const mutations = { 
    SET_TOKEN(state, token) {
        state.token = token; 
    },
    SET_USER(state, user) {
        state.user = user; 
    },
    LOGIN_PENDING (state) { 
        state.loading = true;
    },
    LOGIN_SUCCESS (state) {
        state.loading = false; 
    },
    SET_LOGINFAILED(state) {
        state.loginFailed = true; 
    },
    CLEAR_LOGINFAILED(state) {
        state.loginFailed = false; 
    },
};

const actions = { 
    login({ commit },payload) {
        commit('LOGIN_PENDING');
        return axios.post("/api/login",payload).then((response) => { 
            if(response.data.success){
                localStorage.setItem("token", response.data.token); 

                commit("SET_USER", response.data.user);
                commit("SET_TOKEN", response.data.token);
            } else {
                commit("SET_LOGINFAILED");
            }
            commit('LOGIN_SUCCESS');
        }); 
    },
    clear_loginfailed ({ commit }) {
      commit('CLEAR_LOGINFAILED');
    },
    logout ({ commit }) {
        return new Promise((resolve) => { 
            localStorage.removeItem("token"); 
            commit('SET_TOKEN', null); 
            resolve();
        }); 
    },
    checkTokenValid({ commit },payload) {
        commit('LOGIN_PENDING');
        return axios.post("/api/login/check",payload).then((response) => { 
            if(response.data.success){
                commit("SET_USER", response.data.user);
                commit("SET_TOKEN", response.data.user.token);
            } else {
                commit("SET_LOGINFAILED");
            }
            commit('LOGIN_SUCCESS');
        }); 
    }
};

const getters = { 
    token: (state) => state.token,
    user: (state) => state.user,
    loading: state => state.loading,
    loginFailed: state => state.loginFailed,
};

const loginModule = { 
  state,
  mutations,
  actions,
  getters,
};

export default loginModule;