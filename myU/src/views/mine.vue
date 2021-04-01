<template>
    <div>
      <Uhead></Uhead>
      <div class="con">
        <div class="conHead">
          <div class="conHeadImg"></div>
          <div class="conCon">
            <p v-if="nickname!==null">
              <span >{{nickname}}</span>
              <van-button icon="https://img01.yzcdn.cn/vant/user-active.png" type="info"
                          style="position:absolute; top: 10%;left: 35%"
                          color="linear-gradient( #FF6040, #FF8A80)"
                          @click="removeMsg"
                          size="small">退出</van-button>
            </p>
            <p v-else>
              <van-button icon="https://img01.yzcdn.cn/vant/user-active.png" type="info"
                          color="linear-gradient( #FF6040, #FF8A80)"
                          @click="getMsg"
                          size="small">登 录</van-button>
            </p>
            <p>完善资料让小U更懂你</p>
          </div>
          <div class="conSign">
            每日签到
          </div>
        </div>
        <ul class="conList">
          <li>
            <p>{{person.collection}}</p>
            <p>我的收藏</p>
          </li>
          <li>
            <p>{{person.history}}</p>
            <p>浏览历史</p>
          </li>
          <li>
            <p>{{person.redPaper}}</p>
            <p>我的红包</p>
          </li>  <li>
            <p>{{person.discount}}</p>
            <p>优惠券</p>
          </li>
        </ul>
        <div class="conOrder">
          <div class="conOrderHeader">
            <h3>我的订单</h3>
            <p>
              全部订单
              <span class="iconfont icon-dayuhao"></span>
            </p>
          </div>
            <ul class="conOrderList">
              <li>
                <span class="iconfont icon-wodedaifukuan"></span>
                <span>待付款</span>
              </li>
              <li>
                <span class="iconfont icon-daishouhuo"></span>
                <span>待收货</span>
              </li>
              <li>
                <span class="iconfont icon-qiyejixiaopingjia"></span>
                <span>评价</span>
              </li>
              <li>
                <span class="iconfont icon-shouhou"></span>
                <span>售后/退款</span>
              </li>
            </ul>
        </div>
      </div>
      <div class="list">
          <ul>
            <li>
              <p>
                <i class="iconfont icon-dizhi"></i>
                <span>地址管理</span>
              </p>
              <p class="iconfont icon-dayuhao"></p>
            </li>
            <li>
              <p>
                <i class="iconfont icon-caiwufeiyongqianjinbihuobi"></i>
                <span>我的钱包</span>
              </p>
              <p class="iconfont ">
                <i class="yaun">200余额</i></p>
            </li>
            <li>
              <p>
                <i class="iconfont icon-youhuiquan"></i>
                <span>我的优惠券</span>
              </p>
              <p class="iconfont icon-dayuhao"></p>
            </li>
            <li>
              <p>
                <i class="iconfont icon-erweima"></i>
                <span>我的二维码</span>
              </p>
              <p class="iconfont icon-dayuhao"></p>
            </li>
            <li>
              <p>
                <i class="iconfont icon-kezhuliangren"></i>
                <span>我的小伙伴</span>
              </p>
              <p class="iconfont icon-dayuhao"></p>
            </li>
          </ul>
        </div>
    </div>
</template>

<script>
  import Uhead from "../components/Uhead";
    export default {
        name: "mine",
        data(){
          return {
            person : {
              id : 1,
              collection : 0,
              history : 0,
              redPaper : 0,
              discount : 0
            },
            nickname:''
          }
      },
      components:{
          Uhead
      },
      mounted() {
          this.nickname = sessionStorage.getItem('user')?JSON.parse(sessionStorage.getItem('user')).nickname:null
      },
      methods:{
          removeMsg(){
            sessionStorage.removeItem('user')
            this.$router.replace('/login')
          },
          getMsg(){
            this.$router.replace('/login')
          }
      }
    }
</script>

