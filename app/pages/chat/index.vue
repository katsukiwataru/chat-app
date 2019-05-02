<template lang="pug">
.inner
  .textArea
    .textBox
      p.messageItem(
        v-for="obj in Object.values(val)"
        class="right"
      ) {{ obj.message }}
    input.messageInput(
      type='text'
      placeholder="メッセージを入力"
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
      message: "",
      val: {}
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
        this.test()
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
      const uid = firebase.auth().currentUser.uid
      const reference = firebase.database().ref(`user/${uid}`)
      reference.on('value', (snapshot) => {
        this.val = snapshot.val()
      })
    }
  }
}
</script>

<style lang="scss">

.messageItem{
  width: max-content;
  margin: 0;
  padding: 10px;
  border: 1px solid;
  border-radius: 15px;
  background: cornflowerblue;
  color: white;
}
</style>
