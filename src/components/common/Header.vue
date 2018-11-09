<template>
  <el-menu class="header" style="background-color: white;">
    <breadcrumb />
    <div class="user-info">
    <!--  <lang-select class="right-menu-item"></lang-select>
      <skinComp class="right-menu-item"></skinComp>-->
      <el-dropdown trigger="click" @command="handleCommand">
                <span class="el-dropdown-link">
                    <img class="user-logo" v-bind:src="avatar" > {{username}}
                </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="loginout">退出</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </el-menu>
</template>
<script>
  import LangSelect from '@/components/LangSelect'
  import skinComp from '@/components/skin'
  import Breadcrumb from '@/components/Breadcrumb'
  import store from '../../store'

  export default {
    components: {
      LangSelect,
      skinComp,
      Breadcrumb
    },
    created() {
    },
    data() {
      return {
        name: ''
      }
    },
    computed: {
      username() {
        const username = localStorage.getItem('ms_username')
        return username || this.name
      },
      avatar() {
        const avatar = store.getters.avatar
        return avatar || '/static/img/sys/default_user.png'
      }
    },
    methods: {
      handleCommand(command) {
        if (command === 'loginout') {
          localStorage.removeItem('ms_username')
          this.$store.dispatch('LogOut').then(() => {
            location.reload() // 为了重新实例化vue-router对象 避免bug
          })
        }
      }
    }
  }
</script>
<style scoped>
  .header {
    position: absolute;
    box-sizing: border-box;
    width: auto;
    right: 0;
    left: 300px;
    height: 70px;
    font-size: 22px;
    line-height: 70px;
    color: #909399;
    border-bottom: rgb(218,224,248) solid 1px;
  }

  .header .logo {
    float: left;
    width: 250px;
    text-align: center;
  }

  .user-info {
    float: right;
    padding-right: 50px;
    font-size: 16px;
    color: #909399;
  }

  .user-info .el-dropdown-link {
    position: relative;
    display: inline-block;
    padding-left: 50px;
    color: #909399;
    cursor: pointer;
    vertical-align: middle;
  }

  .user-info .user-logo {
    position: absolute;
    left: 0;
    top: 15px;
    width: 40px;
    height: 40px;
    border-radius: 50%;
  }

  .el-dropdown-menu__item {
    text-align: center;
  }

  .right-menu-item {
    display: inline-block;
    margin: 0 8px;
  }

  .hamburger-container {
    line-height: 58px;
    height: 50px;
    float: left;
    padding: 0 10px;
  }
</style>
