<template>
  <div>
    <el-button type="primary" class=" el-icon-back return" @click="handleClickReturn"> 返回</el-button>
    <el-row>
      <el-card class="box-card">
        <h3>修改扶贫政策</h3>
        <el-col :span="6" class="grid-content"></el-col>
        <el-col :span="10" class="grid-content">
          <div class="margin-bottom-top-50">
            <el-form label-width="100px" :model="policy" :rules="policyRules" ref="policyRef">
              <el-form-item label="分类：" prop="typeId">
                <el-select v-model="policy.typeId" placeholder="请选择分类" class="width-100">
                  <el-option
                    v-for="item in classifications"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="标题：" prop="title">
                <el-input v-model="policy.title" class="width-100" placeholder="请输入拟定标题"></el-input>
              </el-form-item>
              <el-form-item label="来源：" prop="unit">
                <el-input v-model="policy.unit" class="width-100" placeholder="请输入文章来源"></el-input>
              </el-form-item>
              <el-form-item label="发布时间：" prop="releaseTime">
                <el-date-picker
                  class="width-100"
                  v-model="policy.releaseTime"
                  type="datetime"
                  placeholder="选择日期时间"
                  align="right">
                </el-date-picker>
              </el-form-item>
              <el-form-item label="正文：" prop="content">
                <el-input type="textarea" v-model="policy.content" class="width-100"
                          placeholder="请输入正文"></el-input>
              </el-form-item>
              <el-form-item label="摘要：" prop="summary">
                <el-input type="textarea" v-model="policy.summary" class="width-100"
                          placeholder="请输入摘要"></el-input>
              </el-form-item>
              <el-form-item label="关键词：" prop="label">
                <el-input v-model="policy.label" class="width-100" placeholder="请输入关键词"></el-input>
              </el-form-item>
              <el-form-item size="large">
                <el-button @click="handleClickReturn">取消</el-button>
                <el-button type="primary" @click="onSubmit(policy.id)">上传</el-button>
              </el-form-item>
            </el-form>
          </div>
        </el-col>
        <el-col :span="8" class="grid-content"></el-col>
      </el-card>
    </el-row>
  </div>
</template>

<script>
  import util from '../../utils/table.js'
  import { modify } from '../../api/policys.js'

  export default {
    name: 'poverty-alleviation-policy-create',
    data() {
      return {
        classifications: [{
          value: 257,
          label: '医疗'
        }, {
          value: 258,
          label: '精准脱贫保'
        }, {
          value: 259,
          label: '教育补助'
        }, {
          value: 260,
          label: '危房改造'
        }, {
          value: 261,
          label: '民政低保补助'
        }, {
          value: 262,
          label: '技能培训'
        }],
        policy: {
          id: '',
          typeId: '',
          title: '',
          unit: '',
          releaseTime: '',
          content: '',
          summary: '',
          label: ''
        },
        policyRules: {
          typeId: [
            { required: true, message: '请选择分类', trigger: 'change' }
          ],
          title: [
            { required: true, message: '请输入拟定标题', trigger: 'blur' }
          ],
          unit: [
            { required: true, message: '请输入文章来源', trigger: 'blur' }
          ],
          releaseTime: [
            { required: true, message: '请选择日期时间', trigger: 'change' }
          ],
          content: [
            { required: true, message: '请输入正文', trigger: 'blur' }
          ],
          summary: [
            { required: true, message: '请输入摘要', trigger: 'blur' }
          ],
          label: [
            { required: true, message: '请输入关键词', trigger: 'blur' }
          ]
        }
      }
    },
    methods: {
      handleClickReturn() {
        this.$router.push({ name: 'PovertyAlleviationPolicy' })
      },
      onSubmit(id) {
        this.$refs.policyRef.validate((valid) => {
          if (valid) {
            const para = Object.assign({}, this.policy)
            para.id = id
            para.releaseTime =
              !para.releaseTime || para.releaseTime === ''
                ? ''
                : util.formatDate.format(new Date(para.releaseTime), 'yyyy-MM-dd hh:mm:ss')
            modify(para).then(res => {
              this.$message({
                message: '提交成功',
                type: 'success'
              })
              this.$refs.policyRef.resetFields()
              this.$router.push({ name: 'PovertyAlleviationPolicy' })
            })
          } else {
            return false
          }
        })
      }
    },
    created() {
      this.policy = this.$route.query.policy
    }
  }

</script>

<style scoped>
  @import '../../styles/info-and-policy-g.css';

</style>
