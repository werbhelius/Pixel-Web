<template lang="html">
      <h1 style="background">Pixel-Web</h1>
</template>
 
<script>
import { mapActions, mapGetters } from 'vuex'
export default {
  name: "splash",
  computed: {
    
  },
  mounted() {
    this.checkOAuth();
  },
  methods: {
    checkOAuth() {
      let vue = this
      setTimeout(function () {
          vue.goMain();
      }, 1500);
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