<template>
  <div>
    <el-row>
      <el-col>
        <el-button icon="el-icon-back" type="primary" @click="handleReturn">返回</el-button>
      </el-col>
    </el-row>
    <el-row>
      <el-col>
        <h3 class="margin-bottom-20">结对信息</h3>

        <el-table :data="helpedPersons" highlight-current-row style="width: 100%;" element-loading-text="拼命加载中"
                  v-loading.body="listLoading" border fit highlight-current-row class="margin-bottom-20">
          <!--<el-table-column type="selection" width="55">-->
          <!--</el-table-column>-->
          <el-table-column type="index" width="60" label="序号"/>
          <el-table-column prop="helpedPersonName" label="被帮扶人姓名"/>
          <el-table-column prop="mainPoorCause" label="主要致贫原因"/>
          <el-table-column prop="poorFamilyPopulationNum" label="贫困户人口规模"/>
          <el-table-column prop="poorFamilyProperty" label="贫困户属性"/>
          <el-table-column prop="town" label="镇"/>
          <el-table-column prop="village" label="村"/>
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
  import { getHelpedPersons } from '@/api/help_person'

  export default {
    name: 'helped-person',
    data() {
      return {
        helpPersonId: -1,
        listLoading: true,
        helpedPersons: [],
        total: 0,
        from: 0,
        size: 10
      }
    },
    methods: {
      async getHelpedPersonList() {
        this.listLoading = false
        const params = {
          requestId: '',
          helpPersonId: this.helpPersonId,
          from: this.from,
          size: this.size
        }
        const result = await getHelpedPersons(params)
        if (result.code === 200) {
          this.helpedPersons = result.data.list
          this.total = result.data.total
        }
      },
      handleSizeChange(val) {
        this.size = val
        this.getHelpedPersonList()
      },
      handleCurrentChange(val) {
        const page = val
        this.from = (page - 1) * this.size
        this.getHelpedPersonList()
      },
      handleReturn() {
        // this.$router.push({ name: 'helpPerson' })
        this.$router.back()
      }
    },
    created() {
      this.helpPersonId = this.$route.query.id
    },
    mounted() {
      this.getHelpedPersonList()
    }
  }
</script>

<style scoped>
  .block {
    float: right;
    margin-top: 15px;

  }

  .margin-bottom-20 {
    margin-top: 20px;
  }
</style>
