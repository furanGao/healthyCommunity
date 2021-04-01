<template>
    <div>
      <Uhead></Uhead>
      <!--首页导航-->
      <div id="nav">
        <div class="search">
          <span class="iconfont icon-didian"></span>
            <img :src="navLogo" alt="">
          <span class="iconfont icon-search"></span>
          <input type="text" placeholder="按内容搜索">
          <span class="iconfont icon-shangdian"></span>
        </div>
        <div class="navList">
          <a href="javascript:;">推荐</a>
          <a href="javascript:;">女装</a>
          <a href="javascript:;">鞋包</a>
          <a href="javascript:;">居家</a>
          <a href="javascript:;">母婴</a>
          <a href="javascript:;">美妆</a>
          <div class="classify">
            <span class="iconfont icon-ai-kind"></span>
            <span>分类</span>
          </div>
        </div>
      </div>
      <van-swipe :autoplay="3000">
        <van-swipe-item v-for="(image,index) in images" :key="index">
          <img v-lazy="$imgUrl+image" />
        </van-swipe-item>
      </van-swipe>
      <div id="menuList">
        <ul>
          <li>
            <img :src="xsmsImg" alt="">
            <p>限时秒杀</p>
          </li>
          <li>
            <img :src="cxspImg" alt="">
            <p>畅销商品</p>
          </li><li>
          <img :src="pzdpImg" alt="">
          <p>品质大牌</p>
        </li><li>
          <img :src="xuzyImg" alt="">
          <p>小U自营</p>
        </li><li>
          <img :src="jfscImg" alt="">
          <p>积分商城</p>
        </li>
        </ul>
      </div>
      <div id="con">
        <div class="conLeft">
          <div class="conLeftTitle">
            <a href="javascript:void(0);" class="titleName">限时秒杀</a>
            <a href="javascript:void(0);" class="titleMore">查看更多<span class="iconfont icon-dayuhao"></span></a>
          </div>
          <p>每天0点场，好货秒不停</p>
          <div class="conLeftTime">
            <van-count-down :time="time" format="DD 天 HH 时 mm 分 ss 秒" >
              <template #default="timeData" >
<!--                <span class="block">{{ timeData.days}}</span>-->
<!--                <span class="colon">:</span>-->
                <span class="block">{{ timeData.hours }}</span>
                <span class="colon">:</span>
                <span class="block">{{ timeData.minutes }}</span>
                <span class="colon">:</span>
                <span class="block">{{ timeData.seconds }}</span>
              </template>
            </van-count-down>
          </div>
        </div>
        <div class="conRight">
          <div class="ppsx">
            <h3><a href="javascript:;">品牌上新</a></h3>
            <p>9点整，抢大牌</p>
            <div class="hongbao">
              疯抢红包>
            </div>
          </div>
          <div class="rybh">
            <h3><a href="javascript:;">日用百货</a></h3>
            <p>愿君多采颉</p>
            <div class="jiangquan">
              塞满奖券>
            </div>
          </div>
        </div>
      </div>
      <!-- 内容导航 -->
<!--      <div id="contentNav">-->
<!--        <a href="javascript:;">热门推荐</a>-->
<!--        <a href="javascript:;">发现好货</a>-->
<!--        <a href="javascript:;">只看专场</a>-->
<!--        <a href="javascript:;">只看商品</a>-->
<!--      </div>-->
      <v-list></v-list>
    </div>
</template>

<script>
    import vList from '../components/goodslist'
    import Uhead from "../components/Uhead";
    import {getbanner} from '@/axios'
    import Vue from 'vue';
    import { Lazyload } from 'vant';

    Vue.use(Lazyload);
    export default {
      data(){
        return  {
          navLogo : require('../assets/img/white.png'),
          xsmsImg : require('../assets/img/seckill.png'),
          cxspImg : require('../assets/img/top.png'),
          pzdpImg : require('../assets/img/brand.png'),
          xuzyImg : require('../assets/img/selfsupport.png'),
          jfscImg : require('../assets/img/integral.png'),
          conXSMS : require('../assets/img/big.png'),
          conPPSX : require('../assets/img/small.png'),
          conRYBH : require('../assets/img/02.png'),
          images: [],
          time: 0
        }
      },
      components:{
          vList,Uhead
      },
      filters : {
        tofix(s,n){
          return s.toFixed(n)
        }
      },
      methods:{
        getBannerImg(){
          getbanner()
            .then(res =>{
              if (res.data.code === 200){
                res.data.list.forEach(item => {
                  this.images.push(item.img)
                })
              }
            })
        },
        //转化时间的函数
        getTime(){
          let newTime = new Date().getTime()
          let Time = new Date('2021-03-30').getTime()
          this.time = Time - newTime
          //计算hour
          // let h = Math.floor(
          //   num / 1000 / 60 / 60
          // )
          //   .toString()
          //   .padStart(2, "0");
          // // 计算min
          // let m = Math.floor(
          //   (num / 1000 / 60) % 60
          // )
          //   .toString()
          //   .padStart(2, "0");
          // // 计算sec
          // let s = Math.floor(
          //   (num / 1000) % 60
          // )
          //   .toString()
          //   .padStart(2, "0");
        }
      },
      mounted() {
        this.getBannerImg()
        this.getTime()
      }
    }
