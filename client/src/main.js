// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import Axios from 'axios'
import VueAxios from 'vue-axios'
import VueLazyload from 'vue-lazyload'
import VueInfiniteScroll from 'vue-infinite-scroll'

import './assets/css/base.css'
import './assets/css/checkout.css'
import './assets/css/product.css'
import { currency } from './util/currency'
Vue.filter('currency', currency)
Vue.use(VueInfiniteScroll)
Vue.use(VueLazyload, {
  loading: 'static/loading-svg/loading-bars.svg',
  try: 3
})
Vue.use(VueAxios, Axios)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App },
  mounted () {
    this.checkLogin()
    this.getCartCount()
  },
  methods: {
    checkLogin () {
      this.$http.get('/users/checkLogin')
                .then(res => {
                  res = res.data
                  if (res.status === 0) {
                    this.$store.commit('updateUserInfo', res.result)
                  } else {
                    if (this.$route.path !== '/') {
                      this.$router.push('/')
                    }
                  }
                })
    },
    getCartCount () {
      this.$http.get('/users/getCartCount')
                .then(res => {
                  res = res.data
                  if (res.status === 0) {
                    this.$store.commit('updateCartCount', res.result)
                  }
                })
    },
    login () {
            // 需要获取表单的用户名和密码给后端接口
      if (!this.userName || !this.userPwd) {
        this.errorTip = true
        return false
      }

      this.$http.post('/users/login', {
        userName: this.userName,
        userPwd: this.userPwd
      }).then((response) => {
        let res = response.data
        if (res.status === '0') {
          this.loginModalFlag = false
          this.nickName = res.result.userName
        } else {
          this.errorTip = true
        }
      })
                // this.loginModalFlag = true;
    },
    logout () {
      this.$http.post('/users/logout', '').then((response) => {
        let res = response.data
        if (res.status === '0') {
          this.nickName = ''
        }
      })
    }
  }
})
