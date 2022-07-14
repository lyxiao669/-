import { defineStore } from 'pinia'


export const useStore = defineStore('user',{
  state: ()=> ({
    token: localStorage.getItem('token')
  }),

  getters: {
    useToken: (state) => {
      return state.token
    }
  },

  actions: {
    updateToken(val: string){
      localStorage.setItem('token',val)
      this.token = val
    }
  }

})
