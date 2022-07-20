export const getters = {
    isAuthenticated(state) {
      return state.auth.loggedIn
    },
  
    loggedInUser(state) {
      return state.auth.user
    }
  }

  export const state = () => ({
    token: ''
})

export const mutations = {
    updateData (state,data) {
      state.token = data.token
      state.auth.user = data
    },
    clearData(state) {
      state.token = ''
      state.auth.user = ''
    }
 }