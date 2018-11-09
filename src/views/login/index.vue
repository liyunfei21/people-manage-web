<template>
  <div class="login">
    <div class="login-info">
      <div class="logo" style="margin-top: 0">
        <img src="../../assets/images/home/logo.png" alt="logo"/>
      </div>
      <h4 class="login-info-title">{{website.info.title}}</h4>
    </div>
    <div class="login-container pull-height" @keyup.enter.native="handleLogin">
      <div class="login-border  animated fadeInRight">
        <div class="login-main">
          <h4 class="login-title">登录{{website.title}}
          </h4>
          <userLogin></userLogin>
        </div>
      </div>
   </div>
    <div class="footer">
      <p><span></span></p>
    </div>
  </div>
</template>
<script>
  import userLogin from './userlogin'
  import codeLogin from './codelogin'
  import { mapGetters } from 'vuex'
  export default {
    name: 'login',
    components: {
      userLogin,
      codeLogin
    },
    data() {
      return {
        activeName: 'user'
      }
    },
    created() {},
    mounted() {},
    computed: {
      ...mapGetters(['website'])
    },
    props: [],
    methods: {}
  }
</script>

<style lang="scss">

  .login {
    height: 100%;
    .login-info {
      width: 100%;
      height: 40px;
      .logo{
        position: absolute;
        top: 0;
        img{
          height: 60px;
          width: 60px;
          position: absolute;
          left: 30px;
          top: 0px;
        }
      }
      .login-info-title {
        position: absolute;
        line-height: 40px;
        left: 100px;
        top: -9px;
      }
    }
  }
  .login-container {
    top: 20px;
    display: flex;
    align-items: center;
    justify-content: space-around;
    position: relative;
    height: 88%;
  }
  .login-container::before {
    z-index: -999;
    content: "";
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background-image: url("../../../static/img/top_images/login.png");
    background-size: cover;
  }

  .login-info-item {
    font-size: 14px;
  }
  .login-border {
    display: flex;
    justify-content: center;
    flex-direction: column;
    padding: 30px 50px 25px 50px;
    background-color: #fff;
    border-radius: 6px;
    box-shadow: 1px 1px 2px #eee;
    position: absolute;
    right: 150px;
  }
  .login-main {
    border-radius: 3px;
    box-sizing: border-box;
    background-color: #fff;
  }
  .login-main > h3 {
    margin-bottom: 20px;
  }
  .login-main > p {
    color: #76838f;
  }
  .login-title {
    margin: 0 0 20px;
    text-align: center;
    color: #409eff;
    font-size: 20px;
    letter-spacing: 10px;
  }
  .login-submit {
    margin-top: 20px;
    width: 100%;
    border-radius: 28px;
  }
  .login-form {
    margin: 10px 0;
    .el-form-item__content {
      width: 270px;
    }
    .el-form-item {
      margin-bottom: 20px;
    }
    .el-input {
      input {
        text-indent: 5px;
        border-color: #dcdcdc;
        border-radius: 3px;
      }
      .el-input__prefix {
        i {
          padding: 0 5px;
          font-size: 16px !important;
        }
      }
    }
  }
  .login-code {
    display: flex;
    align-items: center;
    justify-content: space-around;
    margin: 0 0 0 10px;
  }
  .login-code-img {
    margin-top: 2px;
    width: 100px;
    height: 32px;
    background-color: #fdfdfd;
    border: 1px solid #f0f0f0;
    color: #333;
    font-size: 14px;
    font-weight: bold;
    letter-spacing: 5px;
    line-height: 32px;
    text-indent: 5px;
    text-align: center;
  }
  .footer {
    height: 50px;
    font-size: 13px;
    width: 100%;
    text-align: center;
    background-color: rgb(254,255,255);
    line-height: 50px;
    span {
      padding-left: 50px;
    }
  }
</style>
