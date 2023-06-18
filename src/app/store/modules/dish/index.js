import axios from 'axios';

const state = {
  dishItems: [] 
}

const mutations = {
  UPDATE_DISH_ITEMS (state, payload) {
    state.dishItems = payload;
  }
}

const actions = {
  getDishItems ({ commit }) {
    axios.get(`/api/dishes`).then((response) => {
      commit('UPDATE_DISH_ITEMS', response.data)
    });
  },
  addDishItem ({ commit }, dishItem) {
    return axios.post('/api/dishes', dishItem).then((response) => {
      commit('UPDATE_DISH_ITEMS', response.data)
    });
  },
  removeDishItem ({ commit }, dishItem) {
    axios.post('/api/dishes/delete', dishItem).then((response) => {
      commit('UPDATE_DISH_ITEMS', response.data)
    });
  },
  addLikeNumber ({ commit, getters }, dishId) {
    const dish = getters.dishItemFromId(dishId)
    if(!dish) return;
    axios.post('/api/dishes/like', dish).then((response) => {
      commit('UPDATE_DISH_ITEMS', response.data)
    });
  },
  minusLikeNumber ({ commit, getters }, dishId) {
    const dish = getters.dishItemFromId(dishId)
    if(!dish) return;
    axios.post('/api/dishes/dislike', dish).then((response) => {
      commit('UPDATE_DISH_ITEMS', response.data)
    });
  }
}

const getters = {
  dishItems: state => state.dishItems,
  dishItemFromId: (state) => (id) => {
    return state.dishItems.find(dishItem => dishItem.id === id) 
  }
}

const dishModule = {
  state,
  mutations,
  actions,
  getters
}

export default dishModule;
