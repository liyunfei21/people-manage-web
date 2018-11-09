<template xmlns:v-bind="http://www.w3.org/1999/xhtml" xmlns:v-on="http://www.w3.org/1999/xhtml">
  <div class="app-container" style="overflow:hidden;">
    <el-row :gutter="20">
      <div>
        <el-form class="condition" label-position="right" label-width="200px" @submit.native.prevent >
          <el-row :gutter="24" style="margin-bottom: 22px">
                <el-col :span="8" :offset="7" >
                  <col-row :span="24">
                     <el-col :span="18">
                        <el-input  v-model="pars.keywords" placeholder="请输入贫困户姓名或证件号码" @keyup.enter.native="handlerClickSearch"   >
                        </el-input>
                     </el-col>
                    <el-col :span="6">
                      <el-button   style="background:#727cf5;color:white;" @click="handlerClickSearch">搜索</el-button>
                    </el-col>
                  </col-row>
                </el-col>
                  <el-button type="primary" @click="exportExcel" :loading="downloadLoading" style="position:absolute;right:20px;">导出</el-button>
          </el-row>
          <el-row>
            <el-collapse accordion>
              <el-collapse-item>
                <template slot="title">
                  显示更多筛选条件 <i class="header-icon el-icon-info"></i>
                </template>

                <el-row :gutter="20" style="padding-right: 10%;margin-left: 20px">
                  <el-form-item label="年份：">
                    <div class="el-pagination">
                      <button type="button" class="btn-prev" ref="ref_direction_left" @click="handleMove('left')"><i
                        class="el-icon el-icon-arrow-left"></i>
                      </button>
                      <div class="el-pager">
                        <span type="text" :class="{active:index === activeYearIndex}"
                                   :id="year.id" :key="index"
                                   v-for="(year , index) in yearList" @click="handlerClickYear(index)">{{year.name}}
                        </span>
                      </div>
                      <button type="button" class="btn-next" ref="ref_direction_right" @click="handleMove('right')" disabled><i
                        class="el-icon el-icon-arrow-right"></i>
                      </button>
                    </div>
                  </el-form-item>
                  <el-form-item label="所在镇/街：">
                    <span type="text" v-for="(town,index) in townList" :key="index" v-bind:id="town.areaId" v-model="pars.townId"
                               :class="{active:town.areaId === pars.townId}" @click="handlerClickTown(town.areaId)">{{town.areaName}}
                    </span>
                  </el-form-item>
                  <el-form-item label="所在村：" v-if="villageList.length !== 0">
                    <span type="text" v-for="(village,index) in villageList" :key="index" v-bind:id="village.areaId"
                               :class="{active:village.areaId === pars.villageId}" @click="handlerClickVillage(village.areaId)">
                      {{village.areaName}}
                    </span>
                  </el-form-item>
                  <el-form-item label="脱贫状态：">
                    <span type="text" v-for="(outPovertyProperty,index) in outPovertyPropertyList" :key="index"
                               v-bind:id="outPovertyProperty.id" :class="{active:outPovertyProperty.id === pars.outPovertyPropertyId}"  @click="handlerClickOutPovertyProperty(outPovertyProperty.id)" >{{outPovertyProperty.name}}
                    </span>
                  </el-form-item>
                  <el-form-item label="人群属性：">
                    <span type="text" v-for="(peopleProperty,index) in peoplePropertyList" :key="index"
                               v-bind:id="peopleProperty.id" :class="{active:peopleProperty.id === pars.peoplePropertyId}"  @click="handlerClickPeopleProperty(peopleProperty.id)" >
                      {{peopleProperty.name}}
                    </span>
                  </el-form-item>
                  <el-form-item label="主要致贫原因：">
                    <span type="text" v-for="(primaryReason,index) in primaryReasonList" :key="index"
                               v-bind:id="primaryReason.id" :class="{active:primaryReason.id === pars.primaryReasonId}"  @click="handlerClickPrimaryReason(primaryReason.id)" >
                      {{primaryReason.name}}
                    </span>
                  </el-form-item>
                </el-row>
              </el-collapse-item>
            </el-collapse>
          </el-row>
          <el-card>
            <el-row>
              <el-form-item label="政策享受：" >
                <span type="text" v-for="(policy,index) in policyList" :key="index" v-bind:id="policy.id"
                           :class="{active:policy.id === pars.policyId}"  @click="handlerClickPolicy(policy.id)" >
                  {{policy.name}}
                </span>
              </el-form-item>
              <el-form-item label="财务情况：">
                <span type="text" v-for="(finance,index) in financeList" :key="index" v-bind:id="finance.id"
                           :class="{active:finance.id === pars.financeId}"  @click="handlerClickFinance(finance.id)" >
                  {{finance.name}}
                </span>
              </el-form-item>
            </el-row>
          </el-card>
        </el-form>
      </div>

    </el-row>
    <el-row class="item">


      <div class="data-card" v-loading.body="listLoading" element-loading-text="拼命加载中">
        <el-row v-if="list.length == 0">
          <el-col align="center">
            <p style="margin-top: 20px;color: #909399;">暂无数据</p>
          </el-col>
        </el-row>
        <el-row v-else :span="24" :gutter="20">
          <el-col :span="8" v-for="(item,index) in list" :key="index" class="item">
            <el-card class="box-card" shadow="hover">
              <div>
                <el-row >
                  <el-col :span="18"><!--<img :src="item.avatar" class="item-img" @click="handlerViewInfo(item)"/>-->
                    <el-row :span="24">
                    <div v-on:click="handlerViewInfo(item)" style="float:left;">
                      <Avatar :rounded="false" backgroundColor="#dae0fa" color="#727cf5" style="height:80px;width:80px;"
                              :username="item.holder_name"></Avatar>
                    </div>
                        <h2 style="margin: 18px  0px 0px 20px;font-size:18px;">&nbsp;&nbsp;{{item.holder_name}}</h2>
                        <el-button  style="background:rgb(238,117,47);opacity: 0.8;color: #FFF;cursor:auto;margin-left:6px; font-size:10px;" round size="mini" plain>
                          {{item.familyOutPoorState.substr(0,3)}}
                        </el-button>
                        <span v-if="item.familyOutPoorState.length>4" style="color:rgb(238,117,47);font-size:13px;line-height:28px;">{{item.familyOutPoorState.substr(3,item.familyOutPoorState.length)}}</span>
                    </el-row>
                  </el-col>
                  <el-col :span="6">
                    <p>
                  <span style="color:red;font-size: 30px;">
                    {{item.score}} 分
                  </span>
                      <i style="font-size: small;position: absolute;top: 0;padding-left: 5px;cursor: pointer" class="el-icon-question"
                         @click="showScoreInfo"></i>
                    </p>
                  </el-col>
                </el-row>

                <el-row class="info-text" :gutter="20">
                  <el-col :span="12">
                    <label>户编号：</label><span>{{item.holder_number}}</span>
                  </el-col>
                  <el-col :span="12">
                    <label>该户人数：</label><span>{{item.member_number}}</span>
                  </el-col>
                </el-row>
                <el-row :gutter="20" class="info-text">
                  <el-col :span="12">
                    <label>联系电话：</label><span>{{item.telephone}}</span>
                  </el-col>
                  <el-col :span="12">
                    <label>家庭地址：</label><span>{{item.address}}</span>
                  </el-col>
                </el-row>

                <el-row class="info-text" :gutter="20">
                  <el-col :span="12">
                    <label>主要致贫原因：</label><span>{{item.primary_reason}}</span>
                  </el-col>
                  <el-col :span="12">
                    <label>次要致贫原因：</label><span>{{item.second_reason}}</span>
                  </el-col>
                </el-row>
                <el-row class="info-text" :gutter="20">
                  <el-col :span="12"><label>属性：</label><span>{{item.property}}</span></el-col>
                  <el-col :span="12"><label>是否危房：</label><span>{{item.dangerous_building}}</span></el-col>
                </el-row>

                <el-row class="info-text" :gutter="20">
                  <el-col :span="24">
                    <label>财务情况：</label>
                    <span>
                    <img :src="item.caiwu.chechan" title="车产"/>
                    <img :src="item.caiwu.fangchan" title="商品房"/>
                    <img :src="item.caiwu.qiyefaren" title="企业商铺"/>
                    <img :src="item.caiwu.gongyang" title="财政供养"/>
                </span>
                  </el-col>
                </el-row>
                <el-row :gutter="20" class="info-text">
                  <el-col :span="24">
                    <label>帮扶政策：</label>
                    <span>
                    <img :src="item.butie.yiliao" title="医疗补贴"/>
                    <img :src="item.butie.baoxian" title="保险补贴"/>
                    <img :src="item.butie.weifang" title="危房改造"/>
                    <img :src="item.butie.jiaoyu" title="教育补贴"/>
                  </span>
                  </el-col>
                </el-row>

              </div>
            </el-card>
          </el-col>

          <el-col :span="24">
            <!--工具条-->
            <el-pagination layout="total, sizes, prev, pager, next, jumper"
                           ref="pagination"
                           background
                           @size-change="handleSizeChange"
                           :page-size="pars.size"
                           @current-change="handleCurrentChange"
                           :current-page="pars.page"
                           :total="total"
                           :page-sizes="[6,12,18]"
                           style="float:right;">
            </el-pagination>
          </el-col>

          <el-dialog
            :visible.sync="dialogVisible"
            width="45%" class="score-info">
            <h2><i class="el-icon-info" style="color: deepskyblue;"></i> 什么是贫困户评分？</h2>
            <div>贫困户评分是精准扶贫业务管理系统对丰富的贫困户信息数据的综合处理和评估，主要包含了贫困户的危房程度、主要致贫原因、年人均收入、在校子女教育情况、家庭成员健康状况五个维度。评分越高，代表贫困程度越大。</div>
            <h2><i class="el-icon-info" style="color: deepskyblue;"></i> 贫困户评分依据是什么？</h2>
            <div>贫困户评分基于国扶办数据，涵盖了贫困户的危房程度、主要致贫原因、年人均收入、在校子女教育情况、家庭成员健康状况等等。</div>
            <h2><i class="el-icon-info" style="color: deepskyblue;"></i> 贫困户评分如何指导工作？</h2>
            <div>
              <h4>* 量化贫困深度</h4>
              <p>通过贫困评分模型得到贫困得分，可以反映一个贫困户的贫困深度，得分越高，该户越贫困，扶贫办工作人员可进行重点帮扶，达到精准扶贫的目的。通过评分结果，可以查看**地区的贫困户的分布情况和特点，便于政府领导掌握渝北区贫困户的总体贫困状态。* 总体得分分布情况* 量化贫困深度</p>
              <h4> * 对比分析</h4>
              <p>通过历年得分数据：从个体出发，说明该贫困户的脱贫成效与贫困户贫困状态变化情况；从总体出发，观察贫困户总体的变化情况和脱贫扶持力度。</p>
              <h4> * 贫困预警</h4>
              <p>在一定程度上，可以起到贫困预警的作用。</p>
            </div>
            <div style="text-align: center">
              <el-button type="text" @click="dialogVisible = false">我知道了</el-button>
            </div>
          </el-dialog>
        </el-row>
      </div>

    </el-row>
  </div>
