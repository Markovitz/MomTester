import Vue from 'vue'
import Vuex from 'vuex'
import authAxios from '../auth-axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    token: null,
    userId: null,
  },
  mutations: {
    auth(state, payload) {
      state.token = payload.token;
      state.userId = payload.userId;
    }
  },
  actions: {
    async login({commit}, payload) {
      try{
        let response = await authAxios.post('accounts:signInWithPassword?key=AIzaSyCzTKIT79uVw8Ri6zbBRIvD2ZNpUA2AMHM ', payload);
        commit('auth', {
          token: response.data.idToken,
          userId: response.data.localId
        });
        console.log('login', response);        
      }catch(err){
        console.log('login', err);
      }
    },
    async register({commit}, payload) {
      try{
        let response = await authAxios.post('accounts:signUp?key=AIzaSyCzTKIT79uVw8Ri6zbBRIvD2ZNpUA2AMHM ', payload);
        commit('auth', {
          token: response.data.idToken,
          userId: response.data.localId
        });
        console.log('register',response);
      }catch(err){
        console.log('register',err);
      }
    }
  },
  modules: {
  }
})
