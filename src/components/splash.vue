<template lang="html">
    <div class="splash">
        <div class="info">
            <div class="info-content">
                <h3 class="project-name" >Pixel-Web</h3>
                <div class="project-desc">
                    <p>有时候啊 你总是在追赶前面的人</p>
                    <p>总是抱怨自己为什么不能再努力一点</p>
                    <p>累了你可以停下来 看看原来的自己</p>
                    <p>其实你已经很了不起了</p>
                    <p>这是我的第一个 Vue 项目</p>
                    <p>感谢帮助过我的人</p>
                </div>
                <div class="logining " :class="loginState?'show': ''">
                    <pixel-spinner :size="'45px'" :color="'#007AFF'"></pixel-spinner>
                </div>
            </div>
            <button class="login" v-on:click="oauth">登录</button>
            <div class="info-footer">
                <div class="header">
                    <img class="avatar"   src="../assets/icon.png">
                </div>
                <div class="wanbo">
                    <h2 class="name" >wanbo</h2>
                    <span class="desc">前面右转的第二排架子上就有啊</span>
                </div>
                <div class="follower">
                    <img v-on:click="goMyGithub" class="avatar"   src="../assets/github.png">
                    <img v-on:click="goMyWeibo"  class="avatar"   src="../assets/weibo.png">
                </div>
            </div>
        </div>
        <div id="particles-js"></div>
    </div>
      
</template>
 
<script>
import { mapActions, mapGetters } from 'vuex'
import { HOST_CONCIG, KEY_CONFIG, DEBUG } from '../api/config/api-config'
import { getUrlKey } from '../utils/string-utils'
require('particles.js')
export default {
    name: "splash",
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
            loginState: 'login'
        }),
    },
    watch: {
        loginState: function (val, oldVal) {
            if (val) {
                this.goMain()
            }
        }
    },
    mounted() {
        this.$nextTick(() => {
            this.initParticleJS()
        })
        this.checkUrl()
    },
    methods: {
        ...mapActions([
            'login'
        ]),
        checkUrl() {
            var vue = this
            if (vue.loginState) {
                vue.goMain()
            } else {
                if (vue.code) {
                    vue.login(vue.oauthCode)
                }
            }
        },
        oauth() {
            var vue = this
            if (DEBUG) {
                vue.goMain()
            } else {
                var client_id = KEY_CONFIG.app_key;
                var redirect_uri = KEY_CONFIG.redirect_uri;
                var oauthUrl = HOST_CONCIG.oauth;
                window.open(oauthUrl + '?client_id=' + client_id + '&redirect_uri=' + redirect_uri, "_self", "", true);
            }
        },
        goMain() {
            let vue = this
            setTimeout(function () {
                vue.$router.replace({ name: 'main' });
            }, 2000)
        },
        goMyWeibo() {
            window.open('http://weibo.com/singerwannber', "", true);
        },
        goMyGithub() {
            window.open('https://github.com/Werb', "", true);
        },
        initParticleJS() {
            particlesJS('particles-js', {
                "particles": {
                    "number": {
                        "value": 80,
                        "density": {
                            "enable": true,
                            "value_area": 800
                        }
                    },
                    "color": {
                        "value": "#E4E4E4"
                    },
                    "shape": {
                        "type": "circle",
                        "stroke": {
                            "width": 0,
                            "color": "#000000"
                        },
                        "polygon": {
                            "nb_sides": 5
                        },
                        "image": {
                            "src": "img/github.svg",
                            "width": 100,
                            "height": 100
                        }
                    },
                    "opacity": {
                        "value": 0.5,
                        "random": false,
                        "anim": {
                            "enable": false,
                            "speed": 1,
                            "opacity_min": 0.1,
                            "sync": false
                        }
                    },
                    "size": {
                        "value": 10,
                        "random": true,
                        "anim": {
                            "enable": false,
                            "speed": 40,
                            "size_min": 0.1,
                            "sync": false
                        }
                    },
                    "line_linked": {
                        "enable": true,
                        "distance": 150,
                        "color": "#D1D1D1",
                        "opacity": 0.4,
                        "width": 1
                    },

                    "move": {
                        "enable": true,
                        "speed": 2,
                        "direction": "none",
                        "random": false,
                        "straight": false,
                        "out_mode": "out",
                        "attract": {
                            "enable": false,
                            "rotateX": 600,
                            "rotateY": 1200
                        }
                    }
                },
                "interactivity": {
                    "detect_on": "canvas",
                    "events": {
                        "onhover": {
                            "enable": true,
                            "mode": "grab"
                        },
                        "onclick": {
                            "enable": true,
                            "mode": "push"
                        },
                        "resize": true
                    },
                    "modes": {
                        "grab": {
                            "distance": 100,
                            "line_linked": {
                                "opacity": 1
                            }
                        },
                        "bubble": {
                            "distance": 400,
                            "size": 40,
                            "duration": 2,
                            "opacity": 8,
                            "speed": 3
                        },
                        "repulse": {
                            "distance": 200
                        },
                        "push": {
                            "particles_nb": 4
                        },
                        "remove": {
                            "particles_nb": 2
                        }
                    }
                },

                "retina_detect": true
            });
        }
    }
}
</script>
 
<style lang="css">
.splash {
    width: 100%;
    height: 100%;
    background: #ffffff;
    opacity: .9;
    position: relative;
}

.splash .info {
    width: 100%;
    height: 100%;
}

.splash .info .info-content {
    width: 100%;
    position: absolute;
    top: 6rem;
}

.splash .info .info-content .project-name {
    margin: 0;
    padding: 0;
    text-align: center;
    font-size: 2rem;
}

.splash .info .info-content .project-desc {
    margin: 0;
    padding: 0;
    text-align: center;
    padding-top: 2rem;
}

.splash .info .info-content .logining {
    margin-top: 4rem;
    opacity: .9rem;
    opacity: 0;
}

.splash .info .info-content .logining.show {
    opacity: 1;
}

.splash .info .login {
    width: 60vw;
    height: 3.5rem;
    background-color: #000000;
    color: #ffffff;
    margin-left: 20vw;
    border-radius: 25px;
    border-style: none;
    position: absolute;
    bottom: 10rem;
}

.splash .info .info-footer {
    width: 100%;
    height: 6rem;
    background-color: #ffffff;
    position: absolute;
    bottom: 0;
    border-top: 1px solid #eeeeee;
    display: flex;
    flex-flow: row;
}

.splash .info .info-footer .header {
    width: 4rem;
    height: 4rem;
    margin: 1rem;
}

.splash .info .info-footer .avatar {
    border-radius: 50%;
    border: 1px solid rgba(0, 0, 0, .05);
}

.splash .info .info-footer .wanbo {
    display: flex;
    flex-flow: column;
}

.splash .info .info-footer .wanbo .name {
    margin: 0;
    padding: 0;
    font-size: 1.4rem;
    margin-top: 1.3rem;
    font-weight: 500;
}

.splash .info .info-footer .wanbo .desc {
    margin: 0;
    padding: 0;
    flex: 1;
    font-size: 1rem;
    font-weight: 500;
}

.splash .info .info-footer .follower {
    width: 10rem;
    height: 100%;
    position: absolute;
    right: 0;
    display: flex;
    flex-flow: row;
}

.splash .info .info-footer .follower .avatar {
    width: 2.5rem;
    height: 2.5rem;
    margin-top: 1.75rem;
    margin-left: 1.75rem;
    border-radius: 50%;
}

#particles-js {
    background-size: cover;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: -1;
}
</style>