<template>
  <el-row>
    <el-col>
      <el-button type="primary" icon="el-icon-back" @click="handleReturn" class="margin-bottom-top-10">返回</el-button>
    </el-col>
    <el-col>
      <h3 class="margin-bottom-top-10">帮扶单位筛选</h3>
      <h5 class="margin-bottom-top-10">行政区划 : 渝北区</h5>
      <hr/>
    </el-col>

    <el-col v-for="filter in filters">
      <el-row :gutter="5" class="screen-row">
        <el-col :span="2">{{filter.name}}</el-col>
        <el-col :span="22">
          <el-tag v-for="unit in filter.unitList" :type.native="getTagType(unit.id)"  class="unit" size="medium" @click.native="handleSelTag(unit.id)">
            {{unit.name}}
          </el-tag>
        </el-col>
      </el-row>
    </el-col>

  </el-row>
</template>

<script>
  import { getAreaDictByType, getAdministrationUnit } from '@/api/dict'

  export default {
    name: 'screen',
    data() {
      return {
        isActive: '',
        activeList: [],
        areaId: 501006000000,
        townList: [],
        unitListMap: {},
        filters: []
      }
    },
    methods: {
      handleReturn() {
        this.$store.dispatch('saveListPagePars', { path: 'help-tags', pars: this.activeList })
        this.$router.back()
      },
      async getTowns() {
        const towns = await getAreaDictByType('town', this.areaId)
        if (towns.code === 200) {
          this.townList = towns.data
          this.getUnits()
        }
      },
      buildFilters() {
        const filters = []
        const townList = this.townList
        const unitListMap = this.unitListMap
        for (const i in townList) {
          const filter = {}
          filter.id = townList[i].areaId
          filter.name = townList[i].areaName
          filter.unitList = unitListMap[townList[i].areaId]
          filters.push(filter)
        }
        this.filters = filters
      },
      async getUnits() {
        const areaIds = []
        const townList = this.townList
        for (const i in townList) {
          areaIds.push(townList[i].areaId)
        }
        const params = {
          queryAreaIds: areaIds
        }
        const result = await getAdministrationUnit(params)
        if (result.code === 200) {
          this.unitListMap = result.data.units
          this.buildFilters()
        }
      },
      handleSelTag(val) {
        if (this.activeList.indexOf(val) === -1) {
          this.activeList.push(val)
        } else {
          this.activeList.splice(this.activeList.indexOf(val), 1)
        }
      },
      getTagType(val) {
        if (this.activeList.indexOf(val) !== -1) {
          return 'success'
        } else {
          return ''
        }
      }
    },
    created() {
      const tags = this.$store.getters.listPagePars.get('help-tags')
      if (tags) {
        this.activeList = tags
      }
    },
    mounted() {
      this.getTowns()
    }
  }
</script>

<style scoped>
  .margin-bottom-top-10 {
    margin-top: 5px;
    margin-bottom: 5px;
  }

  .screen-row {
    min-height: 36px;
  }
  .unit{
    margin-left: 15px;
  }
</style>
