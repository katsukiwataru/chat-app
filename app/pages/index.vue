<template lang="pug">
.contents
  .buttons
    ul.headerNavigation.isLogin(v-if="!isLogin")
      li.headerNavigationItem(@click="twitterLogin") ログインする
    ul.headerNavigation.isLogout(v-else)
      li.headerNavigationItem(@click="logout") ログアウト
  nav.nav
    ul
      li.userName {{ user.displayName }}
      li
        nuxt-link(to="/chat/") chat
</template>

<script>
import firebase from '~/plugins/firebase'

export default {
  data () {
    return {
      isLogin: false,
      user: []
    }
  },
  beforeMount () {
    firebase.auth().onAuthStateChanged(user =>{
      if (user) {
        this.isLogin = true
        this.user = user
      } else {
        this.isLogin = false
        this.user = []
      }
      console.log(this.user)
    })
  },
  methods: {
    twitterLogin () {
      const provider = new firebase.auth.TwitterAuthProvider()
      firebase.auth().signInWithPopup(provider)
      this.$router.push({ name: 'chat', params: { loginName: this.user.displayName }})
    },
    logout () {
      firebase.auth().signOut()
    }
  },
}
</script>

<style lang="scss">
button {
  border: none;
  font-size: 16px;
}
.buttons {
  margin: 50px;
  text-align: center;
  .headerNavigation {
    .headerNavigationItem {
      padding: 20px 40px;
      border-radius: 10px;
      box-shadow: 1px 1px 5px 1px #999;
    }
  }
}
</style>
