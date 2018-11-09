<template>
  <div>
    <el-row>
      <el-col>
        <el-button type="primary" @click="handleClickReturn">返回</el-button>
      </el-col>
    </el-row>
    <el-row class="margin-bottom-top-5">
      <el-col>
        <h3>帮扶人签到详情</h3>
      </el-col>
    </el-row>

    <el-row class="margin-bottom-top-5">
      <el-col>
        <el-table :data="signerInfoList" border fit highlight-current-row style="width: 100%;" element-loading-text="拼命加载中"
                  v-loading.body="listLoading"  element-loading-spinner="el-icon-loading">
          <el-table-column label="序号" type="index" width="60"/>
          <el-table-column label="年度" prop="yearState"/>
          <el-table-column label="帮扶人" prop="helpPersonName"/>
          <el-table-column label="单位" prop="companyName"/>
          <el-table-column label="职务" prop="jobLevel"/>
          <el-table-column label="签到地点" prop="signInAddr"/>
          <el-table-column label="签到时间">
            <template slot-scope="scope">
              {{ formatter_date(scope.row.signInTime)}}
            </template>
          </el-table-column>
        </el-table>
      </el-col>
    </el-row>

    <el-row>
      <el-col>
        <div class="block">
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :page-size="size"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total">
          </el-pagination>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import { getHelpSignInfoList } from '../../../api/help_person'
  import { formatTime } from '../../../utils'
export default {
    name: 'help-sign-info',
    data() {
      return {
        listLoading: true,
        signerInfoList: [],
        signerId: null,
        total: 0,
        from: 0,
        size: 10
      }
    },
    methods: {
      handleClickReturn() {
        this.$router.back()
      },
      async getSignerInfoList() {
        this.listLoading = true
        const params = {
          from: this.from,
          size: this.size,
          helpPersonnelId: this.signerId
        }
        const result = await getHelpSignInfoList(params)
        if (result.code === 200) {
          this.signerInfoList = result.data.list
          this.total = result.data.total

          this.listLoading = false
        }
      },
      handleSizeChange(val) {
        this.size = val
        this.getHelpSigns()
      },
      handleCurrentChange(val) {
        const page = val
        this.from = (page - 1) * this.size
        this.getHelpSigns()
      },
      formatter_date(val) {
        return formatTime(val)
      }
    },
    created() {
      const { signerId } = this.$route.query
      if (signerId) {
        this.signerId = signerId
        this.getSignerInfoList()
      }
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
