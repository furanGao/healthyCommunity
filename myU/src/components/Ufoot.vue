<template>
  <div class="foott">
    <p>
      <router-link to="/home" tag="div" active-class="cur">
        <span class="iconfont icon-shouye1"></span>
        <span>首页</span>
      </router-link>
    </p>
    <p>
      <router-link to="/sort" tag="div" active-class="cur">
        <span class="iconfont icon-shouye1"></span>
        <span>分类</span>
      </router-link>
    </p>
    <p>
      <router-link to="/cart" tag="div" active-class="cur">
        <span class="iconfont icon-gouwuche"></span>
        <span>购物车</span>
      </router-link>
    </p>

    <p>

      <router-link to="/mine" tag="div" active-class="cur" >
        <span class="iconfont icon-wode"></span>
        <span>我的</span>
      </router-link>
    </p>
  </div>
</template>

<script>
    export default {
        name: "Ufoot"
    }
</script>

<style scoped>
  /*footer*/
  .foott {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 0.61rem;
    box-sizing: border-box;
    background: #fff;
    border-top: 1px solid #f7f7f7;
    display: flex;
    justify-content: space-between;
    font-size: .1rem;
    align-items: center;
  }
  .foott p {
    flex: 1;
    font-size: 0.1rem;
    color: #888888;
  }
  .foott p span:nth-of-type(1) {
    font-size: 0.3rem;
    color: #999999;
  }
  .foott p span:nth-of-type(2) {
    font-size: 0.15rem;
    color: #999999;
  }
  .foott p>div{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  .cur{
    color: #e9782c;
  }
</style>
