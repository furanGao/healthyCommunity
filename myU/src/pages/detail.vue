<template>
    <div>
      <div class="head">
        <h1>{{goodsListInfo.goodsname}}</h1>
      </div>
      <div class="nav">
        <span>商品</span>
        <span>评价</span>
        <span>详情</span>
        <span>推荐</span>
      </div>
      <div class="banner">
        <img :src="$imgUrl+goodsListInfo.img" alt="">
      </div>
      <div class="con">
        <p class="conPrice">
          <span>￥</span>{{goodsListInfo.price}}
          <del>￥{{goodsListInfo.market_price}}</del>
        </p>
        <p class="conTitle" v-html="goodsListInfo.description"></p>
<!--        <p class="conCon">敏感肌可用，控油祛痘，男女可用，泡沫绵细，净透毛孔</p>-->
        <p class="conTime">
          11.11限时299元起
        </p>
        <p class="conNews">此商品于2020-11-11.00结束闪购特卖，品牌美妆闪购专场  查看</p>
      </div>
      <div id="price">
        <div class="cales">
          <p class="l">促销：<i>满减</i>
            <span>满2件9折；3件8折</span></p>
          <span class="r iconfont">&#xe658;</span>
        </div>
        <div class="quantity">
          <p class="l">购买数量</p>
          <span @click="add">+</span>
          <span>{{num}}</span>
          <span @click="cut">-</span>
        </div>
        <div class="Style">
          <p>
            商品属性
          </p>
          <p>
            <span>规格</span>
            <span v-for="(item,index) in attr"> {{item}}</span>
          </p>
        </div>
      </div>
      <div class="foot">
        <div>
          <p>
            <span class="iconfont icon-kefu"></span>
            <span>客服</span>
          </p>
          <p>
            <span class="iconfont icon-shangdian"></span>
            <span>店铺</span>
          </p>
          <p>
            <span class="iconfont icon-gouwuche"></span>
            <span>购物车</span>
          </p>

        </div>
        <span @click="addCart">加入购物车</span>
        <span @click="buyCart">立即购买</span>
      </div>
    </div>
</template>

<script src="//at.alicdn.com/t/font_2220086_lk8v89qaqva.js"></script>
<script>
    import {getgoodsinfo,getcartadd} from '@/axios'
    import Vue from 'vue';
    import { Toast } from 'vant';

    Vue.use(Toast);
    export default {
        data(){
          return {
            img : require('../assets/img/good1.jpg'),
            urlImg : '',
            id : {},
            goodsListInfo :[],
            num :1,
            attr:[],
            addGoods:{
              uid : '',
              goodsid: '',
              num : 1
            }//添加的商品信息
          }
        },
        mounted() {
          this.id = parseInt(this.$route.query.id)
          getgoodsinfo({id:this.id})
            .then(res=>{
              if (res.data.code === 200){
                this.goodsListInfo = res.data.list[0]
                this.attr = this.goodsListInfo.specsattr.split(',')
              }
            })
        },
      methods:{
          add(){
            this.num ++
          },
          cut(){
            if (this.num === 1){
              this.num = 1
              return
            }
            this.num--
          },
          addCart(){
            if ( sessionStorage.getItem('user')){
              this.addGoods = {
                num :this.num,
                goodsid : this.goodsListInfo.id,
                uid : this.$store.getters.getUserInfo.uid
              }
              getcartadd(this.addGoods)
                .then(res => {
                  if (res.data.code === 200){
                    this.$router.push('./cart')
                  }
                })
            }
            else{
              Toast('请登录在添加奥亲');
             this.$router.push('/login')

            }
          },
          buyCart(){
            if ( sessionStorage.getItem('user')){
            this.$router.push('./goodssure')
            }else{
              Toast('请登录在添加奥亲');
              this.$router.push('/login')
            }
          }
      }
    }
</script>

