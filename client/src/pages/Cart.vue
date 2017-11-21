<template lang="html">
  <div class="accessory-list col-4">
    <p v-show='show'>
      购物车空空如也
    </p>
    <ul>
        <li v-for="(item,index) in cartList" :key="index">
            <div class="pic">
                <a href="javacript:void(0)"><img v-lazy="'static/'+item.productImage" alt=""></a>
            </div>
            <div class="main">
                <div class="name">{{item.productName}}</div>
                <div class="price">{{item.salePrice | currency('￥')}}</div>
                <div class="btn-area">
                    <a href="javascript:void(0);" class="btn btn--m" @click="delCart(item.productId)">删除</a></a>
                </div>
            </div>
        </li>
    </ul>
  </div>
</template>

<script>
import Public from '../Public'
export default {
  mixins: [Public],
  data () {
    return {
      cartList: [],
      show: false,
      userId: function () {
        let user = document.cookie.split('=')
        return user[1].split(';')[0]
      }

    }
  },
  mounted () {
    this.getCart()
  },
  methods: {
    getCart () {
      this.$http.get('/users/cartList', {useId: this.userId}).then(res => {
        this.cartList = res.data.result
        if (this.cartList.length === 0) {
          this.show = true
        }
      })
    },
    delCart (productId) {
      if (confirm('确认删除?')) {
        this.$http.post('/users/cartDel', {useId: this.userId, productId: productId}).then(res => {
          if (res.data.status === '0') {
            this.getCart()
          }
        })
      }
    }
  }
}
</script>

<style lang="css">
</style>