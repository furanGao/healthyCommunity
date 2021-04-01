<template>
  <div>
    <Uhead></Uhead>
    <div class="nav">
      <span>全部(20)</span>
      <span>降价(4)</span>
      <span>常卖(2)</span>
      <span>分类</span>
    </div>
    <div v-if="goodslist.length !== 0||userInfo !== null" id="hei">
      <van-swipe-cell v-for="(item,index) in goodslist"  :key="item.id" class="box w">
        <van-card
          :price="item.price|toprice(2)"
          desc="描述信息"
          :title="item.goodsname"
          class="goods-card"
          :thumb="$imgUrl + item.img"
        />
        <van-stepper v-model="num = item.num" theme="round" button-size="22" disable-input class="h" />
        <template #right>
          <van-button square text="删除" type="danger"  class="delete-button" @click="del(index)" />
        </template>
      </van-swipe-cell>
      <van-submit-bar :price="sumPrice" button-text="结 算" @submit="tosure">
        <van-checkbox v-model="allChecked" checked-color="#ee0a24" :bind-group="false">全选</van-checkbox>
        <template #tip>
          你的收货地址不支持同城送, <span>修改地址</span>
        </template>
      </van-submit-bar>
    </div >
    <div v-else>
      <van-empty description="购物车空空空！！"></van-empty>
    </div>
  </div>
</template>

<script>
    import Uhead from "../components/Uhead";
    import {getcartlist ,getcartdelete} from '@/axios'
    import {goodsDelete} from "../../../uushop/src/util/axios";
    export default {
        data(){
          return {
            goodslist : [],
            allChecked : false,
            num : [],
            userInfo:null
          }
        },
        components:{
          Uhead
        },
        mounted() {
          this.getlist()
          this.userInfo = sessionStorage.getItem('user')?JSON.parse(sessionStorage.getItem('user')):null
        },
        methods:{
          getlist(){
            let uid = this.$store.getters.getUserInfo?this.$store.getters.getUserInfo.uid:0
            if (uid){
              getcartlist({uid})
                .then(res => {
                  if (res.data.code === 200){
                    if (res.data.list === null){
                      this.goodslist = []
                      return
                    }
                    this.goodslist = res.data.list
                    // this.goodslist.forEach(item => {
                    //   item.checked = true
                    // })
                  }
                })
            }

          },
          tosure(){
            // let uid =this.$store.getters.getUserInfo.uid
            // getcartlist({uid})
            //   .then(res => {
            //     if (res.data.code === 200){
            //       if (res.data.list === null){
            //         this.goodslist = []
            //         return
            //       }
            //       res.data.list.forEach((item,index) => {
            //         console.log(this.goodslist[index].num)
            //         item.num = this.goodslist[index].num
            //       })
            //     }
            //   })
            this.$router.push('/goodssure')
          },
          del(idx){
            let id = this.goodslist[idx].id
            getcartdelete({id})
            .then()
            this.getlist()
          }
        },
        computed:{
          sumPrice(){
            let sum = 0
            this.goodslist.map(item => {
              sum += item.num * item.price
            })
            return sum*100
          }
        }
    }
</script>

<style scoped>
  .van-swipe-cell{
    background: #fafafa;
    margin:.2rem 0;
  }
  .goods-card{
    float: left;
    width: calc(100% - .5rem);
  }
  .van-radio-group{
    float: left;
    display: inline-block;
    margin-top: .5rem;
    padding-left: .1rem;
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
  #hei{
    margin-bottom: 2rem;
  }
  .box>>>div.van-swipe-cell__right{
    padding-top: .3rem;
  }
  .van-submit-bar{
    margin-bottom: .61rem;
  }
  .w>>>.goods-card{
    width: 250px;
  }
  .h{
    line-height: 104px;
  }

</style>
