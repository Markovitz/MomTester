import Vue from 'vue'
import Vuex from 'vuex'
import authAxios from '../auth-axios'
import momAxios from '../mom-axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    token: null,
    userId: null,
    messages: null,
    API_KEY: null
  },
  mutations: {
    auth(state, payload) {
      state.token = payload.token;
      state.userId = payload.userId;
    },
    setMessages(state, payload) {
      state.messages = payload;
    }
  },
  actions: {
    async login({commit, state}, payload) {
      try{
        let response = await authAxios.post(`accounts:signInWithPassword?key=${state.API_KEY}`, payload);
        commit('auth', {
          token: response.data.idToken,
          userId: response.data.localId
        });
        console.log('login', response);        
      }catch(err){
        console.log('login', err);
      }
    },
    async register({commit, state}, payload) {
      try{
        let response = await authAxios.post(`accounts:signUp?key=${state.API_KEY}`, payload);
        commit('auth', {
          token: response.data.idToken,
          userId: response.data.localId
        });
        console.log('register',response);
      }catch(err){
        console.log('register',err);
      }
    },
    async getMessages({commit, state}, param) {
      if (state.userId == null) {
        return;
      }
      try{
        let {data} = await momAxios(`/mom/messages/${param.count}`);
        commit('setMessages', data);
      }catch(err){
        console.log('created error', err);
      }
    }
  },
  modules: {
  }
})
