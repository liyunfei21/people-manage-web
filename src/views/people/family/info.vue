<template>
  <div style="width: 100%;height: 100%;overflow: hidden">
    <div class="fixed" style="background:white;" >
      <el-button type="primary" class=" el-icon-back return" @click="handleClickReturn"> 返回</el-button>
      <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
          <el-submenu index="1" class="wide-20">
            <template slot="title">家庭基本信息</template>
            <el-menu-item index="1-1" @click="clickFamilyInfo(11)">家庭信息</el-menu-item>
            <el-menu-item index="1-1" @click="clickFamilyInfo(12)">家庭成员</el-menu-item>
            <el-menu-item index="1-1" @click="clickFamilyInfo(13)">家庭成员变更记录</el-menu-item>
          </el-submenu>
          <el-submenu index="2" class="wide-20">
            <template slot="title">生活、生产条件</template>
            <el-menu-item index="2-1" @click="clickFamilyInfo(21)">生产条件</el-menu-item>
            <el-menu-item index="2-1" @click="clickFamilyInfo(22)">生活条件</el-menu-item>
            <el-menu-item index="2-1" @click="clickFamilyInfo(23)">收入信息</el-menu-item>
          </el-submenu>
          <el-submenu index="3" class="wide-20">
            <template slot="title">扶贫信息</template>
            <el-menu-item index="3-1" @click="clickFamilyInfo(31)">帮扶人信息及变更记录</el-menu-item>
            <el-menu-item index="3-1" @click="clickFamilyInfo(32)">受益项目</el-menu-item>
          </el-submenu>
          <el-submenu index="4" class="wide-20">
            <template slot="title">财务审计</template>
            <el-menu-item index="4-1" @click="clickFamilyInfo(41)">购房信息</el-menu-item>
            <el-menu-item index="4-1" @click="clickFamilyInfo(42)">购车信息</el-menu-item>
            <el-menu-item index="4-1" @click="clickFamilyInfo(43)">企业入股信息</el-menu-item>
            <el-menu-item index="4-1" @click="clickFamilyInfo(44)">财政供给人员</el-menu-item>
          </el-submenu>
          <el-submenu index="5" class="wide-20">
            <template slot="title">优惠政策</template>
            <el-menu-item index="5-1">。。。。</el-menu-item>
          </el-submenu>
        </el-menu>
    </div>

  <div class="wrapper" ref="wrapper">
    <div v-loading="loading">
      <el-row>
        <el-card class="box-card" style="margin-top: 100px;">
          <el-row :gutter="20">
            <el-col :span="1.5">
              <Avatar :username="householderName"></Avatar>
            </el-col>
            <el-col :span="3" id="name1" class="span1">
              <h4>{{householderName}}</h4>
              <span>{{description}}</span><br/>
            </el-col>
            <el-col :span="5" class="span1" >
              <p><span class="item-title">用户编号：</span><span class="item-value">{{householdNumber}}</span><p/>
              <p><span class="item-title">联系电话：</span><span class="item-value">{{phoneNumber}}</span><p/>
              <p><span class="item-title">主要致贫原因：</span><span class="item-value">{{mainCauseOfPoverty}}</span></p>
              <p><span class="item-title">属性：</span><span class="item-value">{{poorHouseholdProperty}}</span></p>
            </el-col>
            <el-col :span="5" class="span1" >
              <p><span class="item-title">该户人数：</span><span class="item-value">{{familyPopulationNum}}</span></p>
              <p><span class="item-title">家庭地址：</span><span class="item-value">{{homeAddress}}</span></p>
              <p><span class="item-title">次要致贫原因：</span><span class="item-value" v-for="key in secondaryCausesOfPoverty">{{key+"、"}}</span> </p>
              <p><span class="item-title">是否危房：</span><span class="item-value">{{whetherDangerousHouse}}</span></p>
            </el-col>
            <el-col :span="6" class="span1" >
              <span style="height: 23px;display: block;width: 25%;float: left;line-height: 27px;">财务状况：</span>
              <span style="height: 23px;display: block;width: 75%;float: left;line-height: 23px;">
                <img class="imageAttr" :src="caiwu.chechan" title="车产"/>
                <img class="imageAttr" :src="caiwu.fangchan" title="商品房"/>
                <img class="imageAttr" :src="caiwu.qiyefaren" title="企业商铺"/>
                <img class="imageAttr" :src="caiwu.gongyang" title="财政供养"/>
              </span><br/>
              <span style="height: 23px;display: block;width: 25%;float: left;line-height: 27px;margin-top: 10px;font-weight:bold;">政策补贴：</span>
              <span style="height: 23px;display: block;width: 75%;float: left;line-height: 23px;margin-top: 10px;font-weight:bold;">
                <img class="imageAttr" :src="butie.yiliao" title="医疗补贴"/>
                <img class="imageAttr" :src="butie.baoxian" title="保险补贴"/>
                <img class="imageAttr" :src="butie.weifang" title="危房改造"/>
                <img class="imageAttr" :src="butie.jiaoyu" title="教育补贴"/>
              </span><br/>
            </el-col>
            <el-col :span="2">
              <div class="fraction"><span class="fraction2">{{fraction}}</span><span>分</span></div>
            </el-col>
          </el-row>
        </el-card>
      </el-row>
      <el-row>
        <el-card class="box-card scroll11" id="router-go-1" data-scroll-id="router-go-1" tabindex="-1">
          <div slot="header" class="clearfix">
            <span>家庭信息</span>
          </div>
          <div id="app-3" >
            <el-row :gutter="20" class="span_2">
              <el-col :span="7">
                <p><span class="item-title">户码：</span><span class="item-value">{{family_info_1}}</span></p>
                <p><span class="item-title">家庭地址：</span><span class="item-value">{{family_info_2}}</span></p>
                <p><span class="item-title">主要致贫原因：</span><span class="item-value">{{family_info_3}}</span></p>
                <p><span class="item-title">开户行：</span><span class="item-value">{{family_info_4}}</span></p>
              </el-col>
              <el-col :span="7">
                <p><span class="item-title">贫困户属性：</span><span class="item-value">{{family_info_5}}</span></p>
                <p><span class="item-title">其他致贫原因：</span>
                 <span v-for="f in family_info_6" class="item-value">
                      <i v-if="f === null"> - </i>
                     {{f}}
                  </span>

                </p>
                <p><span class="item-title">银行卡号：</span><span class="item-value">{{family_info_7}}</span></p>
              </el-col>
              <el-col :span="7">
                <p><span class="item-title">是否军烈属：</span><span class="item-value">{{family_info_8}}</span></p>
                <p><span class="item-title">返贫原因：</span><span class="item-value">{{family_info_9}}</span></p>
                <p><span class="item-title">联系电话：</span><span class="item-value">{{family_info_10}}</span></p>
              </el-col>
            </el-row>
          </div>
        </el-card>
      </el-row>
      <el-row>
        <el-card class="box-card scroll12">
          <div slot="header" class="clearfix">
            <span>家庭成员</span>
          </div>
          <el-collapse v-model="activeNames" @change="handleChange" v-for="member in familyMembers">
            <el-collapse-item>
              <template slot="title">
                <div class="div_member1">
                  <div class="member1">
                    <span>姓名：{{member.name}}</span>
                  </div>
                  <div class="member1">
                    <span>与户主关系：{{member.householdHeadRelation}}</span>
                  </div>
                  <div class="member1">
                    <span>性别：{{member.sex}}</span>
                  </div>
                </div>
              </template>
              <div>
                <el-row :gutter="20">
                  <el-col :span="5" class="span1">
                    <p><span class="item-title">证件类型：</span><span class="item-value">{{member.certificateType==-1?"身份证":"其他"}}</span></p>
                    <p><span class="item-title">政治面貌：</span><span class="item-value">{{member.politicalAppearance}}</span></p>
                    <p><span class="item-title">劳动技能：</span><span class="item-value">{{member.skill}}</span></p>
                    <p><span class="item-title">是否现役军人：</span><span class="item-value">{{member.whetherActiveSoldier}}</span></p>
                  </el-col>
                  <el-col :span="5" class="span1">
                    <p><span class="item-title">证件号码：</span><span class="item-value">{{member.certificateNumber}}</span></p>
                    <p><span class="item-title">年度：</span><span class="item-value">{{member.year}}</span></p>
                    <p><span class="item-title">务工情况：</span ><span class="item-value">{{member.businessCompanyName}}</span ></p>
                    <p><span class="item-title">是否参加大病保险：</span><span class="item-value">{{member.whetherMajorIllness}}</span></p>
                  </el-col>
                  <el-col :span="5" class="span1">
                    <p><span class="item-title">联系电话：</span><span class="item-value">{{member.householdHeadRelation=="户主"?family_info_10:member.phoneNumber}}</span></p>
                    <p><span class="item-title">文化程度：</span><span class="item-value">{{member.cultureDegree}}</span></p>
                    <p><span class="item-title">上年务工时间（月）：</span><span class="item-value">{{member.yearWorkedHours}}</span></p>
                    <p><span class="item-title">是否享受低保：</span><span class="item-value">{{member.whetherLowInsurance}}</span></p>
                  </el-col>
                  <el-col :span="5" class="span1">
                    <p><span class="item-title">出生日期：</span><span class="item-value">{{member.birthday}}</span></p>
                    <p><span class="item-title">在校情况：</span><span class="item-value">{{member.currentStudentSituation}}</span></p>
                    <p><span class="item-title">健康情况：</span><span class="item-value">{{member.healthSituation}}</span></p>
                  </el-col>
                </el-row>
              </div>
            </el-collapse-item>
          </el-collapse>
        </el-card>
      </el-row>
      <el-row>
        <el-card class="box-card scroll13">
          <div slot="header" class="clearfix">
            <span>家庭成员变更记录</span>
          </div>
          <el-table
            :data="familyMemberChangeLogs"
            style="width: 100%">
            <el-table-column
              type="index"
              label="序号">
            </el-table-column>
            <el-table-column
              prop="name"
              label="姓名">
            </el-table-column>
            <el-table-column
              label="证件类型">
              <template slot-scope="scope">
                身份证
              </template>
            </el-table-column>
            <el-table-column
              prop="certificateNumber"
              label="证件号码">
            </el-table-column>
            <el-table-column
              prop="increaseCause"
              label="增加原因">
            </el-table-column>
            <el-table-column
              prop="declineCause"
              label="减少原因">
            </el-table-column>
            <el-table-column
              prop="householdHeadRelation"
              label="与户主关系">
            </el-table-column>
          </el-table>
        </el-card>
      </el-row>
      <el-row>
        <el-card class="box-card scroll21">
          <div slot="header" class="clearfix">
            <span>生产条件</span>
          </div>
          <div id="app-4" class="span_2">
            <el-row :gutter="20" v-if="productionCondition">
              <el-col :span="7">
                <p><span class="item-title">耕地面积：</span><span class="item-value">{{cultivatedArea}} 亩</span></p>
                <p><span class="item-title">林地面积：</span><span class="item-value">{{forestArea}} 亩</span></p>
                <p><span class="item-title">林果面积：</span><span class="item-value">{{fruitArea}} 亩</span></p>
              </el-col>
              <el-col :span="7">
                <p><span class="item-title">有效浇灌面积：</span><span class="item-value">{{effectiveWateringArea}}  亩</span></p>
                <p><span class="item-title">退耕还林面积：</span><span class="item-value">{{returnFarmlandToForestArea}} 亩</span></p>
                <p><span class="item-title">是否加入农民专业合作社：</span><span class="item-value">{{whetherJoinCooperatives}}</span></p>
              </el-col>
              <el-col :span="7">
                <p><span class="item-title">牧草面积：</span><span class="item-value">{{pastureArea}} 亩</span ></p>
                <p><span class="item-title">水面面积：</span><span class="item-value">{{waterSurfaceArea}} 亩</span></p>
              </el-col>
            </el-row >
            <el-row :span="7" v-else style="text-align: center;color: #909399;font-size: 14px">
              暂无数据
            </el-row>
          </div>
        </el-card>
      </el-row>
      <el-row>
        <el-card class="box-card scroll22">
          <div slot="header" class="clearfix">
            <span>生活条件</span>
          </div>
          <div id="app-5" class="span_2">
            <el-row :gutter="20" v-if="JSON.stringify(this.lifeCondition) !== '{}' ">
              <el-col :span="7" >
                <p><span class="item-title">与村主干路距离：</span><span class="item-value">{{lifeCondition.villageMainRoadDistance}} 千米</span></p>
                <p><span class="item-title">是否通生活用电：</span><span class="item-value">{{lifeCondition.whetherUseElectricity}}</span></p>
                <p><span class="item-title">饮水是否困难：</span><span class="item-value">{{lifeCondition.whetherDrinkingWaterDifficult}}</span></p>
                <p><span class="item-title">有无卫生间：</span><span class="item-value">{{lifeCondition.whetherToilet}}</span></p>
              </el-col>
              <el-col :span="7">
                <p><span class="item-title">入户路类型：</span><span class="item-value">{{lifeCondition.householdRoadType}}</span></p>
                <p><span class="item-title">是否危房：</span><span class="item-value">{{lifeCondition.whetherDangerousHouse}}</span></p>
                <p><span class="item-title">饮水是否安全：</span><span class="item-value">{{lifeCondition.whetherDrinkingWaterSafety}}</span></p>
              </el-col>
              <el-col :span="7">
                <p><span class="item-title">住房面积：</span><span class="item-value">{{lifeCondition.housingArea}} 平方米</span></p>
                <p><span class="item-title">危险等级：</span><span class="item-value">{{lifeCondition.dangerLevels}}</span></p>
                <p><span class="item-title">主要燃料类型：</span><span class="item-value">{{lifeCondition.mainFuelType}}</span></p>
              </el-col>
            </el-row>
            <el-row :span="7" v-else style="text-align: center;color: #909399;font-size: 14px">
              暂无数据
            </el-row>
          </div>
        </el-card>
      </el-row>
      <el-row>
        <el-card class="box-card scroll23">
          <div slot="header" class="clearfix">
            <span>家庭收入</span>
          </div>
          <div id="app-6" class="span_2">
            <el-row :gutter="20">
              <el-col :span="7">
                <p><span class="item-title">工资性收入：</span><span class="item-value">{{householdIncome.wageIncome}} 元</span></p>
                <p><span class="item-title">计划生育金：</span><span class="item-value">{{householdIncome.birthControl}} 元</span></p>
                <p><span class="item-title">养老保险金：</span><span class="item-value">{{householdIncome.pensionInsurance}} 元</span></p>
                <p><span class="item-title">转移性收入：</span><span class="item-value">{{householdIncome.transferIncome}} 元</span></p>
                <p><span class="item-title">年收入：</span><span class="item-value">{{householdIncome.annualIncome}} 元</span></p>
              </el-col>
              <el-col :span="7">
                <p><span class="item-title">财产性收入：</span><span class="item-value">{{householdIncome.propertyIncome}} 元</span></p>
                <p><span class="item-title">低保金：</span><span class="item-value">{{householdIncome.lowSecurity}} 元</span></p>
                <p><span class="item-title">生态补偿金：</span><span class="item-value">{{householdIncome.ecologicalCompensation}} 元</span></p>
                <p><span class="item-title">生产性支出：</span><span class="item-value">{{householdIncome.productiveExpenditure}} 元</span></p>
                <p><span class="item-title">纯收入：</span><span class="item-value">{{householdIncome.netIncome}} 元</span></p>
              </el-col>
              <el-col :span="7">
                <p><span class="item-title">生产经营性收入：</span><span class="item-value">{{householdIncome.managementIncome}} 元</span></p>
                <p><span class="item-title">五保金：</span><span class="item-value">{{householdIncome.fiveGuarantees}} 元</span></p>
                <p><span class="item-title">其他转移性收入：</span><span class="item-value">{{householdIncome.otherTransferIncome}} 元</span></p>
                <p><span class="item-title">人均纯收入：</span><span class="item-value">{{householdIncome.perCapitaNetIncome}} 元</span></p>
              </el-col>
            </el-row>
          </div>
        </el-card>
      </el-row>
      <el-row>
        <el-card class="box-card scroll31">
          <div slot="header" class="clearfix">
            <span>帮扶人信息变更记录</span>
          </div>
          <el-table
            :data="helpPersonInfoChangeLogs"
            style="width: 100%">
            <el-table-column
              type="index"
              label="序号">
            </el-table-column>
            <el-table-column
              prop="startTime"
              label="开始时间">
            </el-table-column>
            <el-table-column
              prop="endTime"
              label="结束时间">
            </el-table-column>
            <el-table-column
              prop="helpPersonName"
              label="帮扶人">
            </el-table-column>
            <el-table-column
              prop="phoneNumber"
              label="联系电话">
            </el-table-column>
            <el-table-column
              prop="affiliation"
              label="隶属关系">
            </el-table-column>
            <el-table-column
              prop="unit"
              label="单位">
            </el-table-column>
            <el-table-column
              prop=""
              label="状态">
            </el-table-column>
          </el-table>
        </el-card>
      </el-row>
      <el-row>
        <el-card class="box-card scroll32">
          <div slot="header" class="clearfix">
            <span>该户受益项目</span>
          </div>
          <el-table
            :data="beneficiaryProjects"
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
              prop="projectType"
              label="项目类型">
            </el-table-column>
            <el-table-column
              prop="money"
              label="扶持金额">
            </el-table-column>
            <el-table-column
              prop="startTime"
              label="开始时间">
            </el-table-column>
            <el-table-column
              prop="endTime"
              label="结束时间">
            </el-table-column>
            <el-table-column
              prop=""
              label="实施情况">
            </el-table-column>
          </el-table>
        </el-card>
      </el-row>
      <el-row>
        <el-card class="box-card scroll41">
          <div slot="header" class="clearfix">
            <span>购房信息</span>
          </div>
          <el-table v-if="buyHouseInfoList.length === 0">
          </el-table>
          <el-collapse v-model="activeNames"
                       @change="handleChange" v-for="house in buyHouseInfoList">
            <el-collapse-item>
              <template slot="title">
                <div class="div_member2">
                  <div class="member1">
                    <span class="item-title">购房人姓名：</span><span class="item-value">{{house.householder}}</span>
                  </div>
                  <div class="member1">
                    <span class="item-title">登记时间：</span><span class="item-value">{{house.registrationDate}}</span>
                  </div>
                  <div class="member3">
                    <span class="item-title">产权证号：</span><span class="item-value">{{house.propertyCertificateNumber}}</span>
                  </div>
                </div>
              </template>
              <div>
                <el-row :gutter="20">
                  <el-col :span="2"><span class="h-span-50">区县</span></el-col>
                  <el-col :span="2"><span class="h-span-50">城镇</span></el-col>
                  <el-col :span="2"><span class="h-span-50">乡村</span></el-col>
                  <el-col :span="3"><span class="h-span-50">人员身份号</span></el-col>
                  <el-col :span="3"><span class="h-span-50">房屋所在区</span></el-col>
                  <el-col :span="3"><span class="h-span-50">权利人证件</span></el-col>
                  <el-col :span="3"><span class="h-span-50">坐落</span></el-col>
                  <el-col :span="2"><span class="h-span-50">建面</span></el-col>
                  <el-col :span="3"><span class="h-span-50">用途</span></el-col>
                </el-row>
                <el-row :gutter="20">
                  <el-col :span="2" class="grid-content"><span>{{house.district}}</span></el-col>
                  <el-col :span="2" class="grid-content"><span>{{house.town}}</span></el-col>
                  <el-col :span="2" class="grid-content"><span>{{house.village}}</span></el-col>
                  <el-col :span="3" class="grid-content"><span>{{house.personIDNumber}}</span></el-col>
                  <el-col :span="3" class="grid-content"><span>{{house.houseArea}}</span></el-col>
                  <el-col :span="3" class="grid-content"><span>{{house.rightHolderCertificate1}}</span></el-col>
                  <el-col :span="3" class="grid-content"><span>{{house.located}}</span></el-col>
                  <el-col :span="2" class="grid-content"><span>{{house.constructionArea}}</span></el-col>
                  <el-col :span="3" class="grid-content"><span>{{house.use	}}</span></el-col>
                </el-row>
              </div>
            </el-collapse-item>
          </el-collapse>
        </el-card>
      </el-row>
      <el-row>
        <el-card class="box-card scroll42">
          <div slot="header" class="clearfix">
            <span>购车信息</span>
          </div>
          <el-table v-if="buyCarInfoList.length === 0">
          </el-table>
          <el-collapse v-model="activeNames" @change="handleChange" v-for="(car,index) in buyCarInfoList">
            <el-collapse-item>
              <template slot="title">
                <div class="div_member1">
                  <div class="member1">
                    <span class="item-title">购车人姓名：</span><span class="item-value">{{car.taxpayer}}</span>
                  </div>
                  <div class="member1">
                    <span class="item-title">购置时间：</span><span class="item-value">{{car.purchaseDate}}</span>
                  </div>
                  <div class="member1">
                    <span class="item-title">车牌：</span><span class="item-value">{{car.vehicleLicenseNumber}}</span>
                  </div>
                </div>
              </template>
              <div>
                <el-row :gutter="20">
                  <el-col :span="3"><span class="h-span-50">区县</span></el-col>
                  <el-col :span="3"><span class="h-span-50">乡镇</span></el-col>
                  <el-col :span="3"><span class="h-span-50">村委</span></el-col>
                  <el-col :span="3"><span class="h-span-50">类型</span></el-col>
                  <el-col :span="3"><span class="h-span-50">品牌</span></el-col>
                  <el-col :span="3"><span class="h-span-50">状态</span></el-col>
                  <el-col :span="3"><span class="h-span-50">人员身份证号码</span></el-col>
                </el-row>
                <el-row :gutter="20">
                  <el-col :span="3" class="grid-content"><span>{{car.district}}</span></el-col>
                  <el-col :span="3" class="grid-content"><span>{{car.town}}</span></el-col>
                  <el-col :span="3" class="grid-content"><span>{{car.village}}</span></el-col>
                  <el-col :span="3" class="grid-content"><span>未知</span></el-col>
                  <el-col :span="3" class="grid-content"><span>{{car.model}}</span></el-col>
                  <el-col :span="3" class="grid-content"><span>未知</span></el-col>
                  <el-col :span="3" class="grid-content"><span>{{car.personIDNumber}}</span></el-col>
                </el-row>
              </div>
            </el-collapse-item>
          </el-collapse>
        </el-card>
      </el-row>
      <el-row>
        <el-card class="box-card scroll43">
          <div slot="header" class="clearfix">
            <span>入股经商办企业</span>
          </div>
          <el-table v-if="businessEnterpriseInfoList.length === 0">
          </el-table>
          <el-collapse v-model="activeNames" @change="handleChange" v-for="enterprise in businessEnterpriseInfoList">
            <el-collapse-item>
              <template slot="title">
                <div class="div_member1">
                  <div class="member1 span_2">
                    <span class="item-title">法人姓名：</span><span class="item-value">{{enterprise.legalPerson}}</span>
                  </div>
                  <div class="member2">
                    <span class="item-title">成立时间：</span><span class="item-value">{{enterprise.establishedDate}}</span>
                  </div>
                  <div class="member1">
                    <span class="item-title">注册号：</span><span class="item-value">{{enterprise.registrationNumber}}</span>
                  </div>
                </div>
              </template>
              <div>
                <el-row :gutter="20">
                  <el-col :span="4"><span class="h-span-50">区县</span></el-col>
                  <el-col :span="4"><span class="h-span-50">乡镇</span></el-col>
                  <el-col :span="4"><span class="h-span-50">村委</span></el-col>
                  <el-col :span="4"><span class="h-span-50">人员身份证号码</span></el-col>
                  <el-col :span="4"><span class="h-span-50">企业名称</span></el-col>
                  <el-col :span="4"><span class="h-span-50">企业状态</span></el-col>
                </el-row>
                <el-row :gutter="20">
                  <el-col :span="4" class="grid-content"><span>{{enterprise.district}}</span></el-col>
                  <el-col :span="4" class="grid-content"><span>{{enterprise.town}}</span></el-col>
                  <el-col :span="4" class="grid-content"><span>{{enterprise.village}}</span></el-col>
                  <el-col :span="4" class="grid-content"><span>{{enterprise.personIDNumber}}</span></el-col>
                  <el-col :span="4" class="grid-content"><span>{{enterprise.companyName}}</span></el-col>
                  <el-col :span="4" class="grid-content"><span>{{enterprise.enterpriseType}}</span></el-col>
                </el-row>
              </div>
            </el-collapse-item>
          </el-collapse>
        </el-card>
      </el-row>
      <el-row>
        <el-card class="box-card scroll44">
          <div slot="header" class="clearfix">
            <span>财政供养人员</span>
          </div>
          <el-table v-if="financialSupportStaffList.length === 0">
          </el-table>
          <el-collapse v-model="activeNames" @change="handleChange" v-for="support in financialSupportStaffList">
            <el-collapse-item>
              <template slot="title">
                <div class="div_member1">
                  <div class="member1 span_2">
                    <span class="item-title">姓名：</span><span class="item-value">{{support.userName}}</span>
                  </div>
                  <div class="member1">
                    <span class="item-title">单位名称：</span><span class="item-value">{{support.unit}}</span>
                  </div>
                  <div class="member1">
                    <span class="item-title">乡镇：</span><span class="item-value">{{support.town}}</span>
                  </div>
                </div>
              </template>
              <div>
                <el-row :gutter="20">
                  <el-col :span="2"><span class="h-span-50">区县</span></el-col>
                  <el-col :span="2"><span class="h-span-50">乡镇</span></el-col>
                  <el-col :span="2"><span class="h-span-50">村委</span></el-col>
                  <el-col :span="3"><span class="h-span-50">贫困户类型</span></el-col>
                  <el-col :span="3"><span class="h-span-50">家庭人员姓名</span></el-col>
                  <el-col :span="3"><span class="h-span-50">预算代码</span></el-col>
                  <el-col :span="4"><span class="h-span-50">身份证</span></el-col>
                  <el-col :span="3"><span class="h-span-50">代发银行</span></el-col>
                </el-row>
                <el-row :gutter="20">
                  <el-col :span="2" class="grid-content"><span>{{support.district}}</span></el-col>
                  <el-col :span="2" class="grid-content"><span>{{support.town}}</span></el-col>
                  <el-col :span="2" class="grid-content"><span>{{support.village}}</span></el-col>
                  <el-col :span="3" class="grid-content"><span>{{support.povertyType}}</span></el-col>
                  <el-col :span="3" class="grid-content"><span>{{support.householder}}</span></el-col>
                  <el-col :span="3" class="grid-content"><span>{{support.budgetCode}}</span></el-col>
                  <el-col :span="4" class="grid-content"><span>{{support.personIDNumber}}</span></el-col>
                  <el-col :span="3" class="grid-content"><span>{{support.daihatsuBank}}</span></el-col>
                </el-row>
              </div>
            </el-collapse-item>
          </el-collapse>
        </el-card>
      </el-row>
    </div>
  </div>
  </div>
