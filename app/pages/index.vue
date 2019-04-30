<template lang="pug">
.inner
  .header
    h1 message app
    .isLogin(
      v-if="!isLogin"
    )
      button.LoginButton(@click="twitterLogin") Twitterでログインする
    .isLogout(v-else)
      p.userName {{ user.displayName }}
      button.LogoutButton(@click="logout") ログアウト
</template>

<script>
import firebase from '~/plugins/firebase'
import "firebase/auth"

export default {
  components: {
  },
  asyncData () {
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
      console.log(this.isLogin, this.user)
    })
  },
  methods: {
    twitterLogin () {
      const provider = new firebase.auth.TwitterAuthProvider()
      firebase.auth().signInWithPopup(provider)
    },
    logout () {
      firebase.auth().signOut()
    }
  }
}
</script>

<style lang="scss">
.inner {
  & button {
    border: none;
    font-size: 16px;
  }
  & .header {
    margin: 10px 20px;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  & .LoginButton {
  }
  & .isLogout {
    display: flex;
  }
}
</style>
