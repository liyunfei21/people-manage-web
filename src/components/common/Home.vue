<template>
  <div class="wrapper">
     <el-aside>
       <v-sidebar :routes="routes"></v-sidebar>
     </el-aside>
    <el-container>
    <el-header>
      <v-head></v-head>
    </el-header>
      <el-main>
    <div class="content">
      <transition name="move" mode="out-in">
        <router-view></router-view>
      </transition>
    </div>
      </el-main>
    </el-container>
  </div>
</template>

<script>
  import vHead from './Header.vue'
  import vSidebar from './Sidebar.vue'
  import store from '@/store'

  export default {
    name: 'Home',
    components: {
      vHead, vSidebar
    },
    computed: {
      routes() {
        return store.getters.routers
        // return this.$router.options.routes
      }
    }
  }
</script>
