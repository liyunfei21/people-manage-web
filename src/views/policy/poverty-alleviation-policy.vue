<template>
  <div>
    <el-button type="primary" class=" el-icon-plus return" @click="handleClickReturn"> 添加</el-button>
    <el-row>
      <el-card class="box-card">
        <h3>扶贫政策</h3>
        <el-row>
          <div style="margin-left: 25%; height: 28px; line-height:28px">
            <div class="el-pagination">
              <span style="font-size: 100%">年份：</span>
              <button type="button" class="btn-prev" ref="refLeft" @click="clickLeft"><i
                class="el-icon el-icon-arrow-left"></i>
              </button>
              <ul class="el-pager" ref="dateli" v-model="yearId" style="color: #666666">
                <li class="number" @click="clickContent(0)">2013</li>
                <li class="number" @click="clickContent(1)">2014</li>
                <li class="number" @click="clickContent(2)">2015</li>
                <li class="number" @click="clickContent(3)">2016</li>
                <li class="number" @click="clickContent(4)">2017</li>
                <li class="number active" @click="clickContent(5)">2018</li>
              </ul>
              <button type="button" class="btn-next" ref="refRight" disabled @click="clickRight"><i
                class="el-icon el-icon-arrow-right"></i>
              </button>
            </div>
          </div>
        </el-row>
        <el-row>
          <div style="margin-left: 25%; height: 28px; line-height:28px">
            <div class="el-pagination">
              <span style="font-size: 100%">分类：</span>
              <ul class="el-pager" ref="typeRef" style="color: #666666">
                <li class="number" @click="clickContent2(1)" style="cursor:pointer">医疗</li>
                <li class="number" @click="clickContent2(2)" style="cursor:pointer">精准脱贫保</li>
                <li class="number" @click="clickContent2(3)" style="cursor:pointer">教育补助</li>
                <li class="number" @click="clickContent2(4)" style="cursor:pointer">危房改造</li>
                <li class="number" @click="clickContent2(5)" style="cursor:pointer">民政低保补助</li>
                <li class="number" @click="clickContent2(6)" style="cursor:pointer">技能培训</li>
              </ul>
            </div>
          </div>
        </el-row>
        <el-row>
          <div style="margin-left: 30%">
            <el-input
              placeholder="请输入内容"
              v-model="keyword" @keyup.enter.native="searchClick2" style="width:30%">
              <i slot="prefix" class="el-input__icon el-icon-search input-with-select margin-bottom-20"></i>
            </el-input>
            <el-button type="primary" style="margin-left: 20px" @click="searchClick2">搜索</el-button>
          </div>
        </el-row>
      </el-card>
    </el-row>
    <el-row  id="content">
      <div style="height: 48px;text-align: center;display: block;border-bottom: 1px solid #ebeef5;">
        <div style="font-size: 14px;color: #999999;">暂无数据</div>
      </div>
    </el-row>
    <el-row v-loading="loading" v-for="(policy,index) in policys" :key="index">
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span style="cursor:pointer;font-weight: bold" @click="clickInfo(index)">{{policy.title}}</span>
          <el-dropdown style="float: right; padding: 3px 0;cursor:pointer" trigger="click" :hide-on-click="false">
            <span class="el-dropdown-link">
              <i class="el-icon-menu"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="a">
                <el-tooltip  class="item" effect="dark" content="编辑" placement="left">
                <i class="el-icon-edit" @click="clickModify(index)"></i>
                </el-tooltip>
              </el-dropdown-item>
              <el-dropdown-item command="a">
                <el-tooltip  class="item" effect="dark" content="删除" placement="left">
                <i class="el-icon-delete" @click="clickRemove(policy.id,index)"></i>
                </el-tooltip>
              </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
        <div>
          <div style="height: 20px; margin-bottom: 2px">
            <div style="text-align: left;width: 100%">
              <span style="font-size: 80%;float:left"><span style="font-weight: bold">来源：</span>{{policy.unit}}</span>
              <span style="font-size: 80%;float:right">{{policy.releaseTime}}</span>
            </div>
          </div>
          <div>
            <p style="text-indent: 2em;line-height: 150%;font-size: 80%;">{{policy.summary}}</p>
          </div>
          <div style="margin-top: 30px;">关键词：<span @click="clickInfo(index)"
                                                   style="cursor:pointer;font-size: 90%; color: red">{{policy.label}}</span>
          </div>
        </div>

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
  import { getPolicys, remove } from '../../api/policys.js'

  const cityOptions = ['医疗', '精准脱贫保', '教育补助', '危房改造', '民政低保补助', '技能培训']
  let liIndex
  export default {
    name: 'poverty-alleviation-policy',
    data() {
      return {
        loading: true,
        checkedCities1: [],
        cities: cityOptions,
        policys: [],
        yearTime: '',
        typeValue: '',
        total: 0,
        from: 0,
        size: 10,
        typeId: '',
        yearId: 283,
        keyword: '',
        removeContent: false
      }
    },
    methods: {
      clickInfo(index) {
        this.$router.push({ name: 'policy_info', query: { policy: this.policys[index] }})
      },
      clickRemoveContent(id) {
        this.removeContent = false
      },
      clickModify(index) {
        this.$router.push({ name: 'policy_modify', query: { policy: this.policys[index] }})
      },
      clickRemove(id, index) {
        this.$confirm('确认删除选中记录吗？', '提示', {
          type: 'warning'
        }).then(() => {
          // this.policys[index]
          const para = { id: id }
          remove(para).then(res => {
            this.$message({
              message: '删除成功',
              type: 'success'
            })
            this.init()
          })
        })
          .catch(() => {
          })
      },
      clickLeft() {
        const li = this.searchClick()
        liIndex = li
        this.$refs.dateli.children[liIndex].classList.remove('active')
        if (li < 1) {
          liIndex = 0
          this.$refs.refLeft.setAttribute('disabled', 'disabled')
        } else {
          liIndex = li - 1
        }
        this.$refs.dateli.children[liIndex].classList.add('active')
        this.$refs.refRight.removeAttribute('disabled')
        this.init()
      },
      clickContent(index) {
        const li = this.searchClick()
        if (index < 1) {
          this.$refs.refLeft.setAttribute('disabled', 'disabled')
          this.$refs.refRight.removeAttribute('disabled')
        } else if (index > 4) {
          this.$refs.refRight.setAttribute('disabled', 'disabled')
          this.$refs.refLeft.removeAttribute('disabled')
        } else {
          this.$refs.refRight.removeAttribute('disabled')
          this.$refs.refLeft.removeAttribute('disabled')
        }
        this.$refs.dateli.children[li].classList.remove('active')
        this.$refs.dateli.children[index].classList.add('active')
        this.init()
      },
      clickRight() {
        const li = this.searchClick()
        liIndex = li
        this.$refs.dateli.children[liIndex].classList.remove('active')
        if (li > 5) {
          liIndex = 6
          this.$refs.refRight.setAttribute('disabled', 'disabled')
        } else {
          liIndex = li + 1
        }
        this.$refs.dateli.children[liIndex].classList.add('active')
        this.$refs.refLeft.removeAttribute('disabled')
        this.init()
      },
      clickContent2(index) {
        --index
        let a = 0
        const b = this.typeSearch()
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
        if (this.typeSearch() === null) {
          this.typeId = 0
        } else {
          this.typeId = this.typeSearch() + 1
        }
        console.log(this.typeId)
        this.init()
      },
      searchClick() {
        for (let i = 0; i < this.$refs.dateli.children.length; i++) {
          for (let j = 0; j < this.$refs.dateli.children[i].classList.length; j++) {
            if (this.$refs.dateli.children[i].classList[j] === 'active') {
              return i
            }
          }
        }
        return null
      },
      typeSearch() {
        for (let i = 0; i < this.$refs.typeRef.children.length; i++) {
          for (let j = 0; j < this.$refs.typeRef.children[i].classList.length; j++) {
            if (this.$refs.typeRef.children[i].classList[j] === 'active') {
              return i
            }
          }
        }
        return null
      },
      searchClick2() {
        if (this.searchClick() != null) {
          this.yearId = this.$refs.dateli.children[this.searchClick()].innerHTML
        } else {
          this.yearId = ''
        }
        if (this.typeSearch() != null) {
          this.typeId = this.typeSearch() + 1
        } else {
          this.typeId = ''
        }
        this.init()
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
      handleClickReturn() {
        this.$router.push({ name: 'policy_create' })
      },
      async init(type) {
        if (type !== 1) {
          const li = this.searchClick()
          if (li === 0) {
            this.yearId = 242
          } else if (li === 1) {
            this.yearId = 243
          } else if (li === 2) {
            this.yearId = 244
          } else if (li === 3) {
            this.yearId = 245
          } else if (li === 4) {
            this.yearId = 246
          } else {
            this.yearId = 283
          }
          const type1 = this.typeId
          if (type1 === 1) {
            this.typeId = 257
          } else if (type1 === 2) {
            this.typeId = 258
          } else if (type1 === 3) {
            this.typeId = 259
          } else if (type1 === 4) {
            this.typeId = 260
          } else if (type1 === 5) {
            this.typeId = 261
          } else if (type1 === 6) {
            this.typeId = 262
          } else {
            this.typeId = 0
          }
        }
        const infos = await getPolicys(this.from, this.size, this.typeId, this.yearId, this.keyword)
        const contentId = document.getElementById('content')
        if (infos.code === 200) {
          this.policys = infos.data.list
          this.total = infos.data.total
          this.loading = false
          if (infos.data.total > 0) {
            contentId.style.display = 'none'
          } else {
            contentId.style.display = 'block'
          }
        }
      },
      scroll1(event) {
      }
    },
    created() {
      this.init(1)
    }
  }
</script>

<style scoped>
  @import '../../styles/info-and-policy-g.css';
</style>
