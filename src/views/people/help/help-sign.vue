<template>
  <div>
    <el-row>
      <h3 class="margin-bottom-top-5">帮扶人签到排行</h3>
    </el-row>
    <el-row class="margin-bottom-top-5">
      <el-col>
        <el-table :data="signs" border fit highlight-current-row style="width: 100%;" element-loading-text="拼命加载中"
                  v-loading.body="listLoading"  element-loading-spinner="el-icon-loading">
          <el-table-column label="序号" type="index" width="60"/>
          <el-table-column label="年度" prop="yearState"/>
          <el-table-column label="帮扶人" prop="helpPersonName"/>
          <el-table-column label="单位" prop="companyName"/>
          <el-table-column label="职务" prop="jobLevel"/>
          <el-table-column label="签到地址" prop="signInAddr"/>
          <el-table-column label="签到时间" >  <template slot-scope="scope">
            {{ formatter_date(scope.row.signInTime)}}
          </template></el-table-column>
          <el-table-column label="签到次数" >
            <template slot-scope="scope">
              <el-button type="text" @click="handleViewSignInfo(scope.row)">{{scope.row.signNum}}</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-col>
    </el-row>

    <el-row>
      <el-col>
        <div class="block">
          <el-pagination
            background
            ref="pagination"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :page-size="pars.size"
            :current-page="pars.page"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total">
          </el-pagination>
        </div>
      </el-col>
    </el-row>

  </div>
</template>

<script>
  import { getHelpSigns } from '../../../api/help_person'
  import { formatTime } from '../../../utils'
  export default {
    name: 'help-sign',
    data() {
      return {
        listLoading: true,
        signs: [],
        pars: {// 核心的，列表页面的统一参数，建议整个系统内部的列表页都统一这种格式
          keywords: '',
          size: 10,
          page: 1
        },
        total: 0
      }
    },
    methods: {
      async getHelpSigns() {
        this.listLoading = true
        // 存储请求参数
        this.$store.dispatch('saveListPagePars', { path: this.$route.path, pars: this.pars })
        // 计算from
        const from = (this.pars.page - 1) * this.pars.size
        const params = {
          from: from,
          size: this.pars.size
        }
        const result = await getHelpSigns(params)
        if (result.code === 200) {
          this.signs = result.data.list
          this.total = result.data.total
          this.listLoading = false
        }
      },
      handleSizeChange(val) {
        this.size = val
        this.getHelpSigns()
      },
      handleCurrentChange(val) {
        this.pars.page = val
        this.getHelpSigns()
      },
      handleViewSignInfo(val) {
        this.$router.push({ name: 'help-sign-info', query: { signerId: val.helpPersonnelId }})
      },
      formatter_date(val) {
        return formatTime(val)
      }
    },
    mounted() {
      this.getHelpSigns()
      this.$refs.pagination.internalCurrentPage = this.pars.page
    },
    created() {
      // if (this.$store.getters.listPagePars.has(this.$route.path)) {
      //   this.pars = this.$store.getters.listPagePars.get(this.$route.path)
      // }
    }
  }
</script>

<style scoped>
  .margin-bottom-top-5 {
    margin-top: 5px;
    margin-bottom: 5px;
  }
  .block{
    float: right;
    margin-top: 15px;

  }
</style>
