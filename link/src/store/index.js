import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    id: ''
  },
  mutations: {
    NewId(state, id){
      state.id = id;
    }
  },
  actions: {
    NewId(ctx, id){
      ctx.commit('NewId', id)
    }
  },
  getters:{
    getId: (state)=> state.id
  }
})
