<template>
  <div>
    <el-row>
      <div style="margin-left: 20%">
        <el-input
          placeholder="请输入内容"
          v-model="keyword" @keyup.enter.native="searchClick" style="width:30%">
          <i slot="prefix" class="el-input__icon el-icon-search input-with-select margin-bottom-20"></i>
        </el-input>
        <el-button type="primary" style="margin-left: 20px" @click="searchClick">搜索</el-button>
        <el-button style="float: right" type="primary" icon="el-icon-upload2" @click="exportExcel" :loading="downloadLoading">数据导出</el-button>
      </div>
    </el-row>
    <el-row>
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>项目资金进度</span>
        </div>
      <el-table
        v-loading="loading"
        :data="result.data.list"
        style="width: 100%">
        <el-table-column
          type="index"
          label="序号">
        </el-table-column>
        <el-table-column
          prop="projectName"
          label="项目名称">
        </el-table-column>
        <el-table-column
          prop="projectNumber"
          label="项目编号">
        </el-table-column>
        <el-table-column
          prop="measure"
          label="项目类型">
        </el-table-column>
        <el-table-column
          prop="childMeasure"
          label="项目子类型">
        </el-table-column>
        <el-table-column
          prop="year"
          label="年份">
        </el-table-column>
        <el-table-column
          prop="area"
          label="地区">
        </el-table-column>
        <el-table-column
          prop="budgetTotal"
          label="总投资（万）">
        </el-table-column>
        <el-table-column
          prop="investedFund"
          label="已投入资金（万）">
        </el-table-column>
        <el-table-column
          prop="appropriatedFund"
          label="已拨付资金（万）">
        </el-table-column>
        <el-table-column
          label="操作">
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="clickDialogFormVisibleModify(scope.row)">编辑</el-button>
          </template>
        </el-table-column>
      </el-table>
      </el-card>
    </el-row>
    <el-row>
      <div class="block block2">
        <el-pagination
          background
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total">
        </el-pagination>
      </div>
    </el-row>
    <el-dialog title="编辑" :visible.sync="dialogFormVisibleModify">
      <el-form :model="formModify">
        <el-form-item label="已投入资金（万）：" :label-width="formLabelWidthModify">
          <el-input v-model="formModify.investedFund" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="已拨付资金（万）：" :label-width="formLabelWidthModify">
          <el-input v-model="formModify.appropriatedFund" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisibleModify = false">取 消</el-button>
        <el-button type="primary" @click="dialogFormVisibleModifyCommit">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import { getProgress, modifyProgress } from '../../api/project.js'
  export default {
    name: 'project-funding-progress',
    data() {
      return {
        loading: true,
        formModify: {
          id: '',
          projectNumber: '',
          investedFund: '',
          appropriatedFund: '',
          budgetTotal: ''
        },
        formLabelWidthModify: '150px',
        dialogFormVisibleModify: false,
        downloadLoading: false,
        filename: '项目资金进度',
        total: 0,
        from: 0,
        size: 10,
        keyword: '',
        result: {
          data: {
            list: [{
              projectName: ''
            }]
          }
        }
      }
    },
    methods: {
      clickDialogFormVisibleModify(row) {
        this.formModify.id = row.id
        this.formModify.projectNumber = row.projectNumber
        this.formModify.investedFund = row.investedFund
        this.formModify.appropriatedFund = row.appropriatedFund
        this.formModify.budgetTotal = row.budgetTotal
        this.dialogFormVisibleModify = true
      },
      dialogFormVisibleModifyCommit() {
        const messages = ['提交成功!',
          '您输入的数据有误，请重新输入！（提示：总投资额>=已投入资金>=已拨付资金）',
          '您输入的数据有误，请重新输入！（提示：总投资额>=已投入资金）',
          '您输入的数据有误，请重新输入！（提示：已投入资金>=已拨付资金）'
        ]
        this.formModify.investedFund = this.formModify.investedFund.trim()
        this.formModify.appropriatedFund = this.formModify.appropriatedFund.trim()
        if ((this.formModify.appropriatedFund.length > 0) && (this.formModify.investedFund.length > 0) && (this.formModify.appropriatedFund >= 0) && (this.formModify.investedFund >= 0)) {
          if ((this.formModify.budgetTotal * 100 >= this.formModify.investedFund * 100) && (this.formModify.investedFund * 100 >= this.formModify.appropriatedFund * 100)) {
            modifyProgress(this.formModify).then(res => {
              this.$message({
                message: messages[0],
                type: 'success'
              })
              this.init()
            })
            this.dialogFormVisibleModify = false
          } else {
            var tmpFlag = 1
            if ((this.formModify.budgetTotal * 100 < this.formModify.investedFund * 100)) {
              tmpFlag = 2
            } else {
              tmpFlag = 3
            }
            this.$message({
              message: messages[tmpFlag],
              type: 'warning'
            })
            this.init()
          }
        } else {
          this.$message({
            message: messages[1],
            type: 'error'
          })
          this.init()
        }
      },
      exportExcel() {
        import('../../vendor/Export2Excel').then(excel => {
          const tHeader = ['项目名称', '项目编号', '项目类型', '项目子类型', '年份', '地区', '总投资（万）', '已投入资金（万）', '已拨付资金（万']
          const filterVal = ['projectName', 'projectNumber', 'measure', 'childMeasure', 'area', 'area', 'budgetTotal', 'investedFund', 'appropriatedFund']
          const list = this.result.data.list
          const data = this.formatJson(filterVal, list)
          excel.export_json_to_excel({
            header: tHeader,
            data,
            filename: this.filename
          })
          this.downloadLoading = false
        })
      },
      formatJson(filterVal, jsonData) {
        return jsonData.map(v => filterVal.map(j => v[j]))
      },
      handleSizeChange(val) {
        this.size = val
        this.init()
      },
      handleCurrentChange(val) {
        const page = val
        this.from = (page - 1) * this.size
        this.init()
      },
      searchClick() {
        this.init()
      },
      async init() {
        const request = {
          id: '',
          from: this.from,
          size: this.size,
          keyword: this.keyword

        }
        const result = await getProgress(request)
        if (result.code === 200) {
          this.result = result
          this.total = result.data.total
        }
        this.loading = false
      }

    },
    created() {
      this.init()
    }
  }
</script>

<style scoped>
  @import '../../styles/info-and-policy-g.css';

</style>
