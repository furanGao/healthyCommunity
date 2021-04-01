<template>
    <div>
      <h1>
          <van-nav-bar :title="title" left-text="返回" left-arrow @click-left="goback" class="font">
            <template #right>
              <van-icon name="search" size="18" />
            </template>
          </van-nav-bar>
        </h1>
    </div>
</template>

<script>
    export default {
        name: "Uhead",
        data(){
          return {
            title :''
          }
      },
        mounted() {
          this.title = this.$route.name
      },
      methods:{
          goback(){
            this.$router.go(-1)
          }
      }
    }
</script>

<style scoped>
  div{
    height: .44rem;
    width: 100%;
    background: #ff6040;
    text-align: center;
    line-height: .44rem;
  }
  h1{
    font-weight: normal;
  }
  .font>>>.van-ellipsis{
    font-size:.18rem;
    color: #fff;
  }
  .font>>>.van-nav-bar__text{
    color: #fff;
  }
</style>
