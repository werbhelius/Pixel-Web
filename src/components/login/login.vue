<template lang="html">
    <md-button id="login-btn" class="md-raised md-primary" @click.native="oauth" >Login</md-button>
</template>

<script>

import {HOST_CONCIG, KEY_CONFIG} from '../../api/config/api-config'

export default {
  name: "login",
  methods: {
    oauth() {
      var client_id = KEY_CONFIG.app_key;
      var redirect_uri = KEY_CONFIG.redirect_uri;
      var oauthUrl = HOST_CONCIG.oauth;
      window.open(oauthUrl + '?client_id=' + client_id + '&redirect_uri=' + redirect_uri, "_self", "", true);
    }
  }
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
</style>
