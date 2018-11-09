<template>
    <div>
      <el-button type="primary" class=" el-icon-back" style="margin-bottom: 10px;" @click="handleClickReturn"> 返回</el-button>
      <el-table :data="data.list" border hit v-loading.body="init.listLoading" highlight-current-row
                  element-loading-text="拼命加载中...">
          <el-table-column type="index" width="60" label="序号"></el-table-column>
          <el-table-column label="贫困户编号" prop="householdNumber"/>
          <el-table-column label="户主姓名" prop="householderName"/>
          <el-table-column label="地址"  prop="homeAddress"></el-table-column>
          <el-table-column label="详细信息">
            <template slot-scope="scope">
              <el-button type="text" @click="handleViewInfo(scope.row.familyYearStateId)">查看详情</el-button>
            </template>
          </el-table-column>
      </el-table>


      <div class="block">
        <el-pagination
          ref="pagination"
          background
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :page-size="pars.size"
          :current-page="pars.page"
          layout="total, sizes, prev, pager, next, jumper"
          :total="data.total"
        >
        </el-pagination>

      </div>
    </div>

</template>

<script>
    import { getBeneficiaryList } from '../../api/project'

export default {
      // 受益人
      name: 'beneficiary',
      data() {
        return {
          init: {
            listLoading: true
          },
          data: {
            list: null,
            total: 0
          },
          pars: {
            itemNumber: 0,
            page: 1,
            size: 10
          }
        }
      },
      methods: {
        handleClickReturn() {
          this.$router.push({ name: 'poverty-alleviation-project' })
        },
        async getList() {
          this.init.listLoading = true
          this.$store.dispatch('saveListPagePars', { path: this.$route.path, pars: this.pars })
          // params
          const from = (this.pars.page - 1) * this.pars.size
          const params = {
            from: from,
            size: this.pars.size,
            itemNumber: this.pars.itemNumber
          }
          // request
          const result = await getBeneficiaryList(params)
          if (result.code === 200) {
            this.data.list = result.data.list
            this.data.total = result.data.total
            this.init.listLoading = false
          }
        },
        handleSizeChange(val) {
          this.pars.size = val
          this.getList()
        },
        handleCurrentChange(val) {
          this.pars.page = val
          this.getList()
        },
        handleViewInfo(id) {
          this.$router.push({ name: 'info', query: { id: id, type: 1, p: 1 }})
        }
      },
      mounted() {
        this.getList()
      },
      created() {
        // load cache pars
        // if (this.$store.getters.listPagePars.has(this.$route.path)) {
        //   this.pars = this.$store.getters.listPagePars.get(this.$route.path)
        // }
        // load url params
        const itemNumber = this.$route.query.itemNumber
        if (itemNumber) {
          this.pars.itemNumber = itemNumber
        }
      }
    }
</script>

<style scoped>
  .block{
    float: right;
    margin-top: 15px;

  }
</style>
