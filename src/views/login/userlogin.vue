<template>
  <el-form class="login-form" status-icon :rules="loginRules" ref="loginForm" :model="loginForm">
    <el-form-item prop="username">
      <el-input @keyup.enter.native="handleLogin" v-model="loginForm.username" auto-complete="off" placeholder="请输入用户名">
        <i slot="prefix" class="icon-yonghu"></i>
      </el-input>
    </el-form-item>
    <el-form-item prop="password">
      <el-input  @keyup.enter.native="handleLogin" :type="passwordType" v-model="loginForm.password" auto-complete="off" placeholder="请输入密码">
        <i class="el-icon-view el-input__icon" slot="suffix" @click="showPassword"></i>
        <i slot="prefix" class="icon-mima"></i>
      </el-input>
    </el-form-item>
    <el-form-item prop="code">
      <el-input type="text" v-model="loginForm.code" @keyup.enter.native="handleLogin" placeholder="- - - -">
        <template slot="prepend">验证码</template>
        <template slot="append">
          <img class="login-code" :src="verifyCode"  @click="refreshCode"/>
        </template>
      </el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" size="small" @click.native.prevent="handleLogin" class="login-submit">登录</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import { validatenull } from '@/utils/validate'
export default {
  name: 'userlogin',
  components: {
  },
  data() {
    const validateUsername = (rule, value, callback) => {
      if (validatenull(value)) {
        callback(new Error('请输入正确的用户名'))
      } else {
        callback()
      }
    }
    return {
      baseUrl: process.env.BASE_API,
      verifyCode: '',
      loginForm: {
        username: '',
        password: '',
        code: null
      },
      checked: false,
      loginRules: {
        username: [
          { required: true, trigger: 'blur', validator: validateUsername }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, message: '密码长度最少为6位', trigger: 'blur' }
        ],
        code: [
          { required: true, message: '请输入验证码', trigger: 'blur' },
          { min: 4, max: 4, message: '验证码长度为4位', trigger: 'blur' },
        ]
      },
      passwordType: 'password'
    }
  },
  created() {
    this.loadVerifyCode()
  },
  mounted() {},
  computed: {
  },
  props: [],
  methods: {
    loadVerifyCode() {
      this.verifyCode = this.baseUrl + '/user/getVerify?' + Math.random()
    },
    refreshCode() {
      this.loadVerifyCode()
    },
    showPassword() {
      this.passwordType === ''
        ? (this.passwordType = 'password')
        : (this.passwordType = '')
    },
    handleLogin() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          localStorage.setItem('ms_username', this.loginForm.username)
          this.$store.dispatch('Login', this.loginForm).then(res => {
            this.$router.push({ name: 'povertyPeopleManage' })
          })
        }
        this.loadVerifyCode()
        this.loginForm.code=''
      })
    }
  }
}
</script>
<style lang="scss">
  .login-code {
    height: 30px;
    width: 80px;
    display: block;
    margin: 0px -20px;
    border-top-right-radius: 2px;
    border-bottom-right-radius: 2px;
  }
</style>
