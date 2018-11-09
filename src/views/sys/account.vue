<template>
  <div>
    <el-row>
      <el-col>
        <el-col><h3>账户管理</h3></el-col>
      </el-col>
    </el-row>
    <el-row :gutter="20" class="margin-bottom-top-10">
      <el-col :span="6" :offset="8">
        <el-input v-model="keywords" placeholder="请输入想要搜索的用户名" @keyup.enter.native="search"/>
      </el-col>
      <el-col :span="4">
        <el-button type="primary" @click="search">搜索</el-button>
      </el-col>
    </el-row>
  <!--  <el-row :gutter="20" class="margin-bottom-top-10">
      <el-button @click="handleAddUser" type="primary">添加</el-button>
    </el-row>-->
    <el-row class="margin-bottom-top-10">
      <el-table :data="accounts" border hit v-loading.body="listLoading" highlight-current-row
                element-loading-text="拼命加载中...">
        <el-table-column type="index" width="60" label="序号"></el-table-column>
        <el-table-column label="用户名" prop="account" />
        <el-table-column label="邮箱" prop="email" :formatter="displayColumn"/>
        <el-table-column label="联系方式" prop="telephone"></el-table-column>
        <!--<el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              type="primary"
              icon="el-icon-check" @click="handleResetPassword(scope.row)">重置密码
            </el-button>
          </template>
        </el-table-column>-->
      </el-table>

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

      <el-dialog width="35%" title="重置密码" :visible.sync="dialogPasswordVisible">
          <span slot="footer" class="dialog-footer">
           <el-button @click="dialogPasswordVisible = false">取 消</el-button>
           <el-button type="primary" @click="submitResetPasswordForm">确 定</el-button>
          </span>
      </el-dialog>
    </el-row>
    <el-dialog width="35%" title="添加用户" :visible.sync="dialogAddUserVisible">
      <el-form class="form" :model="addUserForm" ref="addUserForm" :rules="addUserFormRules">
        <el-form-item label="用户名：" prop="account">
          <el-input v-model="addUserForm.account"/>
        </el-form-item>
        <el-form-item label="邮箱：" prop="email">
          <el-input v-model="addUserForm.email"/>
        </el-form-item>
        <el-form-item label="联系电话：" prop="telephone">
          <el-input v-model="addUserForm.telephone"/>
        </el-form-item>
      </el-form>

      <span slot="footer" class="dialog-footer">
          <el-button @click="dialogAddUserVisible = false">取 消</el-button>
          <el-button type="primary" @click="submitAddUserForm">确 定</el-button>
        </span>
    </el-dialog>
  </div>
</template>

<script>
  import { getUserList, resetPassword, addUser } from '../../api/sys'
  import { isvalidatemobile } from '@/utils/validate'

  export default {
    name: 'account',
    data() {
      const isValidateMobile = (rule, value, callback) => {
        if (isvalidatemobile(value)) {
          callback(new Error('请输入正确的手机号'))
        } else {
          callback()
        }
      }
      return {
        listLoading: false,
        dialogPasswordVisible: false,
        accounts: [],
        total: 0,
        from: 0,
        size: 10,
        keywords: null,
        resetPasswordForm: {
          userId: null
        },
        addUserForm: {
          account: null,
          email: null,
          telephone: null
        },
        dialogAddUserVisible: false,
        addUserFormRules: {
          account: [
            { message: '账户不能为空', trigger: 'blur', required: true }
          ],
          email: [
            { message: '邮箱不能为空', trigger: 'blur', required: true }
          ],
          telephone: [
            { validator: isValidateMobile, trigger: 'blur', required: true }
          ]
        }
      }
    },
    methods: {
      displayColumn(row, column, cellValue, index) {
        return cellValue === null ? '-' : cellValue
      },
      async getAccounts() {
        this.listLoading = true
        const params = {
          size: this.size,
          from: this.from,
          keywords: this.keywords
        }

        const result = await getUserList(params)
        if (result.code === 200) {
          this.accounts = result.data.list
          this.total = result.data.total
          this.listLoading = false
        }
      },
      search() {
        this.getAccounts()
      },
      handleResetPassword(val) {
        // set user Id
        this.resetPasswordForm.userId = val.userId
        // show dialog
        this.dialogPasswordVisible = true
      },
      async submitResetPasswordForm() {
        const request_body = {
          userId: this.resetPasswordForm.userId
        }

        const result = resetPassword(request_body)
        if (result.code === 200) {
          this.$message({
            message: '修改成功',
            type: 'success'
          })
        } else {
          this.$message.error('修改失败')
        }
      },
      handleAddUser() {
        this.dialogAddUserVisible = true
        // clean form validate
        if (this.$refs.addUserForm !== undefined) {
          this.$refs.addUserForm.clearValidate()
        }
      },
      async submitAddUserForm() {
        this.$refs.addUserForm.validate(valid => {
          if (valid) {
            const params = {
              account: this.addUserForm.account,
              email: this.addUserForm.email,
              telephone: this.addUserForm.telephone
            }
            const result = addUser(params)
            if (result.code === 200) {
              this.$message.success('添加成功')
            } else {
              this.$message.error('添加失败')
            }
          }
        })
      },
      handleSizeChange(val) {
        this.size = val
        this.getAccounts()
      },
      handleCurrentChange(val) {
        const page = val
        this.from = (page - 1) * this.size
        this.getAccounts()
      }
    },
    mounted() {
      this.getAccounts()
    }
  }
</script>

<style scoped>
  .margin-bottom-top-10 {
    margin-top: 10px;
  }

  .block {
    float: right;
    margin-top: 15px;
  }
</style>
