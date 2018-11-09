<template xmlns:el-col="http://www.w3.org/1999/html">
  <div>
    <el-row>
      <h3>脱贫成效管理</h3>
    </el-row>

    <el-row :gutter="20" class="margin-bottom-top-10">
      <el-col :span="6" :offset="8">
        <el-input prefix-icon="el-icon-search" v-model="pars.filter.keywords" placeholder="请输入想要搜索的贫困户编号或姓名关键字" @keyup.enter.native="handleSearch" ></el-input>
      </el-col>
      <el-col :span="10">
        <el-button type="primary" @click="handleSearch">搜索</el-button>
        <el-button type="primary" @click="showCondition">筛选</el-button>
      </el-col>
    </el-row>

    <el-row :gutter="20" class="margin-bottom-top-10" :hidden="condition_visible">
      <el-col :span="20">
        <el-form>
          <el-form-item >
            <div class="el-pagination" style="display:block;padding-right: 10%;margin-left: 40px">
              <span style="width: 120px;text-align: right;">年份：</span>
              <button type="button" class="btn-prev" ref="ref_direction_left" @click="handleMove('left')"><i
                class="el-icon el-icon-arrow-left"></i>
              </button>
              <div class="el-pager" >
                <li type="text" :class="{active:hasActiveYearIndex(index)}"
                    v-for="(year , index) in yearList" @click="handleClickYear(index)">{{year.name}}
                </li>
              </div>
              <button type="button" class="btn-next" ref="ref_direction_right" @click="handleMove('right')" disabled><i
                class="el-icon el-icon-arrow-right"></i>
              </button>
            </div>
          </el-form-item>
          <div class="el-pagination" style="padding-right: 10%;margin-left: 40px;margin-bottom: 10px;">
            <span style="width: 120px;text-align: right;">所有地区（镇）：</span>
            <div class="el-pager" style="white-space : normal">
              <li href="javascript:void(0)" v-for="(town,index) in townList" :class="{active:index === activeTownIndex}" @click="handleClickTown(index)">
                {{town.areaName}}
              </li>
            </div>
          </div>
          <div class="el-pagination" style="padding-right: 10%;margin-left: 40px">
            <span style="width: 120px;text-align: right;">状态：</span>
            <div class="el-pager">
              <li type="text" v-for="(status,index) in statusList" :class="{active:index === activeStatusIndex}" @click="handleClickStatus(index)">
                {{status.name}}
              </li>
            </div>
          </div>
        </el-form>
      </el-col>
    </el-row>


    <el-row style="margin-top: 10px">
      <el-table :data="data.effects" border hit v-loading.body="listLoading" highlight-current-row
                element-loading-text="拼命加载中...">
        <el-table-column type="index" width="60" label="序号"></el-table-column>
        <el-table-column label="贫困户编号" prop="householdNumber"/>
        <el-table-column label="户主姓名" prop="householderName"/>
        <el-table-column label="镇"  prop="town"></el-table-column>
        <el-table-column label="村" prop="village"/>
        <el-table-column label="上年度人均纯收入" prop="perCapitaNetIncome"/>
        <el-table-column label="饮水是否困难">
          <template slot-scope="scope">
            <el-button
              :type="scope.row.whetherDrinkingWaterDifficult? 'warning' : 'success'"
              circle :plain="scope.row.whetherDrinkingWaterDifficult" :icon=" 'el-icon-check'" disabled></el-button>
          </template>
        </el-table-column>
        <el-table-column label="饮水是否安全">
          <template slot-scope="scope">
            <el-button
              :type="scope.row.whetherDrinkingWaterSafety? 'success' : 'warning'"
              circle :plain="!scope.row.whetherDrinkingWaterSafety" :icon=" 'el-icon-check'" disabled></el-button>
          </template>
        </el-table-column>
        <el-table-column label="是否参加大病保险" prop="whetherMajorIllness">
          <template slot-scope="scope">
            <el-button
              :type="scope.row.whetherMajorIllness? 'success' : 'warning'"
              circle :plain="!scope.row.whetherMajorIllness" :icon=" 'el-icon-check' " disabled></el-button>
          </template>
        </el-table-column>
        <el-table-column label="家庭成员是否辍学" prop="whetherDropout">
          <template slot-scope="scope">
            <el-button
              :type="scope.row.whetherDropout? 'warning' : 'success'"
              circle :plain="scope.row.whetherDropout" :icon=" 'el-icon-check'" disabled></el-button>
          </template>
        </el-table-column>
        <el-table-column label="状态" prop="status">
          <template slot-scope="scope">
            <el-tag
              :type="scope.row.status === '1'? 'success' : 'warning'">{{scope.row.status === '1'?'已脱贫':'未脱贫'}}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column label="资料审核">
          <template slot-scope="scope">
            <el-button v-if="scope.row.status === '0'" type="primary" @click="handleClickShowUpload(scope.row.familyYearStateId)"
                       :disabled="isClickExit(scope.row)" style="min-width: 100px;">脱贫退出
            </el-button>
            <el-button v-else type="info" plain style="min-width: 100px;" @click="handleClickShows(scope.row)">查 看
            </el-button>

          </template>
        </el-table-column>
      </el-table>
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
            :page-sizes="[10,20]"
            layout="total, sizes, prev, pager, next, jumper"
            :total="data.total">
          </el-pagination>
        </div>
      </el-col>
    </el-row>


    <el-dialog title="审核资料" :visible.sync="dialogFormVisible">
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="资料：">

          <el-upload
            class="upload-demo"
            drag
            action="/manage/upload"
            :auto-upload="false"
            :on-change="OnChange"
            :file-list="fileList"
            :limit="3"
            multiple>
            <i class="el-icon-upload"></i>
            <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
            <div class="el-upload__tip" slot="tip">图片文本等资料上传，且不超过50Mb</div>
          </el-upload>

        </el-form-item>
        <el-form-item label="备注：">
          <el-input type="textarea" v-model="form.desc"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="onCancel">取 消</el-button>
        <el-button type="primary" @click="onSubmit">确 定</el-button>
      </div>
    </el-dialog>

    <el-dialog title="查看" :visible.sync="dialogInfoVisible">
      <el-form>
        <el-form-item label="资料：">
          <el-card>
            <div v-for="path in material.filePaths">
              <a :href="path" target="_blank">{{generateFileName(path)}}</a>
            </div>
          </el-card>
        </el-form-item>
        <el-form-item label="备注：">
          <el-card>
            <span>{{material.desc}}</span>
          </el-card>
        </el-form-item>
      </el-form>
    </el-dialog>


  </div>
