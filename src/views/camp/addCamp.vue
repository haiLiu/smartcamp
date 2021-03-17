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
              <el-row>
                  <el-col :offset="1" :span="6">
                    <el-form-item class="formItem" label="营地名称" prop="name" required>
                        <el-input type="text" placeholder="请输入营地名称" v-model="addCampForm.campName"/>
                    </el-form-item>
                    <el-form-item class="formItem" label="管理员" prop="name" required>
                        <el-input type="text" placeholder="请输入管理员姓名" v-model="addCampForm.campManager"/>
                    </el-form-item>
                    <el-form-item class="formItem" label="营地电话" prop="name" required>
                        <el-input type="text" placeholder="请输入联系电话" v-model="addCampForm.campManager"/>
                    </el-form-item>
                    <el-form-item class="formItem" label="营地地址" prop="name" required>
                        <el-input type="text" placeholder="请输入营地地址" v-model="addCampForm.campManager"/>
                    </el-form-item>
                    <el-form-item class="formItem" label="营地简介" prop="name" required>
                        <el-input type="text" placeholder="请输入营地详情" v-model="addCampForm.campManager"/>
                    </el-form-item>
                    <el-form-item class="formItem" label="营业执照" prop="name" required>
                        <el-input type="text" placeholder="请输入管理员姓名" v-model="addCampForm.campManager"/>
                    </el-form-item>
                    <el-form-item class="formItem" label="信用注册号" prop="name" required>
                        <el-input type="text" placeholder="请输入管理员姓名" v-model="addCampForm.campManager"/>
                    </el-form-item>
                  </el-col>
              
                  <el-col :offset="1" :span="10">
                    <el-form-item label="开放时间" prop="name">
                        <span>1</span>
                        <el-checkbox-group v-model="addCampForm.openTime">
                            <el-checkbox v-for="item in openTimeList" :label="item.name" :key="item.id">{{item.name}}</el-checkbox>
                        </el-checkbox-group>
                    </el-form-item>
                    <el-form-item label="开放对象" prop="name">
                        <el-checkbox-group  v-model="addCampForm.campObject">
                            <el-checkbox v-for="item in campObjectList" :label="item.name" :key="item.id">{{item.name}}</el-checkbox>
                        </el-checkbox-group>
                    </el-form-item>
                    <el-form-item label="营地区位" prop="name">
                        <el-checkbox-group  v-model="addCampForm.campLocation">
                            <el-checkbox v-for="item in campLocationList" :label="item.name" :key="item.id">{{item.name}}</el-checkbox>
                        </el-checkbox-group>
                    </el-form-item>
                    <el-form-item label="盈利性质" prop="name">
                        <el-checkbox-group  v-model="addCampForm.profit">
                            <el-checkbox v-for="item in profitList" :label="item.name" :key="item.id">{{item.name}}</el-checkbox>
                        </el-checkbox-group>
                    </el-form-item>
                    <el-form-item label="营地特色" prop="name">
                        <el-checkbox-group  v-model="addCampForm.features">
                            <el-checkbox v-for="item in featuresList" :label="item.name" :key="item.id">{{item.name}}</el-checkbox>
                        </el-checkbox-group>
                    </el-form-item>
                  </el-col>
              </el-row>

              
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
                campDescribe: "", //营地简介
                campLicense: "", //营业执照
                licenseCode: "", //社会信用注册号
                openTime: [],//开放时间
                campObject: [],//开放对象
                campLocation: [],//营地区位
                profit: [], //盈利性质
                features: [],//特点

            },
            addCampRules: {},
            addCampRef: "",
            openTimeList: [{name:"临时营地",id: 0},{name:"日间营地",id: 1},
                {name:"周末营地",id: 2},{name:"假日营地",id: 3}], //开放时间
            campObjectList:  [{name:"团体型营地",id: 0},{name:"家庭型营地",id: 1},
                {name:"学生营地",id: 2},{name:"儿童营地",id: 3},{name:"亲子营地",id: 4}],//开放对象
            campLocationList: [{name:"都市型营地",id: 0},{name:"近郊型营地",id: 1},
                {name:"过境型营地",id: 2},{name:"风景区营地",id: 3},{name:"度假型营地",id: 4}],//营地区位
            profitList: [{name:"公益性营地",id: 0},{name:"商业性营地",id: 1}], //盈利性质
            featuresList: [{name:"运动型营地",id: 0},{name:"教育训练营地",id: 1},
                {name:"娱乐型营地",id: 2},{name:"休闲汽车营地",id: 3},{name:"团建型营地",id: 4}],//营地特点
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
}
.formItem {
    width: 420px;
}
.el-form-item__label {
    font-weight: bold;
}
</style>