<template lang="html">
<div>
      <md-button id="login-btn" class="md-raised md-primary" @click.native="oauth" >Login</md-button>
      <div id="auth-loading">
          <md-spinner v-show="code" :md-size="45" md-indeterminate ></md-spinner>
      </div>
</div>
    
</template>

<script>

import { HOST_CONCIG, KEY_CONFIG } from '../../api/config/api-config'
import { getUrlKey } from '../../utils/string-utils'
import { mapActions, mapGetters } from 'vuex'

export default {
  name: "login",
  data() {
    return {
      oauthCode: getUrlKey('code')
    }
  },
  computed: {
    code: function () {
      if (this.oauthCode) {
        return true
      } else {
        return false
      }
    },
    ...mapGetters({
      access_token: 'access_token'
    }),
  },
  watch: {
    access_token: function(val, oldVal){
      if(val){
        this.goMain()
      }
    }
  },
  mounted() {
    this.checkUrl();
  },
  methods: {
    ...mapActions([
      'login'
    ]),
    checkUrl() {
      if (this.code) {
        this.login(this.oauthCode)
      }
    },
    oauth() {
      var client_id = KEY_CONFIG.app_key;
      var redirect_uri = KEY_CONFIG.redirect_uri;
      var oauthUrl = HOST_CONCIG.oauth;
      window.open(oauthUrl + '?client_id=' + client_id + '&redirect_uri=' + redirect_uri, "_self", "", true);
    },
    goMain() {
      let vue = this
      setTimeout(function () {
        vue.$router.replace({ name: 'main' });
      }, 2000);
    }
  },

}
</script>

<style lang="css">
#login-btn {
  position: absolute;
  bottom: 20vw;
  width: 240px;
  margin-left: -120px;
  text-transform: none;
  font-size: 14px;
  padding: 4px 0;
  border-radius: 25px;
}

#auth-loading {
  background: #ffffff;
  position: absolute;
  width: 240px;
  height: 56px;
  margin-left: -120px;
  margin-top: -56px;
  left: 50%;
  top: 50%;
}
</style>
