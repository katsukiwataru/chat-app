import firebase from '~/plugins/firebase.js'

export const state = () => ({
  user: null,
  isLoggedIn: false,
})

export const getters = {
  user: state => state.user,
  isLoggedIn: state => state.isLoggedIn,
}

export const mutations = {
  setUser(state, { account }) {
    state.user = account
    state.isLoggedIn = true
  },
  updateUser(state, { user }) {
    state.user = user
  },
  deleteUser() {
    state.user = null
    state.isLoggedIn = false
  }
}

export const actions = {
  twitterSignIn({dispatch}) {
    firebase.auth().signInWithPopup(new firebase.auth.TwitterAuthProvider())
    dispatch('twitterAuthStateChanged')
  },
  twittersignOut({ dispatch }) {
    firebase.auth().signOut()
    dispatch('twitterAuthStateChanged')
  },
  twitterAuthStateChanged({ commit }) {
    firebase.auth().onAuthStateChanged(account => {
      if (account) {
        commit('setUser', account)
      } else {
        commit('deleteUser')
      }
    })
  },
}
