import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    orderList: [],
    menuList: [
      {
        title:'Americano',
        price: 2000,
        selected: true,
        image: 'https://source.unsplash.com/featured/?Americano'
      },
      {
        title:'Greentea Latte',
        price: 3500,
        selected: false,
        image: 'https://source.unsplash.com/featured/?greentealatte'
      },
      {
        title:'Lemonade',
        price: 4000,
        selected: false,
        image: 'https://source.unsplash.com/featured/?Lemonade'
      },
    ],
    sizeList: [
      {
        name: 'small',
        price: 500,
        selected: true
      },
      {
        name: 'medium',
        price: 1000,
        selected: false
      },
      {
        name: 'Large',
        price: 1500,
        selected: false
      },
    ],
  },
  getters: {
  },
  mutations: {
    ADD_ORDER(state, selectedMenu, selectedSize) {
      state.orderList.push(selectedMenu, selectedSize)
    //   state.orderList.push(selectedMenu) 
    //   state.orderList.push(selectedSize) 
    },
    UPDATE_MENU_LIST(state, selectedMenu) {
      const index = state.menuList.indexOf(selectedMenu)
      state.menuList[index].selected = !state.menuList[index].selected
    },
    UPDATE_SIZE_LIST(state, selectedSize) {
      const index = state.sizeList.indexOf(selectedSize)
      state.sizeList[index].selected = !state.sizeList[index].selected
    },
  },
  actions: {
    updateMenuList(context, selectedMenu) {
      context.commit('UPDATE_MENU_LIST', selectedMenu)
    },
    updateSizeList(context, selectedSize) {
      context.commit('UPDATE_SIZE_LIST', selectedSize)
    }
  },
  modules: {
  }
})