</script>

<style>
  @import '//at.alicdn.com/t/font_2220086_xod20gciu6.css';
  #nav{
    height: .8rem;
    width: 100%;
    background: linear-gradient(#FF6040,#FF8A80);
    padding-top: .14rem;
    box-sizing: border-box;
  }
  #nav .search{
    display: flex;
    justify-content: space-around;
    align-items: center;
  }
  .iconfont{
    font-size: .22rem;
    color: #fff;
  }
  #nav img{
    width: .91rem;
    height: .24rem;
    vertical-align: middle;
    float: left;
  }
  #nav input {
    width: 1.7rem;
    height: .32rem;
    border: none;
  }
  #nav .icon-search{
    position: absolute;
    left: 1.64rem;
    color: #999999;
  }
  #nav input::placeholder{
    padding-left: .34rem;
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
  .van-swipe  .van-swipe-item img{
    height: 1.95rem;
    width: 3.35rem;
  }
  #menuList ul {
    display: flex;
    justify-content: space-around;
    margin-bottom: .36rem;
  }
  #menuList li{
    height: .47rem;
    width: .48rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    color: #ccc;
  }
  #menuList li p{
    font-size: .1rem;
  }
  #menuList li img{
    height: .32rem;
    width: .32rem;
  }
  #con{
    /*background: #ccc;*/
    padding: .1rem  0 .1rem .1rem;
    display: flex;
  }
  #con .conLeft{
    width: 1.75rem;
    height: 1.75rem;
    background: url("../assets/img/big.png");
    margin-right: .05rem;
    padding: .1rem 0 0 .1rem;
    box-sizing: border-box;
  }
  #con .conLeftTitle .titleName{
    font-weight: bold;
    color: #85A642;
    margin-right: .36rem;
  }
  #con .conLeftTitle .titleMore{
    font-size: .1rem;
    color:#333333;
    line-height: .16rem;
  }
  #con .conLeftTitle .icon-dayuhao {
    font-size: .08rem;
    color: #333333;
  }
  #con .conLeft>p {
    font-size: .1rem;
    color: #B1CC7A;
    line-height: .1rem;
    margin: .1rem 0 .05rem 0;

  }
  .colon {
    display: inline-block;
    color: #ee0a24;
  }
  .block {
    display: inline-block;
    width: 20px;
    color: #fff;
    font-size: 12px;
    text-align: center;
    background: linear-gradient(#85A642,#B1CC7A);
  }
  #con .conRight{
    width: 1.75rem;
    height: 1.75rem;
  }
  #con .conRight .ppsx{
    height: .85rem;
    margin-bottom: .05rem;
    background: url("../assets/img/small.png");
    padding: .1rem 0 0 .1rem;
    box-sizing: border-box;
  }
  #con .ppsx h3 a{
    color: #FF6040;
    line-height: .16rem;
  }
  #con .ppsx>p{
    margin: .1rem 0 .04rem 0;
    font-size: .1rem;
    line-height: .1rem;
    color: #FF9580;
  }
  #con .ppsx .hongbao{
    height: .2rem;
    width: .6rem;
    background: linear-gradient(#FF6040,#FF9F80);
    border-radius: .02rem .12rem .12rem .02rem;
    font-size: .1rem;
    color: #FFFFFF;
    line-height: .2rem;
    text-align: center;
  }
  #con .conRight .rybh{
    height: .85rem;
    background: url("../assets/img/02.png");
    padding: .1rem 0 0 .1rem;
    box-sizing: border-box;
  }
  #con .rybh h3 a{
    color: #AF40FF;
    line-height: .16rem;
  }
  #con .rybh>p{
    margin: .1rem 0 .04rem 0;
    font-size: .1rem;
    line-height: .1rem;
    color: #CA80FF;
  }
  #con .rybh .jiangquan{
    height: .2rem;
    width: .6rem;
    background: linear-gradient(#AF40FF,#F58CFF);
    border-radius: .02rem .12rem .12rem .02rem;
    font-size: .1rem;
    color: #FFFFFF;
    line-height: .2rem;
    text-align: center;
  }
</style>
