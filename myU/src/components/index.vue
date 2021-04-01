<template>
    <div>
      <!--二级路由出口-->
      <router-view></router-view>
      <Ufoot></Ufoot>
    </div>
</template>

<script src="//at.alicdn.com/t/font_2220086_xcj6xhr0cim.js"></script>

<script>
    import Ufoot from "./Ufoot";
    export default {
      name: "index",
      components : {
          Ufoot
      }
    }
</script>

<style>
  @import '//at.alicdn.com/t/font_2220086_xcj6xhr0cim.css';
</style>
