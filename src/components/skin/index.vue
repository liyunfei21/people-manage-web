<template>
  <div>
    <!-- <el-select v-model="locale" size="small" style="width:100px">
      <el-option v-for="(item,key,index) in langs" :key="index" :label="$t('locales.' + key)" :value="key">
      </el-option>
    </el-select> -->
    <el-dropdown @command="handleCommandSkin" trigger="hover" class="eldropdown">
      <span class="el-dropdown-link lang">{{$t('navbar.theme')}}</span>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item v-for="(item,index) in skins" :key="index" :command="item.name">{{generateSkinColor(item.label)}}</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>

  </div>
</template>
<script>
import { generateSkinColor } from '@/utils/i18n'// 国际化主题名字
import { global } from '@/global/global'
export default {
  data() {
    return {
      skins: [
        { name: 'blue', label: 'blue' },
        { name: 'green', label: 'green' },
        { name: 'red', label: 'red' },
        { name: 'purple', label: 'default' }
      ]
    }
  },
  mounted() {},
  methods: {
    generateSkinColor,
    handleCommandSkin(command) {
      this.$store.dispatch('setThemeValue', command)
      global.changeTheme(command)
    }
  }
}
</script>

<style scoped>
.lang {
  cursor: pointer;
  color: #909399;
}

.eldropdown {
  margin-right: 5px;
}
.skin {
  /*margin-top: 3px;*/
  cursor: pointer;
}
</style>
