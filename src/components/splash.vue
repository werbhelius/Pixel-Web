<template lang="html">
      <h1 style="background">Pixel-Web</h1>
</template>
 
<script>

import { getToken } from '../utils/token-storage';

export default {
  name: "splash",
  data() {
    return {
    };
  },
  mounted() {
    this.checkOAuth();
  },
  methods: {
    checkOAuth() {
      var vue = this;
      var token = getToken();
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