</template>

<script>
  import { info_attr } from '../../../api/info_attr.js'
  import BScroll from 'better-scroll'
  import Avatar from 'vue-avatar'
  const simg = {
    has_chechan: 'static/img/people/cyp_chengchan.png',
    no_has_chechan: 'static/img/people/cyp_chengchan_false.png',
    has_fangchan: 'static/img/people/cyp_fangchan.png',
    no_has_fangchan: 'static/img/people/cyp_fangchan_1.png',
    has_qiyefaren: 'static/img/people/cyp_qiyefaren.png',
    no_has_qiyefaren: 'static/img/people/cyp_qiyefaren_1.png',
    has_caizhenggongyang: 'static/img/people/cyp_caizhenggongyang.png',
    no_has_caizhenggongyang: 'static/img/people/cyp_czgy_false.png',
    has_bao_xian: 'static/img/people/cyp_baoxianbutie.png',
    no_has_bao_xian: 'static/img/people/cyp_baoxianbutie_1.png',
    has_jiao_yu: 'static/img/people/cyp_jiaoyubutie.png',
    no_has_jiao_yu: 'static/img/people/cyp_jiaoyubutie_1.png',
    has_yiliao: 'static/img/people/cyp_yiliaobutie.png',
    no_has_yiliao: 'static/img/people/cyp_yiliaobutie_1.png',
    has_wei_fang: 'static/img/people/cyp_weifanggaizao.png',
    no_has_wei_fang: 'static/img/people/cyp_weifanggaizao_1.png'
  }
  export default {
    name: 'myDetails',
    components: { Avatar },
    data() {
      return {
        caiwu: {
          chechan: simg.no_has_chechan,
          fangchan: simg.no_has_fangchan,
          qiyefaren: simg.no_has_qiyefaren,
          gongyang: simg.no_has_caizhenggongyang
        },
        butie: {
          yiliao: simg.no_has_yiliao,
          baoxian: simg.no_has_bao_xian,
          weifang: simg.no_has_wei_fang,
          jiaoyu: simg.no_has_jiao_yu
        },
        financialSituation: true,
        helpPolicy: true,
        loading: true,
        time: 300,
        BS: null,
        info_msg: {},
        msg: '',
        householderName: '',
        description: '户主',
        householdNumber: '',
        phoneNumber: '',
        mainCauseOfPoverty: '-',
        poorHouseholdProperty: '',
        familyPopulationNum: '',
        homeAddress: '',
        secondaryCausesOfPoverty: [],
        whetherDangerousHouse: '',
        fraction: 0,
        family_info_1: '-',
        family_info_2: '-',
        family_info_3: '-',
        family_info_4: '-',
        family_info_5: '-',
        family_info_6: null,
        family_info_7: '-',
        family_info_8: '-',
        family_info_9: '-',
        family_info_10: -'',
        familyMembers: [],
        cultivatedArea: 0,
        effectiveWateringArea: 0,
        forestArea: 0,
        fruitArea: 0,
        pastureArea: 0,
        returnFarmlandToForestArea: 0,
        waterSurfaceArea: 0,
        whetherJoinCooperatives: '-',
        familyMemberChangeLogs: [],
        lifeCondition: {},
        productionCondition: {},
        householdIncome: {},
        helpPersonInfoChangeLogs: [],
        beneficiaryProjects: [],
        buyHouseInfoList: [],
        buyCarInfoList: [],
        businessEnterpriseInfoList: [],
        financialSupportStaffList: []
      }
    },
    methods: {
      handleClickReturn() {
        this.$route.query.type ? this.$router.back() : this.$router.push({ name: 'povertyPeopleManage' })
      },
      async init() {
        const infos = await info_attr(this.infoId)
        if (infos.code === 200) {
          this.loading = false
          this.info_msg = infos.data
          this.financialSituation = infos.data.familyBaseInfo.financialSituation
          if (this.financialSituation) {
            if (this.financialSituation[292]) {
              this.caiwu.chechan = simg.has_chechan
            } else {
              this.caiwu.chechan = simg.no_has_chechan
            }
            if (this.financialSituation[293]) {
              this.caiwu.fangchan = simg.has_fangchan
            } else {
              this.caiwu.fangchan = simg.no_has_fangchan
            }
            if (this.financialSituation[294]) {
              this.caiwu.qiyefaren = simg.has_qiyefaren
            } else {
              this.caiwu.qiyefaren = simg.no_has_qiyefaren
            }
            if (this.financialSituation[295]) {
              this.caiwu.gongyang = simg.has_caizhenggongyang
            } else {
              this.caiwu.gongyang = simg.no_has_caizhenggongyang
            }
          }
          this.helpPolicy = infos.data.familyBaseInfo.helpPolicy
          if (this.helpPolicy) {
            if (this.helpPolicy[288]) {
              this.butie.jiaoyu = simg.has_jiao_yu
            } else {
              this.butie.jiaoyu = simg.no_has_jiao_yu
            }
            if (this.helpPolicy[289]) {
              this.butie.yiliao = simg.has_yiliao
            } else {
              this.butie.yiliao = simg.no_has_yiliao
            }
            if (this.helpPolicy[290]) {
              this.butie.baoxian = simg.has_bao_xian
            } else {
              this.butie.baoxian = simg.no_has_bao_xian
            }
            if (this.helpPolicy[291]) {
              this.butie.weifang = simg.has_wei_fang
            } else {
              this.butie.weifang = simg.no_has_wei_fang
            }
          }
          this.householderName = infos.data.familyBaseInfo.householderName
          this.householdNumber = infos.data.familyBaseInfo.householdNumber
          this.phoneNumber = infos.data.familyBaseInfo.phoneNumber
          this.mainCauseOfPoverty = infos.data.familyBaseInfo.mainCauseOfPoverty
          this.poorHouseholdProperty = infos.data.familyBaseInfo.poorHouseholdProperty
          this.familyPopulationNum = infos.data.familyBaseInfo.familyPopulationNum
          this.homeAddress = infos.data.familyBaseInfo.homeAddress
          this.secondaryCausesOfPoverty = infos.data.familyBaseInfo.secondaryCausesOfPoverty
          this.whetherDangerousHouse = infos.data.familyBaseInfo.whetherDangerousHouse
          this.fraction = infos.data.familyBaseInfo.score
          if (infos.data.familyBaseInfo.householdNumber !== null) this.family_info_1 = infos.data.familyBaseInfo.householdNumber
          if (infos.data.familyBaseInfo.homeAddress !== null) this.family_info_2 = infos.data.familyBaseInfo.homeAddress
          if (infos.data.familyBaseInfo.mainCauseOfPoverty !== null) this.family_info_3 = infos.data.familyBaseInfo.mainCauseOfPoverty
          if (infos.data.familyBaseInfo.bank !== null) this.family_info_4 = infos.data.familyBaseInfo.bank
          if (infos.data.familyBaseInfo.poorHouseholdProperty !== null) this.family_info_5 = infos.data.familyBaseInfo.poorHouseholdProperty
          if (infos.data.familyBaseInfo.secondaryCausesOfPoverty !== null && infos.data.familyBaseInfo.secondaryCausesOfPoverty.length !== 0) this.family_info_6 = infos.data.familyBaseInfo.secondaryCausesOfPoverty
          if (infos.data.familyBaseInfo.bankCardNumber !== null) this.family_info_7 = infos.data.familyBaseInfo.bankCardNumber
          if (infos.data.familyBaseInfo.whetherMilitaryGenus !== null) this.family_info_8 = infos.data.familyBaseInfo.whetherMilitaryGenus
          if (infos.data.familyBaseInfo.reasonsForReturningToPoverty !== null) this.family_info_9 = infos.data.familyBaseInfo.reasonsForReturningToPoverty
          if (infos.data.familyBaseInfo.phoneNumber !== null) this.family_info_10 = infos.data.familyBaseInfo.phoneNumber
          this.familyMembers = infos.data.familyMembers
          if (infos.data.productionCondition !== null) {
            this.productionCondition = infos.data.productionCondition
            this.cultivatedArea = infos.data.productionCondition.cultivatedArea
            this.effectiveWateringArea = infos.data.productionCondition.effectiveWateringArea
            this.forestArea = infos.data.productionCondition.forestArea
            this.fruitArea = infos.data.productionCondition.fruitArea
            this.pastureArea = infos.data.productionCondition.pastureArea
            this.returnFarmlandToForestArea = infos.data.productionCondition.returnFarmlandToForestArea
            this.waterSurfaceArea = infos.data.productionCondition.waterSurfaceArea
            this.whetherJoinCooperatives = infos.data.productionCondition.whetherJoinCooperatives
          }
          this.familyMemberChangeLogs = infos.data.familyMemberChangeLogs
          if (infos.data.lifeCondition !== null) {
            this.lifeCondition = infos.data.lifeCondition
          }
          this.householdIncome = infos.data.householdIncome
          console.log(this.householdIncome)
          this.helpPersonInfoChangeLogs = infos.data.helpPersonInfoChangeLogs
          this.beneficiaryProjects = infos.data.beneficiaryProjects
          this.buyHouseInfoList = infos.data.buyHouseInfoList
          this.buyCarInfoList = infos.data.buyCarInfoList
          this.businessEnterpriseInfoList = infos.data.businessEnterpriseInfoList
          this.financialSupportStaffList = infos.data.financialSupportStaffList
        }
      },
      scroll1(event) {
      },
      clickFamilyInfo(n) {
        this.BS.scrollToElement(`.scroll${n}`, this.time, 0, -100)
      },
      scrollInit() {
        // this.BS = new BScroll(this.$refs.wrapper)
        this.BS = new BScroll(this.$refs.wrapper, {
          mouseWheel: true,
          scrollbar: {
            fade: true,
            interactive: false
          }
        })
      },
      scrollDestroy() {
        if (this.BS) {
          this.BS.destroy()
        }
      }
    },
    created() {
      this.infoId = this.$route.query.id
      this.init()
    },
    mounted() {
      this.scrollInit()
    },
    beforeDestroy() {
      this.scrollDestroy()
    }
  }
</script>

<style scoped>
  @import '../../../styles/info-and-policy-g.css';
  .fixed{
    width: 78%;
    position: fixed;
    z-index: 999;
    top: auto;
  }
  .wrapper{
    width: 100%;
    height: 100%;
  }
  .app-3 span {
    margin: 0px 0px 20px 0px;
    float: left;
  }
  .span_2 p {
    margin: 12px 0 12px 70px;
  }
  .item-title{
    font-weight:bold;
    font-size: 12px;
    color:#555555;
  }
  .item-value{
    color:#666666;
    font-size: 12px;
  }

</style>
