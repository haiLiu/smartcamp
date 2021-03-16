<template>
  <div>
      <!-- 面包屑导航区域 -->
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>营地管理</el-breadcrumb-item>
        <el-breadcrumb-item>营地列表</el-breadcrumb-item>
      </el-breadcrumb>

      <!-- 卡片视图 -->
      <el-card class="box-card">
      <!-- 搜索与添加区域 -->
        <el-row :gutter="20">
          <el-col :span="7">
            <el-input placeholder="请输入内容" 
            v-model="queryInfo.query" 
            @clear="getCampList"
            clearable >
                <el-button slot="append" icon="el-icon-search" @click="getCampList"></el-button>
            </el-input>
          </el-col>
          <el-col :span="4">
            <el-button type="primary" @click="goAddCamp()">创建营地</el-button>
          </el-col>
        </el-row>
    </el-card>
  </div>
</template>

<script>
import { campList } from '@/network/api/camp.js'

export default {
    data () {
      return {
        //获取用户列表的参数对象
        queryInfo: {
            query: '',
            // 当前的页数
            pagenum: 1,
            // 当前每页显示多少条数据
            pagesize: 2
        },
        campList: [],
        total: 0,
      }
    },
    methods: {
        //获取营地列表
      getCampList() {
        /* campList(this.queryInfo).then(res => {
          if(res.meta.status !== 200) {
            return  this.$message.error('获取营地列表失败！')
          }
          this.campList = res.data.users;
          this.total = res.data.total;

        }) */
      },
      //跳到创建营地页面
      goAddCamp() {
          this.$router.push('/params')
      }
     }

}
</script>

<style  lang="less" scoped>

</style>