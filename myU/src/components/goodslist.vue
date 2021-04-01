<template>
      <div id="contentList">
        <van-tabs  animated type="card">
          <van-tab title="热卖商品">
            <div v-for="item in hotList" class="box">
              <router-link :to="'/detail?id=' + item.id">
                <img :src="$imgUrl+item.img" alt="">
              </router-link>
              <div class="con">
                <router-link  :to="'/detail?id=' + item.id" tag="p">
                  {{item.goodsname}}
                </router-link>
                <p>商品价格：<i>￥</i>{{item.price | toprice(2)}}</p>
                <p>立即抢购</p>
              </div>
            </div>
          </van-tab>
          <van-tab title="新品上新">
            <div v-for="item in newList" class="box">
              <router-link :to="'/detail?id=' + item.id">
                <img :src="$imgUrl+item.img" alt="">
              </router-link>
              <div class="con">
                <router-link  :to="'/detail?id='+ item.id" tag="p">
                  {{item.goodsname}}
                </router-link>
                <p>商品价格：<i>￥</i>{{item.price | toprice(2)}}</p>
                <p>立即抢购</p>
              </div>
            </div>
          </van-tab>
          <van-tab title="所有商品">
            <div v-for="item in goodsList" class="box">
              <router-link :to="'/detail?id=' + item.id">
                <img :src="$imgUrl+item.img" alt="">
              </router-link>
              <div class="con">
                <router-link  :to="'/detail?id=' + item.id" tag="p">
                  {{item.goodsname}}
                </router-link>
                <p>商品价格：<i>￥</i>{{item.price | toprice(2)}}</p>
                <p>立即抢购</p>
              </div>
            </div>
          </van-tab>
        </van-tabs>
      </div>
</template>

<script>
  import {getindexgoods}  from  '@/axios'
    export default {
      data(){
          return {
            hotList : [],
            newList : [],
            goodsList : []
          }
        },
      mounted() {
        getindexgoods()
          .then(res=>{
            if (res.data.code === 200){
              let arr = res.data.list
              this.hotList = arr[0].content
              this.newList = arr[1].content
              this.goodsList = arr[2].content
            }
          })
      }
  }
</script>

<style scoped>
  #contentList{
    margin-bottom: 1rem;
  }
  img{
    width: 1.1rem;
    height: 1.18rem;
    margin: 0.25rem 0 0 0.175rem;
  }
  .box{
    height: 1.5rem;
    display: flex;
    box-shadow: 0.1rem 0.1rem 0.3rem 0 #c9c0c0;
    margin: 0.1rem 0;
  }
  .box .con{
      margin: 0.27rem 0 0 0.25rem;
  }
  .box .con p:nth-child(1) {
    font-size: 0.14rem;
    color: #585858;
  }
  .con p:nth-child(2) {
    margin: 0.2rem 0;
    font-size: 0.13rem;
    color: #e25d63;
  }
  .con p:nth-child(2) i {
    font-size: 0.11rem;
  }
  .con p:last-child {
    width: 0.8rem;
    height: 0.26rem;
    font-size: 0.13rem;
    background: #f26b11;
    text-align: center;
    line-height: 0.26rem;
    color: #fff;
    border-radius: 0.04rem;
    margin-bottom: 1rem;
  }
</style>
