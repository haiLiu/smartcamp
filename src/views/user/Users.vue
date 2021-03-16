<template>
  <div>
    <!-- 面包屑导航区域 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- 卡片视图 -->
    <el-card class="box-card">
      <!-- 搜索与添加区域 -->
      <el-row :gutter="20">
        <el-col :span="7">
          <el-input placeholder="请输入内容" 
          v-model="queryInfo.query" 
          @clear="getUserList"
          clearable >
            <el-button slot="append" icon="el-icon-search" @click="getUserList"></el-button>
          </el-input>
        </el-col>
        <el-col :span="4">
          <el-button type="primary" @click="addDialogVisible = true">添加用户</el-button>
        </el-col>
      </el-row>
    
      <!-- 用户列表区 -->
      <el-table :data="userList" boder stripe>
        <el-table-column type="index"></el-table-column>
        <el-table-column label="姓名" prop="username"></el-table-column>
        <el-table-column label="邮箱" prop="email"></el-table-column>
        <el-table-column label="电话" prop="mobile"></el-table-column>
        <el-table-column label="角色" prop="role_name"></el-table-column>
        <el-table-column label="状态" prop="mg_state">
           <template slot-scope="scope">
             <el-switch v-model="scope.row.mg_state" @change="userStateChanged(scope.row)">
             </el-switch>
           </template>

        </el-table-column>
        <el-table-column label="操作" width="180px">
          <template slot-scope="scope">
            <!-- 修改按钮 -->
              <el-button type="primary" icon="el-icon-edit"
               size="mini" @click="showEditDialog(scope.row.id)"></el-button>
            <!-- 删除按钮 -->
            <el-button type="danger" @click="removeUserById(scope.row.id)" icon="el-icon-delete" size="mini"></el-button>
            <!-- 分配角色按钮 -->
            <el-tooltip :enterable="false" effect="dark" content="分配角色" placement="top">
              <el-button type="warning" icon="el-icon-setting" size="mini"
              @click="setRole(scope.row)"></el-button>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>

      <!-- 分页区域 -->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="queryInfo.pagenum"
        :page-sizes="[1, 2, 5, 10]"
        :page-size="queryInfo.pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total">
      </el-pagination>
    </el-card>

    <!-- 添加用户的对话框 -->
    <el-dialog
      title="添加用户"
      :visible.sync="addDialogVisible"
      width="50%"
      @close="addDialogClosed">
      <!-- 内容主体区 -->
      <el-form :model="addForm" :rules="addFormRules" ref="addFormRef" label-width="70px">
        <el-form-item label="用户名" prop="username">
          <el-input type="text" v-model="addForm.username"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input type="password" v-model="addForm.password"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="addForm.email" type="email"></el-input>
        </el-form-item>
        <el-form-item label="手机" prop="mobile">
          <el-input type="number" v-model="addForm.mobile"></el-input>
        </el-form-item>
      </el-form>
      <!-- 底部区域 -->
      <span slot="footer" class="dialog-footer">
        <el-button @click="addDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addUserBtn">确 定</el-button>
      </span>
    </el-dialog>

    <!-- 修改用户的对话框 -->
    <el-dialog
      title="修改用户"
      :visible.sync="editDialogVisible"
      width="50%"
      @close="editDialogClosed">
      <!-- 内容主体区 -->
      <el-form :model="editForm" :rules="editFormRules" ref="editFormRef" label-width="70px">
        <el-form-item label="用户名">
          <el-input v-model="editForm.username" disabled></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="editForm.email" type="email"></el-input>
        </el-form-item>
        <el-form-item label="手机" prop="mobile">
          <el-input v-model="editForm.mobile"></el-input>
        </el-form-item>
      </el-form>
      <!-- 底部区域 -->
      <span slot="footer" class="dialog-footer">
        <el-button @click="editDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="editUserInfo">确 定</el-button>
      </span>
    </el-dialog>

    <!-- 分配角色的对话框 -->
    <el-dialog
      title="分配角色"
      :visible.sync="setRoleDialogVisible"
      width="50%"
      @close="setRoleDialogClose"
      >
      <!-- 内容主体区 -->
      <div>
        <p>当前的用户：{{userInfo.username}}</p>
        <p>当前的角色：{{userInfo.role_name}}</p>
        <p>分配的角色：
          <el-select  v-model="selectedRoleId" placeholder="请选择">
            <el-option
              v-for="item in rolesList"
              :key="item.id"
              :label="item.roleName"
              :value="item.id">
            </el-option>
          </el-select>
        </p>

      </div>
      <!-- 底部区域 -->
      <span slot="footer" class="dialog-footer">
        <el-button @click="setRoleDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="saveRoleInfo">确 定</el-button>
      </span>
    </el-dialog>

  </div>
