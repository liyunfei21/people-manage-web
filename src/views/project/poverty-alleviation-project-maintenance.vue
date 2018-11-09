<template>
  <div>
    <el-row>
      <el-card class="box-card">
        <el-row>
          <div style="margin-left: 20%; height: 28px; line-height:28px">
            <div class="el-pagination">
              <span style="font-size: 100%">项目类型：</span>
              <ul class="el-pager" ref="typeRef">
                <li class="number" @click="clickAttr(0)" style="cursor:pointer">全部</li>
                <li class="number" @click="clickAttr(1)" style="cursor:pointer">教育（补助）培训</li>
                <li class="number" @click="clickAttr(2)" style="cursor:pointer">异地搬迁</li>
                <li class="number" @click="clickAttr(3)" style="cursor:pointer">金融扶贫</li>
                <li class="number" @click="clickAttr(4)" style="cursor:pointer">产业扶贫</li>
                <li class="number" @click="clickAttr(5)" style="cursor:pointer">基础设施</li>
              </ul>
            </div>
          </div>
        </el-row>
        <el-row>
          <div style="margin-left: 25%">
            <el-input
              placeholder="请输入内容"
              v-model="keyword" @keyup.enter.native="searchClick" style="width:30%">
              <i slot="prefix" class="el-input__icon el-icon-search input-with-select margin-bottom-20"></i>
            </el-input>
            <el-button type="primary" style="margin-left: 20px" @click="searchClick">搜索</el-button>
          </div>
        </el-row>
      </el-card>
    </el-row>
    <el-row>
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>项目维护</span>
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
            prop="area"
            label="地点">
          </el-table-column>
          <el-table-column
            label="开始日期">
            <template slot-scope="scope">
              {{format(scope.row.startDate)}}
            </template>
          </el-table-column>
          <el-table-column
            label="结束日期">
            <template slot-scope="scope">
              {{format(scope.row.endDate)}}
            </template>
          </el-table-column>
          <el-table-column
            label="总投资">
            <template slot-scope="scope">
              {{scope.row.budgetTotal}}万元
            </template>
          </el-table-column>
          <el-table-column
            label="受益户">
            <template slot-scope="scope">
              <el-button @click="householdJump(scope.row)" type="text" size="small">
                {{scope.row.beneficiaryFamilyTotal}}户
              </el-button>
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
  </div>
</template>

<script>
  import util from '../../utils/table.js'
  import { get } from '../../api/project.js'

  export default {
    name: 'poverty-alleviation-project',
    data() {
      return {
        loading: true,
        total: 0,
        from: 0,
        size: 10,
        result: {
          data: {
            list: []
          }
        },
        keyword: '',
        measureId: ''
      }
    },
    methods: {
      householdJump(row) {
        this.$router.push({ name: 'project-beneficiary', query: { itemNumber: row.projectNumber }})
      },
      format(val) {
        return util.formatDate.format(new Date(val), 'yyyy-MM-dd')
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
      clickAttr(index) {
        let a = 0
        const b = this.typeAttr()
        if (b != null) {
          a = b
          this.$refs.typeRef.children[a].classList.remove('active')
          if (!this.$refs.typeRef.children[index].classList.contains('active')) {
            if (a !== index) {
              this.$refs.typeRef.children[index].classList.add('active')
            }
          } else {
            this.$refs.typeRef.children[index].classList.remove('active')
          }
        } else {
          this.$refs.typeRef.children[index].classList.add('active')
        }
        this.keyword = ''
        this.searchClick()
      },
      typeAttr() {
        for (let i = 0; i < this.$refs.typeRef.children.length; i++) {
          for (let j = 0; j < this.$refs.typeRef.children[i].classList.length; j++) {
            if (this.$refs.typeRef.children[i].classList[j] === 'active') {
              return i
            }
          }
        }
        return null
      },
      searchClick(index) {
        const i = this.typeAttr()
        if (i === 0 || i === null) {
          this.measureId = ''
        } else if (i === 1) {
          this.measureId = 277
        } else if (i === 2) {
          this.measureId = 278
        } else if (i === 3) {
          this.measureId = 279
        } else if (i === 4) {
          this.measureId = 280
        } else if (i === 5) {
          this.measureId = 281
        }
        this.init()
      },
      async init() {
        const request = {
          from: this.from,
          keyword: this.keyword,
          measureId: this.measureId,
          size: this.size
        }
        const result = await get(request)
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
