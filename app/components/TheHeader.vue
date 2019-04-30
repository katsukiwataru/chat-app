<template lang="pug">
  div
    .login(
      key="login"
    ) user
    .buttons
      button(
        type="button"
        @click="doLogout"
      ) ログアウト
    .logiut(
        key="logout"
      )
      button(
        type="button"
        @click="doLogin"
      ) ログイン
</template>

<script>

export default {
  methods: {
    doLogout () {
    },
    doLogin () {
    }
  },
}
</script>

<style lang="scss">
</style>
