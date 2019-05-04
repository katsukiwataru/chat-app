<template lang="pug">
.contents
  .buttons
    ul.headerNavigation.isLogin(v-if="!$store.state.isLoggedIn")
      li.headerNavigationItem(@click="twitterLogin") ログインする
    ul.headerNavigation.isLogout(v-else)
      li.headerNavigationItem(@click="logout") ログアウト
  p(@click="test") test
  nav.nav
    ul
      li.userName
      li
        nuxt-link(to="/chat/") chat
</template>

<script>
import firebase from '~/plugins/firebase'

export default {
  data () {
    return {
      user: {}
    }
  },
  beforeMount () {
  },
  methods: {
    test() {
      console.log(this.$store.state, firebase)
    },
    twitterLogin () {
      // firebase.auth().onAuthStateChanged(account => {
      //   // this.$store.dispatch('twitterSignIn')
      //   this.user = account
      // })
      this.$store.dispatch('twitterSignIn')
    },
    logout () {
      this.user = this.$store.dispatch('twittersignOut')
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
