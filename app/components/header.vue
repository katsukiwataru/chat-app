<template lang="pug">
div
  header
    h1.title chat app
    .login(
      v-if="user"
      key="login"
    )
      button(
        type="button"
      ) ログアウト
    .login(
      v-else
      key="logout"
    )
      button(
        type="button"
      ) ログイン
</template>

<script>
export default {
  data() {
    return {
      user: {}
    }
  },
}
</script>

<style lang="scss">
</style>
