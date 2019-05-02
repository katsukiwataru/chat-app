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
  //- button.test(@click="() => test()") test
  .textArea
    p.textBox
      input.messageInput(
        type='text'
        placeholder="メッセージ内容を入力してください"
        ref="messageBox"
        @input="(e) => updataInput(e)"
        @keyup="(e) => submitData(e)"
      )

</template>

<script>
import firebase from '~/plugins/firebase'

export default {
  components: {
  },
  data () {
    return {
      isLogin: false,
      user: [],
      chatData: [],
      message: ""
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
    },
    logout () {
      firebase.auth().signOut()
    },
    submitData (e) {
      if (e.keyCode === 13) {
        const uid = firebase.auth().currentUser.uid
        const newPostKey = firebase.database().ref().child('posts').push().key
        firebase.database().ref(`user/${uid}/${newPostKey}`).set({
          message: this.message,
        })
        this.resetInput(e)
      }
    },
    updataInput (e) {
      this.message = e.target.value
    },
    resetInput (e) {
      e.target.value = ""
    },
    test () {
      // const reference = firebase.database().ref().child('user')
      // reference.on('child_added', (snapshot) => {
      //   console.log(snapshot, reference, firebase.auth().currentUser.uid, firebase.database().ref().child('user').key)
      // })
      // const uid = firebase.auth().currentUser.uid
      // const postData = {
      //   author: "username",
      // }
      // const newPostKey = firebase.database().ref().child('posts').push().key
      // console.log(newPostKey)
      // const updates = {}
      // updates[`user/${uid}/${newPostKey}`] = postData
      // return firebase.database().ref().update(updates)
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
  & .textArea {
    width: 80%;
    height: 70vh;
    margin: 0 auto;
    position: relative;
    & .textBox {
      position: absolute;
      bottom: 0;
      right: 0;
      overflow: scroll;
      width: 100%;
      & .messageInput {
        width: 100%;
      }
    }
  }
  & .isLogout {
    display: flex;
  }
}
</style>