</template>

<script>
import { userList,stateChange,addUser,editUser,deleteUser,assignUser } from '@/network/api/user.js'
import { rolesList } from '@/network/api/power'

export default {
  data() {
    // 验证邮箱的规则
    var checkEmail = (rule, value, cb) => {
      //验证邮箱的正则表达式
      const regEmail = /^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{2,4}$/
      
      if(regEmail.test(value)) {
        //合法的邮箱
        return cb()
      }
      cb(new Error('请输入合法的邮箱'))
    }

    //验证手机号的规则
    var checkMobile = (rule, value, cb) => {
      //验证手机号的正则表达式
      const regMobile = /^[1][3,4,5,7,8][0-9]{9}$/;
      
      if(regMobile.test(value)) {
        //合法的手机号
        return cb()
      }

      cb(new Error('请输入合法的手机号'))
    }

    return {
      //获取用户列表的参数对象
      queryInfo: {
        query: '',
        // 当前的页数
        pagenum: 1,
        // 当前每页显示多少条数据
        pagesize: 2
      },
      userList: [],
      total: 0,
      //控制添加用户对话框的打开与关闭
      addDialogVisible: false,
      //添加用户的表单数据
      addForm: {
        username: '',
        password: '',
        email: '',
        mobile: ''
      },
      editForm: {
        username: '',
        password: '',
        email: '',
        mobile: ''
      },
      //添加表单的验证规则对象
      addFormRules: {
        username: [
          { required: true, message: '请输入用户名',trigger: 'blur'},
          { min: 3, max: 10, message: '用户名的长度在3-10个字符之间', trigger: 'blur'}
        ],
        password: [
          { required: true, message: '请输入密码',trigger: 'blur'},
          { min: 6, max: 15, message: '用户名的长度在6-15个字符之间', trigger: 'blur'}
        ],
        email: [
          { required: true, message: '请输入邮箱',trigger: 'blur'},
          {validator: checkEmail,trigger: 'blur'}
        ],
        mobile: [
          { required: true, message: '请输入手机',trigger: 'blur'},
          {validator: checkMobile,trigger: 'blur'}

        ]
      },
      //修改表单的验证规则对象
      editFormRules: {
        email: [
          { required: true, message: '请输入邮箱',trigger: 'blur'},
          {validator: checkEmail,trigger: 'blur'}
        ],
        mobile: [
          { required: true, message: '请输入手机',trigger: 'blur'},
          {validator: checkMobile,trigger: 'blur'}
        ]
      },
      editDialogVisible: false, //修改用户对话框显示
      setRoleDialogVisible: false, //控制分配角色对话框的显示与隐藏
      userInfo: {}, //需要被分配角色的用户信息
      rolesList: [], //角色列表
      selectedRoleId: "" //已选中的角色Id值


    }
  },
  created() {
    this.getUserList()
  },
  methods: {
    getUserList() {
      userList(this.queryInfo).then(res => {
        
        if(res.meta.status !== 200) {
          return  this.$message.error('获取用户 列表失败！')
        }
        this.userList = res.data.users;
        this.total = res.data.total
        console.log(this.userList,"用户列表");

      })
    },
    //监听pageSize改变的事件
    handleSizeChange(newSize) {
      this.queryInfo.pagesize = newSize;
      this.getUserList();
    },
    //监听页码值改变的事件
    handleCurrentChange(newPage) {
      this.queryInfo.pagenum = newPage;
      this.getUserList();

    },
    //监听switch开关的转变
    userStateChanged(userInfo) {
      stateChange(userInfo).then(res => {
        if(res.meta.status !== 200) {
          userInfo.mg_state = !userInfo.mg_state;
          return this.$message.error("更新用户状态失败")
        }
        this.$message.success("更改成功");
      })

    },
    //监听添加用户对话框的关闭事件
    addDialogClosed() {
      this.$refs.addFormRef.resetFields();
    },
    //点击按钮，添加新用户
    addUserBtn(){
      this.$refs.addFormRef.validate(valid => {
        if(!valid){

          return;
        } 
        //发起添加用户请求
        addUser(this.addForm).then(res => {
          if(res.meta.status !== 201) {
            this.$message.error("添加用户失败！");
          }
          this.$message.success('添加用户成功！')
          //隐藏添加用户的对话框
          this.addDialogVisible = false;
          //重新获取用户列表数据
          this.getUserList();
        })

      })

    },
    //展示编辑用户的对话框
    showEditDialog(id){
      this.editDialogVisible = true;
      editUser(id).then(res => {
        console.log(res.data);
        if(res.meta.status !== 200) {
            this.$message.error("查询用户数据失败");
        }
        this.editForm = res.data;
      })
    },
    //监听修改用户对话框的关闭事件
    editDialogClosed() {
      this.$refs.editFormRef.resetFields();
    },
    //修改用户信息提交
    editUserInfo() {
      this.$refs.editFormRef.validate(valid => {
        if(!valid) return;
        //发起修改用户信息的请求
        let id = this.editForm.id;
        let params = {
          email: this.editForm.email,
          mobile: this.editForm.mobile
        }
        editUser(id,params).then(res => {
          if(res.meta.status !== 200) {
            this.$message.error("更新用户信息失败！");
          }
          this.editDialogVisible = false;
          this.getUserList();
          this.$message.success("更新用户信息成功");
        })

      })
    },
    //根据用户id删除对应的用户信息
    removeUserById(id) {
      //弹框询问用户是否删除数据
      this.$confirm('此操作将永久删除该用户, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteUser(id).then(res => {
          if(res.meta.status !== 200) {
            this.$message.error("删除用户失败！");
          }
          this.$message.success("删除用户成功！");
          this.getUserList();
        })
      }).catch(() => {
        this.$message.info("已取消删除操作");
      });

    },
    //展示分配角色的对话框
    setRole(userInfo) {
      this.userInfo = userInfo;
      // 在展示对话框之前，获取所有角色的列表
      rolesList().then(res => {
        if(res.meta.status !== 200) {
          return this.$message.error('获取角色列表失败！')
        }
        this.rolesList = res.data;
      })
      this.setRoleDialogVisible = true;
    },
    //点击按钮分配角色
    saveRoleInfo() {
      if(!this.selectedRoleId){
        return this.$message.error("请选择要分配的角色！")
      }
      let data = {
        rid: this.selectedRoleId
      }
      assignUser(this.userInfo.id,data).then(res => {
        if(res.meta.status !== 200) {
          return this.$message.error('更新角色失败！')
        }
        this.$message.success('更新角色成功！');
        this.getUserList();
        this.setRoleDialogVisible = false;

      })
    },
    setRoleDialogClose() {
      this.selectedRoleId = '';
      this.userInfo = {}
    }
  } 
}
</script>

<style lang="less" >
.el-pagination {
  margin-top: 30px;
}
</style>