<style scoped>
  @import "//at.alicdn.com/t/font_2220086_lk8v89qaqva.css";
  .head{
    height: .44rem;
    background: #ff6040;
    font-size: .17rem;
    letter-spacing: 0;
    text-align: center;
    color: #FFFFFF;
    line-height: .44rem;
  }
  .nav{
    height: .32rem;
    display: flex;
    background: linear-gradient(#FF6040,#FF8A80);
    box-shadow: 0 .02rem .06rem 0 rgba(255,149,128,0.5);
  }
  .nav span {
    flex: 1;
    color: #FFF3F2;
    text-align: center;
    line-height: .32rem;
  }
  .banner img{
    width: 3.75rem;
    height: 3.75rem;
  }
  .con{
    /*height: 1.45rem;*/
    /*box-sizing: border-box;*/
    padding: .1rem .1rem 0 .1rem;
    border-bottom: solid .1rem  #F2F2F2;
  }
  .con .conPrice{
    margin-bottom: .1rem;
    color: #FF6040;
    line-height: .24rem;
    font-size: .3rem;
    font-weight: bold;
  }
  .con .conPrice span{
    font-size: .14rem;
    line-height: .14rem;
    font-weight: normal;
  }
  .con .conPrice del {
    font-size: .14rem;
    color: #999999;
    line-height: .12rem;
  }
  .con .conTitle {
    margin-bottom: .05rem;
    color: #333;
    line-height: .16rem;
  }
  .con .conCon{
    color: #999;
    margin-bottom: .15rem;
    line-height: .14rem;
    font-size: .14rem;
  }
  .con .conTime{
    background: #FF8066;
    width: 1.01rem;
    height: .16rem;
    font-size: .1rem;
    color: #FFF;
    margin-bottom: .13rem;
  }
  .con .conNews{
    line-height: .14rem;
    text-align: justify;
    font-size: .1rem;
    color: #999;
    background: #F2F2F2;
    margin: .03rem .05rem;
    margin-bottom: .11rem;
  }
  #price {
     height: 2rem;
     margin-bottom: 0.1rem;
     background: #fff;
   }
  #price div {
    padding: 0 0.085rem 0 0.1rem;
  }
  #price div.cales {
    height: 0.49rem;
    border: 1px solid #fafafa;
    line-height: 0.49rem;
  }
  #price div.cales p {
    font-size: 0.14rem;
    color: #6d6d6d;
  }
  #price div.cales p i {
    display: inline-block;
    width: 0.35rem;
    height: 0.14rem;
    font-size: 0.12rem;
    line-height: 0.14rem;
    text-align: center;
    color: #e43a3d;
    border: 1px solid #e43a3d;
    margin: 0 0.09rem 0 0.14rem;
    border-radius: 0.05rem;
  }
  #price div.cales p span {
    font-size: 0.12rem;
    color: #6d6d6d;
  }
  #price div.cales span {
    color: #c9c9c9;
  }
  #price div.quantity {
    height: 0.49rem;
    border: 1px solid #fafafa;
    font-size: 0.14rem;
    color: #6d6d6d;
    line-height: 0.49rem;
  }
  #price div.quantity .l{
    float: left;
  }
  #price div.quantity span {
    float: right;
    font-size: 0.1rem;
    height: 0.3rem;
    border: 1px solid #c1c1c1;
    line-height: 0.3rem;
    text-align: center;
    margin-top: 0.09rem;
  }
  #price div.quantity span:nth-of-type(1) {
    width: 0.31rem;
    border-radius: 0 0.04rem 0.04rem 0;
    font-size: 0.2rem;
    margin-right: 0.07rem;
  }
  #price div.quantity span:nth-of-type(2) {
    width: 0.41rem;
    border-left: 0;
    border-right: 0;
    font-weight: bold;
  }
  #price div.quantity span:nth-of-type(3) {
    width: 0.31rem;
    border-radius: 0.04rem 0 0 0.04rem;
    font-size: 0.25rem;
  }
  #price div.Style {
    height: 0.78rem;
  }
  #price div.Style p:first-child {
    font-size: 0.14rem;
    color: #6d6d6d;
    margin: 0.18rem 0 0.14rem 0;
  }
  #price div.Style p:last-child {
    font-size: 0.14rem;
    color: #6d6d6d;
  }
  #price div.Style p:last-child span {
    display: inline-block;
  }
  #price div.Style .active {
    font-size: 0.13rem;
    width: 0.75rem;
    height: 0.3rem;
    background: #e43a3d;
    line-height: 0.3rem;
    text-align: center;
    color: #fff;
    margin: 0 0.08rem 0 0.35rem;
    border-radius: 0.03rem;
  }
  #price div.Style p:last-child span {
    font-size: 0.13rem;
    width: 0.63rem;
    height: 0.3rem;
    background: #f5f5f5;
    line-height: 0.3rem;
    text-align: center;
    color: #000;
    border-radius: 0.03rem;
  }
  .foot{
    height: .49rem;
    display: flex;
  }
  .foot div{
    flex: 1;
  }
  .foot div{
    display: flex;
  }
  .foot .iconfont{
    font-size: .2rem;
  }
  .foot div p{
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

  }
  .foot p>span{
    font-size: .1rem;
  }
  .foot>span:nth-of-type(1){
    width: 1.1rem;
    background: #FFCC66;
    text-align: center;
    color: #663014;
    line-height: .49rem;
  }
  .foot>span:nth-of-type(2){
    width: 1.1rem;
    background: #FF6040;
    text-align: center;
    color: #fff;
    line-height: .49rem;
  }

</style>
