<template>
    <div>
      <Uhead></Uhead>
      <div class="con">
        <div class="conHead"></div>
        <div class="conOrder">
          <h2>代用名 188***8888</h2>
          <p>北京 北京市 昌平区 朱辛庄中公教育实训基地IT教学楼 2号楼 2202室</p>
        </div>
      </div>
      <div class="goodslist">
        <h2>品牌精选</h2>
        <van-swipe-cell v-for="(item,index) in goods"  :key="item.id" class="box w">
          <van-card
            :price="item.price|toprice(2)"
            desc="描述信息"
            :title="item.goodsname"
            :num="item.num"
            class="goods-card"
            :thumb="$imgUrl + item.img"
          />
        </van-swipe-cell>
      </div>
      <!-- 折扣 -->
      <div id="use">
        <!-- 优惠券单元格 -->
        <van-coupon-cell
          :coupons="coupons"
          :chosen-coupon="chosenCoupon"
          @click="showList = true"
        />
        <!-- 优惠券列表 -->
        <van-popup
          v-model="showList"
          round
          position="bottom"
          style="height: 90%; padding-top: 4px;"
        >
          <van-coupon-list
            :coupons="coupons"
            :chosen-coupon="chosenCoupon"
            :disabled-coupons="disabledCoupons"
            @change="onChange"
            @exchange="onExchange"
          />
        </van-popup>
        <ul>
          <li>
            <p>使用积分</p>
            <div>
              <input type="text" placeholder="输入积分">
              <span>使用</span>
              <span>可用<i>50</i>积分</span>
            </div>
          </li>
        </ul>
        <div>

        </div>
        <div>

        </div>
      </div>
      <!-- 价格总计 -->
      <div id="price">
        <ul>
          <li>
            <span>商品金额</span>
            <i>￥{{priceSum}}</i>
          </li>
          <li>
            <span>运费</span>
            <i>+ ￥0.00</i>
          </li>
          <li>
            <span>优惠券</span>
            <i>- ￥0.00</i>
          </li>
          <li>
            <span>会员优惠</span>
            <i>- ￥0.00</i>
          </li>
          <li>
            <span>积分抵扣</span>
            <i>- ￥0.00</i>
          </li>
        </ul>
      </div>
      <!-- 提交 -->
      <div id="submit">
        <p>实付金额：<i>￥ {{priceSum}}</i></p>
        <p @click="submit">提交订单</p>
      </div>
    </div>
</template>

<script>
  import Uhead from '@/components/Uhead'
  import {getcartlist } from '@/axios'

  const coupon = {
    available: 1,
    condition: '无使用门槛\n最多优惠99999元',
    reason: '',
    value: 150000,
    name: '优惠券名称',
    startAt: 1489104000,
    endAt: 1514592000,
    valueDesc: '1500',
    unitDesc: '元',
  };
  import { Notify } from 'vant';

  export default {
    data(){
      return {
        goods:[],
        chosenCoupon: -1,
        coupons: [coupon],
        disabledCoupons: [coupon],
        showList:false,
        discount:0
      }
    },
    components:{
      Uhead
    },
    mounted() {
        let uid =this.$store.getters.getUserInfo.uid
        getcartlist({uid})
          .then(res => {
            if (res.data.code === 200){
              if (res.data.list === null){
                this.goods = []
                return
              }
              this.goods = res.data.list
              this.goods.forEach(item => {
                item.checked = true
              })
            }
          })
    },
    methods:{
      onChange(index) {
        this.showList = false;
        this.chosenCoupon = index;
      },
      onExchange(code) {
        this.coupons.push(coupon);
      },
      submit(){
        Notify({
          message: '恭喜金主爸爸付款成功',
          duration: 1000,
        });
      }
    },
    computed:{
      priceSum(){
        let sum = 0
        this.goods.forEach((item,index) =>{
          sum += this.goods[index].price *this.goods[index].num
        })
        return sum
      }
    }
  }
</script>

<style scoped>
  .con{
    height: 1rem;
    background: linear-gradient(#FF6040,#FF8A80);
    box-shadow: 0 .02rem .06rem 0 rgba(255,149,128,0.5);
    padding-top: .1rem;
    padding-left:.1rem;
    position: relative;
    box-sizing: border-box;
  }
  .con .conHead{
    height: .24rem;
    display: flex;
  }

  .con .conOrder{
    height: 1.1rem;
    width: 3.35rem;
    background: #FFF;
    position: absolute;
    left: .19rem;
    top: .1rem;
    box-sizing: border-box;
    padding:.1rem
  }
  .goodslist{
    border-top: .34rem solid #F2F2F2;
  }
  .box>>>div.van-swipe-cell__right{
    padding-top: .3rem;
  }
  .van-submit-bar{
    margin-bottom: .61rem;
  }
  .van-swipe-cell{
    background: #fafafa;
    margin:.2rem 0;
  }
  .h{
    line-height: 104px;
  }
  .goods-card{
    float: left;
    width: calc(100% - .5rem);
  }
  .goodslist h2{
    font-size: .16rem;
    color: #333;
    margin: .2rem 0 .2rem .36rem;
    line-height: .16rem;
  }
  /*折扣*/
  #use {
    height: 1.04rem;
    background: #fff;
    margin-bottom: 0.1rem;
  }
  #use ul {
    color: #7f7f7f;
  }
  #use ul li {
    padding: 0 0.11rem;
  }
  #use ul li:last-child {
    height: 0.52rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  #use ul li:last-child p {
    font-size: 0.13rem;
    font-weight: bold;
  }
  #use ul li:last-child div {
    font-size: 0.13rem;
  }
  #use ul li:last-child div input {
    width: 0.75rem;
    height: 0.35rem;
    outline: none;
    border: 1px solid #efefef;
  }
  #use ul li:last-child div input::placeholder {
    text-align: center;
    color: #efefef;
  }
  #use ul li:last-child div span:nth-of-type(1) {
    display: inline-block;
    width: 0.36rem;
    height: 0.36rem;
    line-height: 0.36rem;
    text-align: center;
    background: #f26b11;
    color: #fff;
    border-radius: 0.04rem;
    margin: 0 0.1rem 0 0.2rem;
  }
  #use ul li:last-child div span:nth-of-type(2) i {
    color: #ec6f73;
    font-weight: bold;
  }
  /*价格总计*/
  #price {
    height: 1.3rem;
    background: #fff;
    border-bottom: 1px solid #fafafa;
    padding: 0 0.125rem;
  }
  #price ul {
    margin-top: 0.15rem;
  }
  #price ul li {
    display: flex;
    justify-content: space-between;
    height: 0.23rem;
  }
  #price ul li span {
    font-weight: bold;
    font-size: 0.13rem;
  }
  #price ul li i {
    color: #e5676b;
    font-size: 0.11rem;
  }
  /*提交*/
  #submit {
    flex: 1;
    background: #fff;
    padding: 0 0.115rem 0.07rem;
  }
  #submit p:nth-of-type(1) {
    font-size: 0.13rem;
    margin: 0.25rem 0 0.22rem 1.9rem;
  }
  #submit p:nth-of-type(1) i {
    color: #e5676b;
  }
  #submit p:nth-of-type(2) {
    width: 1.75rem;
    height: 0.57rem;
    background: #ff6040;
    font-size: 0.15rem;
    color: #fff;
    margin-left: 0.85rem;
    text-align: center;
    line-height: 0.57rem;
    border-radius: 0.05rem;
  }
</style>
