<template lang="html">
      <h1 style="background">Pixel-Web</h1>
</template>
 
<script>
import { mapActions, mapGetters } from 'vuex'
export default {
  name: "splash",
  computed: {
    ...mapGetters([
      'token'
    ]),
  },
  mounted() {
    this.checkOAuth();
  },
  methods: {
    ...mapActions([
      'getToken'
    ]),
    checkOAuth() {
      let vue = this
      vue.getToken();
      let token = this.token;
      setTimeout(function () {
        if (!token) {
          vue.goLogin();
        } else {
          vue.goMain();
        }
      }, 1500);
    },
    goLogin() {
      this.$router.replace({ name: 'login' });
    },
    goMain() {
      this.$router.replace({ name: 'main' });
    }
  }
}
</script>
 
<style lang="css">
h1 {
  background: white;
}
</style>