</template>

<script>
  import { getDictByType, getAreaDictByType } from '../../../api/dict'
  import { family_basic_info_list } from '../../../api/family_basic'
  import { export_json_to_excel } from '../../../vendor/Export2Excel'
  import Avatar from 'vue-avatar'

  export default {
    name: 'poverty-people-manage',
    components: {
      Avatar
    },
    data() {
      return {
        areaId: 501006000000,
        activeYearIndex: 5,

        yearList: [],
        townList: [],
        villageList: [],
        outPovertyPropertyList: [],
        peoplePropertyList: [],
        primaryReasonList: [],
        policyList: [],
        financeList: [],

        dialogVisible: false,
        listLoading: true,
        downloadLoading: false,
        pars: {// 核心的，列表页面的统一参数，建议整个系统内部的列表页都统一这种格式
          size: 6,
          page: 1,
          keywords: '',
          yearId: 283,
          townId: 0,
          villageId: 0,
          outPovertyPropertyId: 0,
          peoplePropertyId: 0,
          primaryReasonId: 0,
          policyId: 0,
          financeId: 0
        },
        total: 0,
        list: []
      }
    },
    methods: {
      async initConditionData() {
        const years = await getDictByType('year')
        if (years.code === 200) {
          this.yearList = years.data
        }
        const towns = await getAreaDictByType('town', this.areaId)
        if (towns.code === 200) {
          this.townList = towns.data
        }
        if (this.pars.townId) {
          const village = await getAreaDictByType('village', this.pars.townId)
          village.code === 200 ? this.villageList = village.data : null
        }
        const out_poverty_state = await getDictByType('out_poverty_state')
        out_poverty_state.code === 200 ? this.outPovertyPropertyList = out_poverty_state.data : null

        const poor_family_property = await getDictByType('poor_family_property')
        poor_family_property.code === 200 ? this.peoplePropertyList = poor_family_property.data : null

        const main_poor_causes = await getDictByType('main_poor_causes')
        main_poor_causes.code === 200 ? this.primaryReasonList = main_poor_causes.data : null

        const policy_type = await getDictByType('help_policy')
        policy_type.code === 200 ? this.policyList = policy_type.data : null
        const external_buy_car = await getDictByType('financia_situation')
        external_buy_car.code === 200 ? this.financeList = external_buy_car.data : null
      },
      handleMove(direction) {
        if (direction === 'left') {
          this.$refs.ref_direction_right.removeAttribute('disabled')
          if (this.activeYearIndex === 0) this.$refs.ref_direction_left.setAttribute('disabled', 'disabled')
          else this.activeYearIndex = this.activeYearIndex - 1
        } else {
          this.$refs.ref_direction_left.removeAttribute('disabled')
          if (this.activeYearIndex === (this.yearList.length - 1)) this.$refs.ref_direction_right.setAttribute('disabled', 'disabled')
          else this.activeYearIndex = this.activeYearIndex + 1
        }
        this.pars.yearId = this.yearList[this.activeYearIndex].id
        this.search()
      },
      handlerClickYear: function(index) {
        this.activeYearIndex = index
        this.pars.yearId = this.yearList[index].id
        this.$refs.ref_direction_right.removeAttribute('disabled')
        this.$refs.ref_direction_left.removeAttribute('disabled')
        if (this.activeYearIndex === 0) this.$refs.ref_direction_left.setAttribute('disabled', 'disabled')
        if (this.activeYearIndex === (this.yearList.length - 1)) this.$refs.ref_direction_right.setAttribute('disabled', 'disabled')
        this.search()
      },
      handlerClickTown: function(id) {
        this.pars.villageId = null
        if (this.pars.townId === id) {
          this.pars.townId = null
          this.villageList = []
        } else {
          this.pars.townId = id
          this.loadVillage(id)
        }
        this.search()
      },
      async loadVillage(areaId) {
        const village = await getAreaDictByType('village', areaId)
        village.code === 200 ? this.villageList = village.data : null
      },
      handlerClickVillage: function(areaId) {
        this.pars.villageId = this.pars.villageId === areaId ? null : areaId
        this.search()
      },
      handlerClickOutPovertyProperty(id) {
        this.pars.outPovertyPropertyId = this.pars.outPovertyPropertyId === id ? null : id
        this.search()
      },
      handlerClickPeopleProperty(id) {
        this.pars.peoplePropertyId = this.pars.peoplePropertyId === id ? null : id
        this.search()
      },
      handlerClickPrimaryReason(id) {
        this.pars.primaryReasonId = this.pars.primaryReasonId === id ? null : id
        this.search()
      },
      handlerClickPolicy(id) {
        this.pars.policyId = this.pars.policyId === id ? null : id
        this.search()
      },
      handlerClickFinance(id) {
        this.pars.financeId = this.pars.financeId === id ? null : id
        this.search()
      },
      handlerClickSearch() {
        this.search()
      },
      search() {
        this.pars.page = 1
        this.loadFamilyBasicInfoData()
      },
      exportExcel: async function() {
        this.downloadLoading = true
        let list = []
        for (let from = 0; from < this.total; from = from + 200) {
          const params = {
            from: from,
            size: 200,
            keywords: this.pars.keywords,
            yearId: this.pars.yearId,
            townId: this.pars.townId,
            villageId: this.pars.villageId,
            outPovertyStateId: this.pars.outPovertyPropertyId,
            poorFamilyPropertyId: this.pars.peoplePropertyId,
            mainPoorCausesId: this.pars.primaryReasonId,
            policyId: this.pars.policyId,
            financeId: this.pars.financeId
          }
          const result = await family_basic_info_list(params)
          if (result.code === 200) {
            list = list.concat(result.data.list)
          }
        }
        const tHeader = ['户编号', '户主', '住址', '脱贫状态', '贫困户属性', '银行', '银行卡号']
        const filterVal = ['householdNumber', 'householderName', 'homeAddress', 'familyOutPoorState', 'poorHouseholdProperty', 'bank', 'bankCardNumber']
        const data = this.formatJson(filterVal, list)
        export_json_to_excel({
          header: tHeader,
          data,
          filename: '贫困户人群'
        })
        this.downloadLoading = false
      },
      formatJson(filterVal, jsonData) {
        return jsonData.map(v => filterVal.map(j => v[j]))
      },
      async loadFamilyBasicInfoData() {
        this.listLoading = true
        this.$store.dispatch('saveListPagePars', { path: this.$route.path, pars: this.pars })
        const from = (this.pars.page - 1) * this.pars.size

        const params = {
          from: from,
          size: this.pars.size,
          keywords: this.pars.keywords,
          yearId: this.pars.yearId,
          townId: this.pars.townId,
          villageId: this.pars.villageId,
          outPovertyStateId: this.pars.outPovertyPropertyId,
          poorFamilyPropertyId: this.pars.peoplePropertyId,
          mainPoorCausesId: this.pars.primaryReasonId,
          policyId: this.pars.policyId,
          financeId: this.pars.financeId
        }

        try {
          const family_info_result = await family_basic_info_list(params)

          const result = extractData(family_info_result)
          if (result.code === 200) {
            this.list = result.data.list
            this.total = result.data.total
          }
        } catch (e) {
          this.list = []
        } finally {
          this.listLoading = false
        }
      },
      handleSizeChange(val) {
        this.pars.size = val
        this.loadFamilyBasicInfoData()
      },
      handleCurrentChange(val) {
        this.pars.page = val
        this.loadFamilyBasicInfoData()
      },
      handlerViewInfo(item) {
        if (item.id >= 0) {
          this.$router.push({ name: 'infoRefresh', query: { id: item.id }})
        }
      },
      showScoreInfo() {
        this.dialogVisible = true
      }
    },
    created() {
      // if (this.$store.getters.listPagePars.has(this.$route.path)) {
      //   this.pars = this.$store.getters.listPagePars.get(this.$route.path)
      // }
      this.initConditionData()
      this.loadFamilyBasicInfoData()
    }
  }

  export function extractData(result) {
    if (result.code !== 200) {
      return result
    }
    const target_list = []
    const source_list = result.data.list
    source_list.forEach(o => {
      const info = {
        butie: {},
        caiwu: {}
      }
      info.id = o.familyYearStateId
      info.holder_name = o.householderName
      info.telephone = o.phoneNumber
      info.property = o.poorHouseholdProperty
      info.address = o.homeAddress
      info.score = o.score
      info.holder_number = o.householdNumber
      info.member_number = o.familyPopulationNum
      info.primary_reason = o.mainCauseOfPoverty
      if (o.secondaryCausesOfPoverty !== null) {
        info.second_reason = o.secondaryCausesOfPoverty.join(' ,')
      }
      info.dangerous_building = o.whetherDangerousHouse
      info.familyOutPoorState = o.familyOutPoorState
      info.avatar = o.avatar
      const caiwu_image_url = {
        has_chechan: 'static/img/people/cyp_chengchan.png',
        no_has_chechan: 'static/img/people/cyp_chengchan_false.png',
        has_fangchan: 'static/img/people/cyp_fangchan.png',
        no_has_fangchan: 'static/img/people/cyp_fangchan_1.png',
        has_qiyefaren: 'static/img/people/cyp_qiyefaren.png',
        no_has_qiyefaren: 'static/img/people/cyp_qiyefaren_1.png',
        has_caizhenggongyang: 'static/img/people/cyp_caizhenggongyang.png',
        no_has_caizhenggongyang: 'static/img/people/cyp_czgy_false.png'
      }

      info.caiwu.chechan = caiwu_image_url.no_has_chechan
      info.caiwu.fangchan = caiwu_image_url.no_has_fangchan
      info.caiwu.qiyefaren = caiwu_image_url.no_has_qiyefaren
      info.caiwu.gongyang = caiwu_image_url.no_has_caizhenggongyang

      if (o.financialSituation) {
        if (o.financialSituation[292]) {
          info.caiwu.chechan = caiwu_image_url.has_chechan
        }
        if (o.financialSituation[293]) {
          info.caiwu.fangchan = caiwu_image_url.has_fangchan
        }
        if (o.financialSituation[294]) {
          info.caiwu.qiyefaren = caiwu_image_url.has_qiyefaren
        }
        if (o.financialSituation[295]) {
          info.caiwu.gongyang = caiwu_image_url.has_caizhenggongyang
        }
      }
      const butie_image_url = {
        has_bao_xian: 'static/img/people/cyp_baoxianbutie.png',
        no_has_bao_xian: 'static/img/people/cyp_baoxianbutie_1.png',
        has_jiao_yu: 'static/img/people/cyp_jiaoyubutie.png',
        no_has_jiao_yu: 'static/img/people/cyp_jiaoyubutie_1.png',
        has_yiliao: 'static/img/people/cyp_yiliaobutie.png',
        no_has_yiliao: 'static/img/people/cyp_yiliaobutie_1.png',
        has_wei_fang: 'static/img/people/cyp_weifanggaizao.png',
        np_has_wei_fang: 'static/img/people/cyp_weifanggaizao_1.png'
      }
      info.butie.jiaoyu = butie_image_url.no_has_jiao_yu
      info.butie.yiliao = butie_image_url.no_has_yiliao
      info.butie.baoxian = butie_image_url.no_has_bao_xian
      info.butie.weifang = butie_image_url.np_has_wei_fang

      if (o.helpPolicy) {
        if (o.helpPolicy[288]) {
          info.butie.jiaoyu = butie_image_url.has_jiao_yu
        }
        if (o.helpPolicy[289]) {
          info.butie.yiliao = butie_image_url.has_yiliao
        }
        if (o.helpPolicy[290]) {
          info.butie.baoxian = butie_image_url.has_bao_xian
        }
        if (o.helpPolicy[291]) {
          info.butie.weifang = butie_image_url.has_wei_fang
        }
      }
      target_list.push(info)
    })
    result.data.list = target_list
    return result
  }
