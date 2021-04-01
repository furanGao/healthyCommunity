<template>
  <div class="register">
    <div class="head">
      <h1>手机注册</h1>
    </div>
    <div class="main">
      <img :src="logImg" alt="">
      <van-form >
        <van-field
          v-model="Person.phone"
          name="手机号"
          label="用户名"
          :rules="[{ required: true, message: '请填写用户名', }]"
        />
        <van-field
          v-model="Person.nickname"
          type="password"
          name="U昵称"
          label="U昵称"
          :rules="[{ required: true, message: '请填写昵称' }]"
        />
        <van-field
          v-model="Person.password"
          type="password"
          name="U密码"
          label="U密码"
          :rules="[{ required: true, message: '请填写密码' }]"
        />
        <div style="margin: 16px;">
          <van-button round block type="info"  class="btn" native-type="submit"  @click="register">注 册</van-button>
        </div>
      </van-form>
    </div>
  </div>
</template>

<script>
  import {sendRegister} from '../axios'
  import Vue from 'vue';
  import { Toast, Form} from 'vant';
  Vue.use(Form);
  Vue.use(Toast);
  export default {
    data(){
      return{
        logImg : require('../assets/img/orange.png'),
        Person : {
          phone : '',
          nickname : '',
          password : ''
        }
      }
    },
    methods : {
      register(){
        if (this.Person.phone === '' || this.Person.password === '' ||this.Person.nickname === '') {
          Toast.fail('内容为空');
          return
        }
        //调用注册接口
        sendRegister(this.Person)
        .then(res=>{
          if (res.data.code === 200){
            Toast.success(res.data.msg);
            this.$router.push('/login')
          }else{
            Toast.fail(res.data.msg);
          }
        })
      },
      changePhone(){
        //正则判断手机号 只能是数字并且位数为11位开头必须是1
        let phoneReg = /^1\d{10}$/;
        if (!this.Person.phone.match(phoneReg)){
          Toast({
            message: '手机号位数不对吆',
            position: 'bottom',
          });
        }
      }
    }
  }
</script>

<style scoped>
  .register{
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
    padding-top: 1.24rem;
    margin-left: .87rem;
    display: block;
    margin-bottom: .84rem;
  }
  .main label{
    margin-left: .25rem;
  }
  .main .nickname{
    margin: .22rem 0;
  }
  .main .btn{
   background: #999999;
    border: none;
  }
</style>
