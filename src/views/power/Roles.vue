<template>
  <div>
    <!-- 面包屑导航区域 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>权限管理</el-breadcrumb-item>
      <el-breadcrumb-item>角色列表</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- 卡片视图 -->
    <el-card>
      <!-- 添加角色按钮区域 -->
      <el-row>
        <el-col>
          <el-button type="primary">添加角色</el-button>
        </el-col>
      </el-row>


      <el-table :data="rolesList" border stripe>
        <!-- 展开列 -->
        <el-table-column type="expand">
          <template slot-scope="scope">
            <el-row :class="['bdbottom', i1 === 0 ? 'bdtop' : '' ,'vcenter']" v-for="(item1, i1) in scope.row.children" :key="item1.id">
              <!-- 渲染一级权限 -->
              <el-col :span="5">
                <el-tag closable @close="removeRightById(scope.row,item1.id)" >{{item1.authName}}</el-tag>
                <i class="el-icon-caret-right"></i>
              </el-col>
              <!-- 渲染二级和三级的权限 -->
              <el-col :span="19">
                <!-- 通过for循环嵌套循环二级权限 -->
                <el-row :class="[i2 === 0 ? '' : 'bdtop' ,'vcenter']" v-for="(item2,i2) in item1.children" :key="item2.id">
                  <el-col :span="6">
                    <el-tag closable @close="removeRightById(scope.row,item2.id)"  type="success">{{item2.authName}}</el-tag>
                    <i class="el-icon-caret-right"></i>

                  </el-col>
                  <el-col :span="18">
                    <el-tag closable @close="removeRightById(scope.row,item3.id)"  type="warning" v-for="(item3,i3) in item2.children" :key="item3.id">
                      {{item3.authName}}
                    </el-tag>
                  </el-col>
                </el-row>
              </el-col>
            </el-row>
          </template>
        </el-table-column>
        <!-- 索引列 -->
        <el-table-column type="index"></el-table-column>
        <el-table-column label="角色名称" prop="roleName"></el-table-column>
        <el-table-column label="角色描述" prop="roleDesc"></el-table-column>
        <el-table-column label="操作" width="300px">
          <template slot-scope="scope">
            <el-button size="mini" type="primary" icon="el-icon-edit">编辑</el-button>
            <el-button size="mini" type="danger" icon="el-icon-delete">删除</el-button>
            <el-button size="mini" type="warning" icon="el-icon-setting" @click="showSetRightDialog(scope.row)">分配权限</el-button>

          </template>
        </el-table-column>
      </el-table>

       <!-- 分页区域 -->
     <!--  <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="queryInfo.pagenum"
        :page-sizes="[1, 2, 5, 10]"
        :page-size="queryInfo.pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total">
      </el-pagination> -->
    </el-card>

    <!-- 分配权限的对话框 -->
    <el-dialog
      title="分配权限"
      :visible.sync="setRightDialogVisible"
      width="50%">
      <!-- 树形空间 -->
      <el-tree :data="rightsList" 
        :props="treeProps" 
        show-checkbox 
        node-key="id"
        :default-expand-all="true"
        :default-checked-keys="defKeys"></el-tree>
      <span slot="footer" class="dialog-footer">
        <el-button @click="setRightDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="setRightDialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>

  </div>
</template>

<script>
import { rolesList,rightsTree,deleteRight } from '@/network/api/power.js'

export default {
  data() {
    return {
      //角色列表
      rolesList: [],
      //获取用户列表的参数对象
      queryInfo: {
        query: '',
        // 当前的页数
        pagenum: 1,
        // 当前每页显示多少条数据
        pagesize: 2
      },
      total: 0,
      //控制分配权限对话框的显示与隐藏
      setRightDialogVisible: false,
      //所有权限的数据
      rightsList: [],
      //树形控件的属性绑定对象
      treeProps: {
        label: 'authName',
        children: 'children'
      },
      //默认选中的节点Id值数组
      defKeys: []
    }
  },
  created() {
    //获取所有的权限
    this.getRolesList()
  },
  methods: {
    //获取角色列表
    getRolesList() {
      rolesList().then(res => {
        if(res.meta.status != 200) {
          return this.$message.error("获取列表失败");
        }
        this.rolesList = res.data;
      })

    },

    //监听pageSize改变的事件
    handleSizeChange(newSize) {
      this.queryInfo.pagesize = newSize;
      this.getRightsList();
    },
    //监听页码值改变的事件
    handleCurrentChange(newPage) {
      this.queryInfo.pagenum = newPage;
      this.getRightsList();

    },
    //删除三级权限标签
    removeRightById(role,rightId) {
      //弹框提示用户是否要删除
       this.$confirm('此操作将删除该权限, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          deleteRight(role.id,rightId).then(res => {
            if(res.meta.status !==200 ) {
              return this.$message.error("删除失败");
            }
            this.$message.success("删除成功")
            //this.getRightsList();
            role.children = res.data;
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });

    },
    //展示分配权限的对话框
    showSetRightDialog(role) {
      //获取所有权限的数据
      rightsTree().then(res => {
        if(res.meta.status !==200 ) {
          return this.$message.error("获取权限失败");
        }
        this.rightsList = res.data;

        //递归获取三级节点的id
        console.log(role,"row");
        this.getLeafKeys(role,this.defKeys)
        this.setRightDialogVisible = true;



      })

    },
    //通过递归的形式，获取角色下所有的三级权限的id，并保存到defKeys数组中
    getLeafKeys(node,arr) {
      if(!node.children){
        //如果当前node节点不包含children属性，则是三级节点
        return arr.push(node.id);
      }

      node.children.forEach(element => {
        this.getLeafKeys(element,arr)  
      });
    }
  }

}
</script>

<style lang="less" scoped>
.el-tag {
  margin: 7px;
}

.bdtop {
  border-top: 1px solid #eee;
}

.bdbottom {
  border-bottom: 1px solid #eee;
}

.vcenter {
  display: flex;
  align-items: center;
}

</style>