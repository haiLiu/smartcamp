<template>
  <div>
      <!-- 面包屑导航区域 -->
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: '/goods' }">营地管理</el-breadcrumb-item>
        <el-breadcrumb-item>创建营地</el-breadcrumb-item>
      </el-breadcrumb>

      <!-- 卡片视图 -->
      <el-card class="box-card">
          <!-- 标题部分 -->
          <div class="head">
            <p @click="goBack()">关闭</p>
            <div class="shu"></div>
            <p>{{operateTitle}}</p>
          </div>

          <!-- 表单部分 -->
          <el-form class="addCampForm" :model="addCampForm" :rules="addCampRules" ref="addCampRef" label-width="100px">
              <el-form-item label="营地名称" prop="name" required>
                  <el-input type="text" placeholder="请输入营地名称" v-model="addCampForm.campName"/>
              </el-form-item>
              <el-form-item label="营地管理员" prop="name" required>
                  <el-input type="text" placeholder="请输入营地管理员姓名" v-model="addCampForm.campManager"/>
              </el-form-item>
          </el-form>


      </el-card>

      
  </div>
</template>

<script>
export default {
    data() {
        return {
            operateTitle: "创建营地",
            addCampForm: {
                campName: "", //营地名称
                campManager: "",//营地管理者
                campPhone: null, //营地电话
                campAddress: "", //营地地址
                campStatus: [{id:0,status:"营业"},{id:1,status:"歇业"}], //营地地址
                campDescribe: "", //营地地址
                campLicense: "", //营业执照
                licenseCode: "", //社会信用注册号
                openTime: "", //开放时间
                campObject: "",//开放对象
                campLocation: "",//营地区位
            },
            addCampRules: {},
            addCampRef: ""
        }
    },
    methods: {
        //返回上一页面
        goBack(){
            this.$router.go(-1);
        }
    }

}
</script>

<style  lang="less" scoped>
.left{
		float: left;
	}
.head{
		width: 100%;
		color: #0963EF;
        display: flex;
        align-items: center;
        justify-content: right;
        height: 40px;
        line-height: 40px;
        font-family: SourceHanSansCN-Regular, SourceHanSansCN;
        font-size: 18px;
		cursor: pointer;
        .shu {
            width: 0px;
            height: 16px;
            border: 1px solid #0963EF;
            margin-left: 10px;
            margin-right: 10px;
        }
	}
.addCampForm {
    margin-top: 20px;
    width: 420px
}
</style>