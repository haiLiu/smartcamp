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
      <el-card class="campListCard">
        <!-- 营地列表 -->
        <div class="campList">
          <div class="campItem" v-for="(item, index) in campList" :key="item.campLicense" >
            <el-card :body-style="{ padding: '0px' }">
              <img @click="goDetail(item)" :src="item.campPicture" class="image">
              <div class="campFont">
                <div class="campTitle">
                  <span>{{item.campName}}</span>
                  <el-button type="text" @click="delectCamp(index)" class="el-icon-delete-solid deleteIcon"></el-button>
                </div>
                <div class="bottom clearfix">
                  <div class="campDescribe">{{ item.campDescribe }}</div>
                  <div class="option">
                    <div class="switchCamp">
                      <span class="yingye" v-if="item.campStatus == true">&nbsp;营业</span>
                      <span class="xieye" v-else>歇业</span>
                      <el-switch size="mini" style="margin-left:10px;" v-model="item.campStatus">
                      </el-switch>
                    </div>
                    <el-button @click="goDetail(item)" type="text" class="button">进入门店</el-button>
                  </div>
                </div>
              </div>
            </el-card>
          </div>
        </div>
        
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
        campList: [
          {
            campPicture: "https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=1433478897,3996123822&fm=26&gp=0.jpg", //营地照片
            campName: "小鹿定向", //营地名称
            campManager: "西西",//营地管理者
            campPhone: 123456789, //营地电话
            campAddress: "江苏南京建邺区", //营地地址
            campStatus: true, //营地状态
            campDescribe: "定向越野进入大自然", //营地简介
            campLicense: "111", //营业执照
            licenseCode: "111", //社会信用注册号
            openTime: [], //开放时间
            campObject: ["团体型营地","学生营地"], //开放对象
            campLocation: [], //营地区位
            profit: [], //盈利性质
            features: [], //特点
            campAlbum: [], //营地相册

          }],
        total: 0,
        currentDate: new Date(),
      }
    },
    created(){
      this.getCampList();

    },
    methods: {
        //获取营地列表
      getCampList() {
        if(this.$route.query){
          this.campList.push(this.$route.query);
          console.log(this.campList,"campList");

        }
        
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
      },
      //删除营地
      delectCamp(index) {
        this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.campList.splice(index,1);
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
      },
      goDetail(camp) {
        this.$router.push({path: 'categories',query:camp});

      }
    },   

}
</script>

<style  lang="less" scoped>
.campListCard {
  margin-top: 20px;
  padding-bottom: 20px;
  padding-right: 0px;
  .campList{
    display: grid;
    grid-template-columns: repeat(5, 320px);
    grid-template-rows: 300px 300px 300px;
    grid-gap: 20px 20px;
    
  }
}

.campDescribe {
  font-size: 13px;
  //color: #999;
  padding-bottom: 10px;
  width: 100%;/*定义块元素的宽度*/
  white-space: nowrap;/*内容超宽后禁止换行显示*/
  overflow: hidden;/*超出部分隐藏*/
  text-overflow:ellipsis;/*文字超出部分以省略号显示*/
}
.campFont {
  padding-left: 15px;
  padding-right: 15px;
  padding-top: 15px;
}
.option {
  display: flex;
  justify-content: space-between;
}
  
.bottom {
  margin-top: 10px;
  margin-bottom: 15px;
  line-height: 12px;
}

.button {
  padding: 0;
  float: right;
}

.image {
  width: 100%;
  display: block;
}
.image:hover {
  cursor:pointer;
}
.clearfix:before,
.clearfix:after {
    display: table;
    content: "";
}
.switchCamp {
  font-size: 13px;
}
.yingye {
  color: #409EFF;
}
.xieye {
  color: #999;
}
.campTitle {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.deleteIcon {
  font-size: 16px;
  text-decoration: none;
}
.deleteIcon:hover {
  color: #f56c6c;
}

  
</style>

