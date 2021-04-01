<template>
    <div>
      <Uhead></Uhead>
      <van-search
        shape="round"
        background="#ff6040"
        placeholder="请输入搜索关键词"
      />
      <div id="nav">
        <div class="navList">
          <a href="javascript:;">综合推荐</a>
          <a href="javascript:;">销量</a>
          <a href="javascript:;">价格</a>
          <a href="javascript:;">好评度</a>
          <a href="javascript:;">店铺</a>
          <div class="classify">
            <span class="iconfont icon-ai-kind"></span>
            <span>筛 选</span>
          </div>
        </div>
      </div>
      <van-card
        v-for="(item,index) in goodsList"
        :key="item.id"
        :price="item.price|toprice(2)"
        desc="描述信息"
        :origin-price="item.market_price"
        :title="item.goodsname"
        :thumb="$imgUrl+item.img"
        @click-thumb="tolook(index)"
      >
      <template #tags>
        <van-tag plain type="danger">你值得拥有</van-tag>
      </template>
      </van-card>
    </div>
</template>

<script>
  import Uhead from "../components/Uhead";
  import {getgoods} from '@/axios'
  import Vue from 'vue';
  import { Card } from 'vant';

  Vue.use(Card);
  export default {
    data(){
      return {
        goodsList:[]
      }
    },
    components:{
      Uhead
    },
    mounted() {
      getgoods({
        fid : this.$route.query.pid
      })
      .then(res => {
        if (res.data.code === 200){
          this.goodsList = res.data.list
          console.log(this.goodsList)
        }
      })
    },
    methods:{
      tolook(n){
        this.$router.push({
          path : '/detail',
          query:{
            id:this.goodsList[n].id
          }
        })
      }
    }
  }
</script>

<style scoped>
  #nav{
    height: .5rem;
    width: 100%;
    background: linear-gradient(#FF6040,#FF8A80);
    padding-top: .14rem;
    box-sizing: border-box;
  }
  #nav .navList{
    display: flex;
    height: .32rem;
    justify-content: space-around;
    align-items: center;
  }
  #nav .classify{
    color: #ffffff;
    background: linear-gradient(#ff7a68,#ff8a80);
    font-size: .16rem;
    box-shadow: -.05rem .05rem .1rem -.05rem #E63D2E;
    height: .32rem;
    line-height: .32rem;
    width: .7rem;
    padding-left: .0732rem;
  }
  #nav ul {
    display: flex;
    width: 3.33rem;
    overflow-y: scroll;
  }
  #nav .icon-ai-kind{
    font-size: .11rem;
  }
  .van-swipe {
    height: 1.95rem;
    width: 3.35rem;
    padding: .12rem 0 .25rem .2rem;
    /*box-shadow: pink .2rem .2rem;*/
  }
</style>