</script>

<style scoped lang="scss">

  .active {
    color: red;
  }
  .active :hover{
    color: purple;
  }
  .condition {
    span{
      padding-left: 5px;
      cursor:pointer;
    }
    span:hover {
      color: purple;
    }

  label {
        text-align: right;
        float: left;
        font-size: 14px;
        color: #606266;
        line-height: 40px;
        padding: 0 12px 0 0;
        -webkit-box-sizing: border-box;
        box-sizing: border-box;
      }
  }
  .item {
    margin-top: 15px;
    margin-bottom: 16px;
  }


  .info-text {
    margin-top: 15px;
    margin-bottom: 15px;
  &:last-child {
     margin-bottom: 0;
   }
    font-size: 12px;
    img {
      width: 24px;
      height: 24px;
    }
    label {
      font-weight: bolder;
    }
  }

  .box-card {
    width: 100%;
    height: 400px;
    .vue-avatar--wrapper :hover {
      cursor:pointer;
      color: #eb9011;
      font-size: 30px;
    }
  }

  .score-info {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.3);
    letter-spacing: 0.5px;
    line-height: 24px;
    opacity: 0.9;
  h2 {
    padding: 0px 10px 0px 50px;
    margin-bottom: 20px;
    margin-top: 15px;
  }
  div {
    padding: 0px 10px 0px 50px;
  }
  }
  .el-input__inner{
    background:rgb(255,251,240);
  }
</style>
<style lang="scss">
  @import '../../../styles/basic-info-card';
</style>
