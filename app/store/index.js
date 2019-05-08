export const strict = false
import firebase from '~/plugins/firebase'

export const state = () => ({
  user: null,
})

export const getters = {
  isAuthenticated(state) {
    return !!state.user
  }
}

export const mutations = {
  setUser (state, payload) {
    state.user = payload
  }
}

export const actions = {
  twitterSignIn({ dispatch }) {
    firebase.auth().signInWithPopup(new firebase.auth.TwitterAuthProvider())
    dispatch('test')
  },
  test({ dispatch }) {
    firebase.auth().onAuthStateChanged(account => {
      // this.$store.dispatch('twitterSignIn')
      dispatch('hoge', account)
    })
  },
  hoge ({commit}, payload) {
    commit('setUser', payload)
  }
}

// import firebase from '~/plugins/firebase.js'

// export const state = () => ({
//   user: null,
//   isLoggedIn: false,
// })

// export const getters = {
//   user: state => state.user,
//   isLoggedIn: state => state.isLoggedIn,
// }

// export const mutations = {
//   setUser(state, { account }) {
//     state.user = account
//     state.isLoggedIn = true
//   },
//   updateUser(state, { user }) {
//     state.user = user
//   },
//   deleteUser() {
//     state.user = null
//     state.isLoggedIn = false
//   }
// }

// export const actions = {
//   twitterSignIn({ dispatch }) {
//     firebase.auth().signInWithPopup(new firebase.auth.TwitterAuthProvider())
//     dispatch('twitterAuthStateChanged')
//   },
//   twittersignOut({ dispatch }) {
//     firebase.auth().signOut()
//     dispatch('twitterAuthStateChanged')
//   },
//   twitterAuthStateChanged({ commit }) {
//     firebase.auth().onAuthStateChanged(account => {
//       if (account) {
//         commit('setUser', account)
//       } else {
//         commit('deleteUser')
//       }
//     })
//   },
// }
