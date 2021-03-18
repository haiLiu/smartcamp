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
                    <!-- 基础信息 -->
                    <div class="title">
                        <div class="shu"></div>
                        基础信息
                    </div>
                    <el-form-item class="formItem" label="营地照片" prop="name" required>
                        <el-upload
                            class="avatar-uploader"
                            action="https://jsonplaceholder.typicode.com/posts/"
                            :show-file-list="false"
                            :on-success="handleCampSuccess">
                            <img v-if="imageUrl" :src="imageUrl" class="avatar">
                            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                        </el-upload>
                    </el-form-item>
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
                    <el-form-item class="formItem" label="营业执照" prop="name" required>
                        <el-upload
                            class="avatar-uploader"
                            action="https://jsonplaceholder.typicode.com/posts/"
                            :show-file-list="false"
                            :on-success="handleAvatarSuccess">
                            <img v-if="imageUrl" :src="imageUrl" class="avatar">
                            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                        </el-upload>
                    </el-form-item>
                    <el-form-item class="formItem" label="信用注册号" prop="name" required>
                        <el-input type="text" placeholder="请输入管理员姓名" v-model="addCampForm.campManager"/>
                    </el-form-item>
                    <el-form-item class="formItem" label="营地简介" prop="name" required>
                        <el-input type="textarea" maxlength="300" minlength="100" show-word-limit placeholder="请输入营地详情" v-model="addCampForm.campManager"/>
                    </el-form-item>
                  </el-col>
              
                  <el-col :offset="3" :span="10">
                    <!-- 营地特点 -->
                    <div class="title">
                        <div class="shu"></div>
                        营地特点
                    </div>
                    <el-form-item class="formCheck" label="开放时间>" prop="name">
                        <el-checkbox-group v-model="addCampForm.openTime">
                            <el-checkbox v-for="item in openTimeList" :label="item.name" :key="item.id">{{item.name}}</el-checkbox>
                        </el-checkbox-group>
                    </el-form-item>
                    <el-form-item label="开放对象>" prop="name">
                        <el-checkbox-group  v-model="addCampForm.campObject">
                            <el-checkbox v-for="item in campObjectList" :label="item.name" :key="item.id">{{item.name}}</el-checkbox>
                        </el-checkbox-group>
                    </el-form-item>
                    <el-form-item label="营地区位>" prop="name">
                        <el-checkbox-group  v-model="addCampForm.campLocation">
                            <el-checkbox v-for="item in campLocationList" :label="item.name" :key="item.id">{{item.name}}</el-checkbox>
                        </el-checkbox-group>
                    </el-form-item>
                    <el-form-item label="盈利性质>" prop="name">
                        <el-checkbox-group  v-model="addCampForm.profit">
                            <el-checkbox v-for="item in profitList" :label="item.name" :key="item.id">{{item.name}}</el-checkbox>
                        </el-checkbox-group>
                    </el-form-item>
                    <el-form-item label="营地特色>" prop="name">
                        <el-checkbox-group  v-model="addCampForm.features">
                            <el-checkbox v-for="item in featuresList" :label="item.name" :key="item.id">{{item.name}}</el-checkbox>
                        </el-checkbox-group>
                    </el-form-item>
                    <!-- 营地相册 -->
                    <div class="title">
                        <div class="shu"></div>
                        营地相册
                    </div>
                    <el-form-item class="campPicture">
                        <el-upload class="campUpLoad"
                        action="https://jsonplaceholder.typicode.com/posts/"
                        list-type="picture-card"
                        :on-preview="handlePictureCardPreview"
                        :on-remove="handleRemove">
                            <i class="el-icon-plus"></i>
                        </el-upload>
                        <el-dialog :visible.sync="dialogVisible">
                            <img width="100%" :src="dialogImageUrl" alt="">
                        </el-dialog>  
                    </el-form-item>
                    
                  </el-col>
              </el-row>
          </el-form>
          <div class="foot">
              <el-button type="primary" @click="createCamp">立即创建</el-button>
              <el-button>取消</el-button>
          </div>

  
      </el-card>

      
  </div>
</template>

<script>
export default {
    data() {
        return {
            operateTitle: "创建营地",
            imageUrl: '', //营地图片上传地址
            dialogImageUrl: '',//放大图片
            dialogVisible: false,//放大图片弹框
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
        },
        //营地照片上传
        handleCampSuccess(res,file) {
            this.imageUrl = URL.createObjectURL(file.raw);
        },
        //营业执照上传
        handleAvatarSuccess(res, file) {
            this.imageUrl = URL.createObjectURL(file.raw);
        },
        beforeAvatarUpload(file) {
            const isJPG = file.type === 'image/jpeg';
            const isLt2M = file.size / 1024 / 1024 < 2;

            if (!isJPG) {
            this.$message.error('上传头像图片只能是 JPG 格式!');
            }
            if (!isLt2M) {
            this.$message.error('上传头像图片大小不能超过 2MB!');
            }
            return isJPG && isLt2M;
        },
        // 营地相册列表：移除照片
        handleRemove(file, fileList) {
            console.log(file, fileList);
        },
        // 显示营地相册列表
        handlePictureCardPreview(file) {
            this.dialogImageUrl = file.url;
            this.dialogVisible = true;
        },
        //立即创建按钮
        createCamp(){

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
    .title {
      padding: 10px 0px;
      display: flex;
      margin-bottom: 15px;
      justify-content: left;
      align-items: center;
      border-bottom: 1px solid #ccc;
      .shu {
          border: 1px solid #0963EF;
          height: 16px;
          width: 0px;
          margin-right: 5px;
      }
    }
}

.formItem {
    width: 420px;
}
.avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
}
.avatar-uploader .el-upload:hover {
    border-color: #409EFF;
}
.avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 145px;
    height: 145px;
    line-height: 145px;
    text-align: center;
    border: 1px dotted #8c939d;
}
.avatar {
    width: 145px;
    height: 145px;
    display: block;
}
.foot {
    display: flex;
    justify-content: flex-end;
    margin-right: 80px;
}
 
</style>
<style lang="less">
.campPicture {
    margin-left: -100px;
    .el-upload--picture-card {
    background-color: #fbfdff;
    border: 1px dashed #c0ccda;
    border-radius: 6px;
    box-sizing: border-box;
    width: 100px;
    height: 100px;
    line-height: 100px;
    vertical-align: top;
  }

  .el-upload-list--picture-card {
      .el-upload-list__item{
        width: 100px;
        height: 100px;
      }
  }
  
  .el-upload-list__item-actions{
    width: 100px;
    height: 100px;
  }
}

</style>
