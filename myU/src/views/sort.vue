<template>
    <div>
      <Uhead></Uhead>
      <van-search
        shape="round"
        background="#ff6040"
        placeholder="请输入搜索关键词"
      />
      <div class="con">
        <van-sidebar v-model="activeKey" @change="onChange">
          <van-sidebar-item :title="item.catename" v-for="(item,index) in goodstree" :key="item.id "/>
        </van-sidebar>
        <div class="context">
          <van-grid  :column-num="3" :gutter="5" center :border="false">
            <van-grid-item v-for="item in list" :key="item.id"  :to="'/goodslist?pid='+item.pid">
              <van-image :src="$imgUrl+item.img" />
              <p class="font">{{item.catename}}</p>
            </van-grid-item>
          </van-grid>

        </div>
      </div>

    </div>
</template>

<script>
    import Uhead from "../components/Uhead";
    import Vue from 'vue';
    import { Sidebar, SidebarItem } from 'vant';
    import {getcatetree} from '@/axios'

    Vue.use(Sidebar);
    Vue.use(SidebarItem);
    export default {
        name: "sort",
        data(){
          return {
            activeKey: 0,
            goodstree:[],
            idx:0,
            list:[]
          }
        },
        components:{
           Uhead
        },
        mounted() {
          getcatetree()
          .then(res => {
            if(res.data.code === 200){
              this.goodstree = res.data.list
              this.list = res.data.list[this.idx].children
            }
            })
        },
      methods:{
        onChange(index) {
          this.idx = index
          this.list = this.goodstree[this.idx].children
        },
      }
    }
</script>

<style scoped>
  .van-sidebar{
    width: 1.2rem;
  }
  .con{
    display: flex;
  }
  .con .context{
    flex: 1;
  }

  .van-grid-item{
    width: .8rem;
  }
  .font{
    font-size: .12rem;
  }
</style>
