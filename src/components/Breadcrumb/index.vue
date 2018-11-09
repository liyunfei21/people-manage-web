<template>
  <el-breadcrumb class="app-breadcrumb" separator=">">
    <transition-group name="breadcrumb">
      <el-breadcrumb-item v-for="(item,index) in levelList" v-if="item.meta.title" :key="item.path">
        <span v-if="item.redirect==='noredirect'||index==levelList.length-1" class="no-redirect">{{ generateTitle(item.meta.title)}}</span>
        <router-link v-else :to="item.redirect||item.path">{{ generateTitle(item.meta.title)}}</router-link>
      </el-breadcrumb-item>
    </transition-group>
  </el-breadcrumb>
</template>

<script>
  import { generateTitle } from '@/utils/i18n'
export default {
    name: 'Breadcrumb',
    data() {
      return {
        levelList: null
      }
    },
    watch: {
      $route() {
        this.getBreadcrumb()
      }
    },
    created() {
      this.getBreadcrumb()
    },
    methods: {
      getBreadcrumb() {
        let matched = this.$route.matched.filter(item => item.name)
        const first = matched[0]
        const { p } = this.$route.query
        if (p === 1) {
          matched = [{ path: '/project/beneficiary', meta: { title: 'beneficiary' }}].concat(matched)
        }

        let levelList = []
        for (let i = 0; i < matched.length; i++) {
          const item = matched[i]
          if (item.meta.parent !== undefined) {
            levelList = [{ path: item.meta.parent.path, meta: { title: item.meta.parent.title }}].concat(item)
          } else {
            levelList = matched.filter(item => !item.meta.parent)
          }
        }

        this.levelList = levelList
      },
      generateTitle
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .app-breadcrumb.el-breadcrumb {
    display: inline-block;
    font-size: 14px;
    line-height: 50px;
    margin-left: 10px;
    .no-redirect {
      color: #97a8be;
      cursor: text;
    }
  }
</style>
