<template>
  <div class="login">
    <div class="head">
      <h1>手机登录</h1>
    </div>
    <div class="main">
      <img :src="logImg" alt="">
      <van-field
        v-model="Person.phone"
        name="手机号"
        label="手机号"
        :rules="[{ required: true, message: '请填写用户名'}]"
      />
      <van-field
        v-model="Person.password"
        type="password"
        name="U密码"
        label="U密码"
        :rules="[{ required: true, message: '请填写密码' }]"
      />
      <div style="margin: 16px;" >
        <van-button round block type="info"  class="btn" native-type="submit"  @click="send">登 陆</van-button>
      </div>
      <router-link to="/register" tag="p" class="go">去注册</router-link>
    </div>

  </div>
</template>
<script>
  import { sendLogIn } from '../axios'
  import { mapActions } from 'vuex'
  import {Toast} from "vant";
    export default {
      data(){
          return{
            logImg : require('../assets/img/orange.png'),
            Person : {
              phone : '',
              password : ''
            }
          }
      },
      methods : {
        ...mapActions(['getUserInfoAction']),
          send(){
            if (this.Person.name === '' || this.Person.password === '') {
              Toast.fail('内容为空');
              return
            }
            sendLogIn(this.Person)
            .then(res => {
              if (res.data.code === 200){
                this.getUserInfoAction(res.data.list)
                Toast.success(res.data.msg);
                this.$router.push('/home')
                return
              }else{
                Toast.fail(res.data.msg);
              }
            })
          }
      },
      beforeRoueLeave(to,from,next){
        if (sessionStorage.getItem('user')===null){
          next('/log')
          location.reload()
        }else {
          next()
        }
      }
    }
</script>

<style scoped>
  .login{
    height: 100vh;
    background: #F2F2F2;
  }
  .head{
    height: .44rem;
    background: #ff6040;
    font-size: .17rem;
    letter-spacing: 0;
    text-align: center;
    color: #FFFFFF;
    line-height: .44rem;
  }
  .main{
    margin: 10px;
    height: 90%;
    background: #FFFFFF;
  }
  .main img{
    padding-top: 2.24rem;
    margin-left: .87rem;
    display: block;
    margin-bottom: .44rem;
  }
  .main label{
    margin-left: .25rem;
  }
  .main .go {
    color: #999999;
    margin: .3rem 0 0 2.7rem;
  }
  .main .btn{
    background: #999999;
    border: none;
  }
</style>
