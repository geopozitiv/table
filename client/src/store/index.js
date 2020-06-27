import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    users: [],
    selected: []
  },
  mutations: {
    addUsers(state, data) {
      state.users = data
    },
    addNewUser(state, data) {
      state.users.push(data)
    },
    addSelected(state, data) {
      state.selected = data
    },
  },
  actions: {
    getUsers({commit}, data) {
      axios.get('http://localhost:4000/user')
      .then((response) => {
         commit('addUsers', response.data)
      }).catch(err => console.log(err))
    },
    deleteUser({dispatch, commit, state}, data) {
      axios.delete('http://localhost:4000/user/delete', {data:state.selected})
      .then((response) => {
         commit('addSelected', []);
         dispatch('getUsers');
      }).catch(err => console.log(err))
    }
  },
})
