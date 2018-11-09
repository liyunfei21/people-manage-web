<template>
  <div>
    <el-button type="primary" class=" el-icon-back return" @click="handleClickReturn"> 返回</el-button>
    <el-row v-loading="loading">
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <h3>政策信息</h3>
          <h3 style="text-align: center;margin-bottom: 3%">{{result.title}}</h3>
          <span style="margin-left: 30%;font-size: 90%">发布日期：{{result.releaseTime}}</span>
          <span style="margin-left: 3%;font-size: 90%">来源：{{result.unit}}</span>
        </div>
        <div>
          <p style="text-indent:2em; margin:0px;line-height: 200%;padding: 0 5% 5% 5%;">{{result.content}}</p>
          <p style="line-height: 200%;padding: 0 5% 0 8%;">{{result.unit}}</p>
          <p style="line-height: 200%;padding: 0 5% 0 8%;">{{result.releaseTime}}</p>
        </div>
      </el-card>
    </el-row>
  </div>
</template>

<script>
  import { getInfo } from '../../api/policys.js'

  export default {
    name: 'poverty-alleviation-policy',
    data() {
      return {
        loading: true,
        policy: '',
        result: ''
      }
    },
    methods: {
      handleClickReturn() {
        this.$router.push({ name: 'PovertyAlleviationPolicy' })
      },
      async init(id) {
        const request = {
          id
        }
        const infos = await getInfo(request)
        if (infos.code === 200) {
          this.result = infos.data
          this.loading = false
        }
      }
    },
    created() {
      this.policy = this.$route.query.policy
      this.init(this.policy.id)
    }
  }
</script>

<style scoped>
  @import '../../styles/info-and-policy-g.css';
</style>