<style scoped>
  .con{
    height: 2.1rem;
    background: linear-gradient(#FF6040,#FF8A80);
    box-shadow: 0 .02rem .06rem 0 rgba(255,149,128,0.5);
    padding-top: .1rem;
    padding-left:.1rem;
    position: relative;
    box-sizing: border-box;
  }
  .con .conHead{
    height: .64rem;
    display: flex;
  }
  .con .conHeadImg{
    width: .64rem;
    height: .64rem;
    border-radius: 50%;
    background: hotpink;
  }
  .con .conCon p:nth-of-type(1){
    padding-top: .2rem;
    color: #FFF;
    font-size: .18rem;
    line-height: .18rem;
    margin-left: .1rem;
  }
  .con .conCon p:nth-of-type(2){
    color: #FFF;
    font-size: .1rem;
    line-height: .1rem;
    margin:.1rem 0 0 .1rem;
    border: 1px solid #FFF;
    border-radius: 1px;
    padding: 1px;
  }
  .con .conSign {
    margin-left: .94rem;
    width: .76rem;
    height: .2rem;
    border-radius: .1rem 0 0 .1rem;
    background: #FFD4CC;
    margin-top: .32rem;
    color: #FF6243;
    text-align: right;
    font-size: .1rem;
    line-height: .2rem;
  }
  .con .conList{
    display: flex;
    margin-top: .15rem;
  }
  .con .conList li {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    color: #FFF;
  }
  .con .conList p:nth-of-type(1){
    font-size: .18rem;
  }
  .con .conList p:nth-of-type(2){
    font-size: .1rem;
  }
  .con .conOrder{
    height: 1.03rem;
    width: 3.35rem;
    background: #FFF;
    position: absolute;
    left: .2rem;
    top: 1.5rem;
    box-sizing: border-box;
    padding:.1rem
  }
  .con .conOrder .conOrderHeader{
    display: flex;
    justify-content: space-between;
    margin-bottom: .15rem;
  }
  .con .conOrder .conOrderHeader p{
    font-size: .1rem;
    color: #FF6040
  }
  .con .conOrder  .icon-dayuhao{
    color: #FF6040;
    font-size: .1rem;
  }
  .con .conOrder .conOrderList{
    display: flex;
  }
  .con .conOrder .conOrderList li {
    flex: 1;
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
  }
  .con .conOrder .conOrderList li span:nth-of-type(1){
    font-size: .32rem;
    color: #FF6040;
  }
  .con .conOrder .conOrderList li span:nth-of-type(2){
    font-size: .1rem;
  }
  .list{
    border-top: .6rem solid #F2F2F2;
    /*height: 2rem;*/
    flex: 1;
    background: #FFF;
    padding: 0 0.37rem 0 0.28rem;
    margin-bottom: 1.5rem;
  }
  .list ul li {
    height: .6rem;
    border-bottom: 1px solid #f7f7f7;
    font-size: 0.14rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: #8a8a8a;
  }
  .list ul li p i.icon-dizhi {
    font-size: 0.2rem;
    color: #f26b11;
    margin-right: 0.12rem;
  }
  .list ul li p i.icon-caiwufeiyongqianjinbihuobi {
    font-size: 0.2rem;
    color: #f26b11;
    margin-right: 0.12rem;
  }
  .list ul li p i.icon-youhuiquan {
    font-size: 0.2rem;
    color: #f26b11;
    margin-right: 0.12rem;
  }
  .list ul li p i.icon-erweima {
    font-size: 0.2rem;
    color: #f26b11;
    margin-right: 0.12rem;
  }
  .list ul li p i.icon-kezhuliangren {
    font-size: 0.2rem;
    color: #f26b11;
    margin-right: 0.12rem;
  }
  .list ul li p i.yaun {
    color: #f26b11;
    margin-right: 0.11rem;
  }
  .list ul .iconfont {
    color: #e5e5e5;
  }
  .list ul .iconfont .yuan {
    color: #f26b11;
  }
</style>
