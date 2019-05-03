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
    p(
      v-for="messain in getMessages"
    ) {{ messain }}
</template>

<script>
import firebase from '~/plugins/firebase'
import { mapGetters, mapActions } from 'vuex'

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
  computed: {
    ...mapGetters(['getMessages'])
  },
  beforeMount () {
    firebase.auth().onAuthStateChanged(user =>{
      if (user) {
        this.isLogin = true
        this.user = use
      } else {
        this.isLogin = false
        this.user = []
      }
      console.log(this.user)
    })
  },
  methods: {
    submitData (e) {
      if (e.keyCode === 13) {
        const uid = firebase.auth().currentUser.uid
        const newPostKey = firebase.database().ref().child('posts').push().key
        firebase.database().ref(`user/${uid}/${newPostKey}`).set({
          message: this.message,
        })
        // const messageRef = firebase.firestore().collection("cities").doc("SF")
        // .then((doc)=>{
        //   console.log("Document data:", doc.data())
        // })
        // console.log(messageRef)
        this.fetch()
        this.resetInput(e)
      }
    },
    updataInput (e) {
      this.message = e.target.value
    },
    resetInput (e) {
      e.target.value = ""
    },
    fetch () {
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
