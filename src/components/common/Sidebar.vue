<template>
  <div class="sidebar" :style="{ 'background': primaryColor }">
    <div>
      <div class="logo">
        <div>
          <img  src="../../assets/logo.png"/>
        </div>
        <div class="logo-text">
          <span>{{$t('navbar.title')}}</span>
        </div>
        <hr class="hr"/>
      </div>
    </div>
    <el-menu :default-active="onRoutes" class="el-menu-vertical-demo" unique-opened text-color="#c6c6fc"
             active-text-color="#67C23A"
             mode="vertical"
             :show-timeout="200"
             :style="{ 'background': primaryColor }">
      <template v-for="item in routes" v-if="!item.hidden">


        <el-submenu :index="item.name||item.path">
          <template slot="title"><span :class="item.meta.icon" />{{ generateTitle(item.meta.title) }}</template>

          <template v-for="child in item.children" v-if="!child.hidden">
            <router-link :to="child.path" :key="child.name">
              <el-menu-item :index="child.index" :style="{ 'background': primaryColor }">
                <span class="icon iconfont icon-my_circle" />{{ generateTitle(child.meta.title) }}
              </el-menu-item>
            </router-link>
          </template>

        </el-submenu>

      </template>
    </el-menu>
  </div>
</template>

<script>
  import path from 'path'
  import { generateTitle } from '@/utils/i18n'

  export default {
    name: 'vSidebar',
    data() {
      return {
        themeValue: '',
        primaryColor: ''
      }
    },
    props: {
      routes: {
        type: Array
      },
      isNest: {
        type: Boolean,
        default: false
      }
    },
    computed: {
      onRoutes() {
        return this.$route.path.replace('/permission', '')
      },
      onThemeValue() {
        this.themeValue = this.$store.getters.themeValue
        return this.$store.getters.themeValue
      }
    },
    watch: {
      onThemeValue() {
        this.changeTheme()
      }
    },
    methods: {
      hasOneShowingChild(children) {
        const showingChildren = children.filter(item => {
          if (item.hidden) {
            return false
          } else {
            // temp set(will be used if only has one showing child )
            this.onlyOneChild = item
            return true
          }
        })
        if (showingChildren.length === 1) {
          return true
        }
        return false
      },
      resolvePath(...paths) {
        return path.resolve(this.basePath, ...paths)
      },
      generateTitle,
      changeTheme() {
        if (this.themeValue) {
          switch (this.themeValue) {
            case 'blue':
              /* eslint-disable */
              this.primaryColor = '-webkit-linear-gradient(left top, #409eff , #1181FF)'
              break
            case 'green':
              this.primaryColor = '-webkit-linear-gradient(left top, #009a61 , Green)'
              break
            case 'red':
              this.primaryColor = '-webkit-linear-gradient(left top, #f44336,#F4461C)'
              break
            case 'purple':
              this.primaryColor = '-webkit-linear-gradient(left top, rgb(114,127,237) ,rgb(136,121,212)'
              break
            default:
              this.primaryColor = '-webkit-linear-gradient(left top, rgb(114,127,237) ,rgb(136,121,212)'
              break;
          }
        } else {
          this.primaryColor = '-webkit-linear-gradient(left top, rgb(114,127,237) ,rgb(136,121,212)'
        }
      }
    },
    created() {
      // 加载用户主题
      if (localStorage.getItem('themeValue')) {
        switch (localStorage.getItem('themeValue')) {
          case 'blue':
            /* eslint-disable */
            this.primaryColor = '-webkit-linear-gradient(left top, #409eff , #1181FF)'
            break
          case 'green':
            this.primaryColor = '-webkit-linear-gradient(left top, #009a61 , Green)'
            break
          case 'red':
            this.primaryColor = '-webkit-linear-gradient(left top, #f44336,#F4461C)'
            break
          case 'purple':
            this.primaryColor = '-webkit-linear-gradient(left top, rgb(114,127,237) ,rgb(136,121,212)'
            break
          default:
            this.primaryColor = '-webkit-linear-gradient(left top, rgb(114,127,237) ,rgb(136,121,212)'
            break;
        }
      } else {
        this.primaryColor = '-webkit-linear-gradient(left top, rgb(114,127,237) ,rgb(136,121,212)'
      }
    }
  }
</script>

<style lang="scss">
  @import "./myIons/iconfont.css";
  $width: 270px;
  .sidebar {
    display: block;
    position: absolute;
    width: $width;
    left: 0;
    top: 0;
    bottom: 0;
    background: -webkit-linear-gradient(left top, rgb(114,127,237) ,rgb(136,121,212));
  }

  .sidebar > ul {
    height: 100%;
    width: 100%;
    background: -webkit-linear-gradient(left top, rgb(114,127,237) ,rgb(136,121,212));
  }
  .sidebar .el-submenu .el-menu-item {
    height: 100%;
    width: 100%;
    background: -webkit-linear-gradient(left top, rgb(114,127,237) ,rgb(136,121,212));
  }
  .logo {
    margin-top: 10px;
    width: $width;
    text-align: center;
    margin-bottom: 30px;

  }
  .logo img{
    width: 45%;
  }
  .logo .logo-text{
    color: #ffffff;
    margin-top: 10px;
    text-align: center;
    width: 100%;
  }
  .logo .hr{
      width: 80%;
      background-color: white;
      opacity: 0.3;
      height: 1px;
      border: none;
      margin: 0 auto;
      margin-top: 20px;

  }
 .el-menu-item span,.el-submenu__title span{
    margin-right:10px;;
    font-size: 15px;
  }
</style>