</template>

<script>
  import { getEffects } from '@/api/effect'
  import { upload, getMaterial } from '../../api/effect'
  import { getAreaDictByType, getDictByType } from '@/api/dict'

export default {
    name: 'effect-manage',
    data() {
      return {
        condition_visible: true,
        listLoading: true,
        dialogInfoVisible: false,
        dialogFormVisible: false,
        yearList: [],
        // 查询条件
        statusList: [{ code: 0, name: '未脱贫' }, { code: 1, name: '已脱贫' }],
        townList: [],
        activeStatusIndex: -1,
        activeTownIndex: -1,
        activeYearIndex: -1,
        // 查看审核资料
        material: {
          desc: '',
          filePaths: []
        },
        // 上传
        fileList: [],
        form: {
          desc: null,
          familyYearStateId: null
        },
        data: {
          // 列表
          effects: [],
          total: 0
        },
        pars: {
          page: 1,
          size: 10,
          filter: {
            keywords: '',
            year: null,
            town: null,
            status: null
          }
        }
      }
    },
    watch: {
      activeYearIndex() {
        this.getEffects()
      }
    },
    mounted() {
      this.getYears()
      this.getTowns()
      this.$refs.pagination.internalCurrentPage = this.pars.page
      // 先不加载帮扶成效列表，在watch 监听activeYearIndex 变化，确定年份后，再加载列表
    },
    methods: {
      handleSearch() {
        this.pars.page = 1
        this.getEffects()
      },
      async getYears() {
        const result = await getDictByType('year')
        if (result.code === 200) {
          this.yearList = result.data
        }
      },
      async getTowns() {
        const result = await getAreaDictByType('town', 501006000000)
        if (result.code === 200) {
          this.townList = result.data
        }
      },
      async getEffects() {
        this.listLoading = true
        this.pars.filter.year = this.yearList[this.activeYearIndex]
        this.pars.filter.town = this.townList[this.activeTownIndex]
        this.pars.filter.status = this.statusList[this.activeStatusIndex]
        // save store
        this.$store.dispatch('saveListPagePars', { path: this.$route.path, pars: this.pars })
        const params = {
          from: (this.pars.page - 1) * this.pars.size,
          size: this.pars.size,
          yearId: !this.pars.filter.year ? null : this.pars.filter.year.id,
          townId: !this.pars.filter.town ? null : this.pars.filter.town.areaId,
          status: !this.pars.filter.status ? null : this.pars.filter.status.code,
          keywords: this.pars.filter.keywords
        }
        try {
          const result = await getEffects(params)
          if (result.code === 200) {
            this.data.effects = result.data.list
            this.data.total = result.data.total
          }
        } finally {
          this.listLoading = false
        }
      },
      handleSizeChange(val) {
        this.pars.size = val
        this.getEffects()
      },
      handleCurrentChange(val) {
        this.pars.page = val
        this.getEffects()
      },
      isClickExit(val) {
        if (!val.whetherDrinkingWaterDifficult && val.whetherDrinkingWaterSafety && !val.whetherDropout && val.whetherMajorIllness) {
          return false
        }
        return true
      },
      OnChange(file, fileList) {
        this.fileList = fileList
      },
      async onSubmit() {
        const formData = new FormData()
        for (let i = 0; i < this.fileList.length; i++) {
          formData.append('files', this.fileList[i].raw)
        }
        const params = {
          familyYearStateId: this.form.familyYearStateId,
          desc: this.form.desc
        }
        const result = await upload(formData, params)
        if (result.code === 200) {
          this.form = {}
          this.fileList = []
          this.dialogFormVisible = false
          this.$message({
            message: '上传成功',
            type: 'success'
          })
        } else {
          this.$message.error('上传失败')
        }
      },
      onCancel() {
        this.form = {}
        this.fileList = []
        this.dialogFormVisible = false
      },
      async handleClickShows(val) {
        this.dialogInfoVisible = true
        const familyYearStateId = val.familyYearStateId
        const params = {
          familyYearStateId: familyYearStateId
        }
        const result = await getMaterial(params)
        if (result.code === 200) {
          this.material.desc = result.data.desc
          const filePathArray = result.data.filePath
          this.genFiles(filePathArray)
        }
      },
      genFiles(filePathArray) {
        this.material.filePaths = []
        const apiUrl = process.env.BASE_API + '/outPovertyEffect/downloadFile'
        for (const i in filePathArray) {
          const fullPath = apiUrl + '?filePath=' + filePathArray[i]
          this.material.filePaths.push(fullPath)
        }
      },
      handleClickYear(index) {
        this.activeYearIndex = index
        if (index < 1) {
          this.$refs.ref_direction_left.setAttribute('disabled', 'disabled')
        } else this.$refs.ref_direction_right.removeAttribute('disabled')

        if (index >= (this.yearList.length - 1)) { this.$refs.ref_direction_right.setAttribute('disabled', 'disabled') } else this.$refs.ref_direction_left.removeAttribute('disabled')
      },
      hasActiveYearIndex(index) {
        const yearIndex = this.activeYearIndex === -1 ? this.yearList.length - 1 : this.activeYearIndex
        this.activeYearIndex = yearIndex
        if (yearIndex === index) {
          return true
        } else {
          return false
        }
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
      },
      handleClickTown(index) {
        this.activeTownIndex = index === this.activeTownIndex ? -1 : index
        this.getEffects()
      },
      handleClickStatus(index) {
        this.activeStatusIndex = index === this.activeStatusIndex ? -1 : index
        this.getEffects()
      },
      showCondition() {
        if (this.condition_visible) {
          this.condition_visible = false
        } else {
          this.condition_visible = true
        }
      },
      handleClickShowUpload(familyYearStateId) {
        this.dialogFormVisible = true
        this.form.familyYearStateId = familyYearStateId
      },
      generateFileName(path) {
        const array = path.split('/')
        const fileName = array[array.length - 1]
        return fileName
      }
    },
    created() {
      // if (this.$store.getters.listPagePars.has(this.$route.path)) {
      //   this.pars = this.$store.getters.listPagePars.get(this.$route.path)
      // }
    }
  }
</script>

<style lang="scss">
  .block {
    float: right;
    margin-top: 15px;
  }

  .margin-bottom-top-10 {
    margin-top: 10px;
  }
  .el-tag--medium{
    cursor: auto!important;
  }
  .el-pagination span{
    font-size: 14px!important;
    color: #606266;
  }
  .el-pagination .el-pager{
    font-size: 14px!important;
    font-weight: normal;
  }
</style>
