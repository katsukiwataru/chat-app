import firebase from '~/plugins/firebase.js'

export const state = () => ({
  user: null,
  isLoggedIn: false,
  messages: []
})

export const getters = {
  user: state => state.user,
  isLoggedIn: state => state.isLoggedIn,
  getMessages: state => state.messages
}

export const mutations = {
  setUser(state, { user }) {
    state.user = user
    state.isLoggedIn = true
  },
  updateUser(state, { user }) {
    state.user = user
  },
  deleteUser() {
    state.user = null
    state.isLoggedIn = false
  },
  updataMessage(state, messages) {
    state.messages = messages
  }
}

export const actions = {
  twitterSignIn({dispatch}) {
    firebase.auth().signInWithRedirect(new firebase.auth.TwitterAuthProvider())
    dispatch('twitterAuthStateChanged')
  },
  twittersignOut({ dispatch }) {
    firebase.auth().signOut()
    dispatch('twitterAuthStateChanged')
  },
  twitterAuthStateChanged({ commit }) {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        commit('setUser', user)
      } else {
        commit('deleteUser')
      }
    })
  },
  fetchMessagesData({ commit }) {
    const uid = firebase.auth().currentUser.uid
    const reference = firebase.database().ref(`user/${uid}`)
    reference.on('value', (snapshot) => {
      commit('updataMessage', snapshot.val())
    })
  }
}
