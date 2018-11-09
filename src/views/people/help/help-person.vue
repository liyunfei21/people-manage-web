<template>
  <section class="app-container">
    <el-row :gutter="20">
      <el-col :span="5" :offset="6">
        <el-input v-model="pars.keywords" placeholder="输入帮扶人姓名" @keyup.enter.native="handleSearch"/>
      </el-col>
      <el-col :span="8">
        <el-button type="primary" icon="el-icon-search" @click="handleSearch">搜索</el-button>
        <el-button type="primary" :icon="screenIcon" @click="handleShowScreen">筛选</el-button>
      </el-col>
    </el-row>

    <el-row>
      <el-col>
        <el-table :data="persons" highlight-current-row style="width: 100%;" element-loading-text="拼命加载中"
                  v-loading.body="listLoading" border fit highlight-current-row class="help-person-table">
          <!--<el-table-column type="selection" width="55">-->
          <!--</el-table-column>-->
          <el-table-column type="index" width="60" label="序号">

          </el-table-column>
          <el-table-column prop="helpPersonName" label="帮扶人姓名"/>
          <el-table-column prop="sex" label="性别" :formatter="displayColumn"/>
          <el-table-column prop="unitName" label="单位名称" :formatter="displayColumn"/>
          <el-table-column prop="administrativeDivision" label="行政区划" :formatter="displayColumn"/>
          <el-table-column prop="jobLevel" label="职务级别" :formatter="displayColumn"/>
          <el-table-column prop="politicalStatus" label="政治面貌" :formatter="displayColumn"/>
          <el-table-column prop="education" label="学历" :formatter="displayColumn"/>
          <el-table-column prop="speciality" label="技术特长" :formatter="displayColumn"/>
          <el-table-column prop="phone" label="联系电话" :formatter="displayColumn"/>
          <el-table-column label="结对信息" fixed="right">
            <template slot-scope="scope">
              <el-button
                @click.native.prevent="handleViewHelped(scope.row, persons)"
                type="text"
                size="small">
                {{scope.row.helpedPersonNum}}
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-col>
    </el-row>
    <el-row>
      <el-col>
        <div class="block">
          <el-pagination
            ref="pagination"
            background
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :page-size="pars.size"
            :current-page="pars.page"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total"
          >
          </el-pagination>
        </div>
      </el-col>
    </el-row>
  </section>
</template>

<script>
  import { getHelpPersons } from '@/api/help_person'
  export default {
    name: 'help-person',
    data() {
      return {
        screenIcon: 'el-icon-caret-right',
        pars: {// 核心的，列表页面的统一参数，建议整个系统内部的列表页都统一这种格式
          keywords: '',
          size: 10,
          page: 1,
          unitIds: []
        },
        listLoading: true,
        persons: [],
        total: 0
      }
    },
    methods: {
      displayColumn(row, column, cellValue, index) {
        return cellValue === null ? '-' : cellValue
      },
      async getPersons() {
        this.listLoading = true
        this.$store.dispatch('saveListPagePars', { path: this.$route.path, pars: this.pars })
        const from = (this.pars.page - 1) * this.pars.size
        const params = {
          from: from,
          size: this.pars.size,
          unitIds: this.pars.unitIds,
          keywords: this.pars.keywords
        }
        const result = await getHelpPersons(params)
        if (result.code === 200) {
          this.persons = result.data.list
          this.total = result.data.total

          this.listLoading = false
        }
      },
      handleSizeChange(val) {
        this.pars.size = val
        this.getPersons()
      },
      handleCurrentChange(val) {
        this.pars.page = val
        this.getPersons()
      },
      handleSearch() {
        this.pars.page = 1
        this.getPersons()
      },
      handleShowScreen() {
        this.$router.push({ name: 'screen' })
      },
      handleViewHelped(val) {
        this.$router.push({ name: 'helpedPerson', query: { id: val.helpPersonId }})
      }
    },
    mounted() {
      this.getPersons()
      this.$refs.pagination.internalCurrentPage = this.pars.page
    },
    created() {
      // if (this.$store.getters.listPagePars.has(this.$route.path)) {
      //   this.pars = this.$store.getters.listPagePars.get(this.$route.path)
      // }

      const tags = this.$store.getters.listPagePars.get('help-tags')
      if (tags) {
        this.pars.page = 1
      }
      this.pars.unitIds = tags
    }
  }
</script>

<style scoped>
  .block{
    float: right;
    margin-top: 15px;

  }
  .help-person-table{
    margin-top: 15px;
  }
</style>
