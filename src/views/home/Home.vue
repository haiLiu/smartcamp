<template>
  <el-container class="home-container">
    <!-- 头部区域 -->
    <el-header>
      <div>
        <img src="@/assets/img/camplog.png" alt="营地图标" />
        <span>营地管理系统</span>
      </div>
      <el-button type="info" @click="logout">退出</el-button></el-header>
    <!-- 页面主题区域 -->
    <el-container>
      <!-- 侧边栏 -->
      <el-aside :width="isCollapse ? '64px' : '200px'">
        <div class="toggle-button" @click="toggleCollapse"><span class="el-icon-s-fold"></span></div>
        <!-- 侧边栏菜单区域 -->
          <el-menu background-color="#333744" text-color="#fff" 
            active-text-color="#01C5AA" :unique-opened="true"
            :collapse="isCollapse" :collapse-transition="false"
            :router="true" :default-active="activePath">
            <!-- 一级菜单 -->
            <el-submenu :index="item.id +''" v-for="item in menuList" :key="item.id">
              <!-- 一级菜单模板区 -->
              <template slot="title">
                <!-- 图标 -->
                <i :class="iconsObj[item.id]"></i>
                <!-- 文本 -->
                <span>{{item.authName}}</span>
              </template>

              <!-- 二级菜单 -->
              <el-menu-item :index="'/'+subItem.path" v-for="subItem in item.children" 
              :key="subItem.id" @click="saveNavState('/' + subItem.path)">
                <template slot="title">
                  <!-- 图标 -->
                  <i class="el-icon-menu"></i>
                  <!-- 文本 -->
                  <span>{{subItem.authName}}</span>
              </template>
              </el-menu-item>
            </el-submenu>
          </el-menu>
      </el-aside>
      <!-- 右侧内容主题 -->
      <el-main>
        <!-- 路由占位符 -->
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import { menuList } from "@/network/api/home.js"
export default {
  data() {
    return {
      //左侧菜单数据
      menuList: [],
      iconsObj: {
        '125': 'el-icon-user-solid',
        '103': 'el-icon-key',
        '101': 'el-icon-ship',
        '102': 'el-icon-tickets',
        '145': 'el-icon-s-data'
      },
      //是否折叠
      isCollapse: true,
      //被激活的链接地址
      activePath: ''

    }
  },
  created() {
    this.getMenuList()
    this.activePath = window.sessionStorage.getItem('activePath')
  },
  methods: {
    logout() {
      window.sessionStorage.clear();
      this.$router.push("/login");
    },
    //获取所有的菜单
    getMenuList() {
      menuList().then(res => {
        this.menuList = res.data;
        console.log(this.menuList,"菜单列表");
      }).catch(e=>{
        this.$message.error("菜单列表请求失败")
      })
    },
    //左侧菜单栏的折叠与展开
    toggleCollapse() {
      this.isCollapse = !this.isCollapse;
    },
    //保存连接的激活状态
    saveNavState(activePath) {
      window.sessionStorage.setItem('activePath', activePath)
      this.activePath = activePath;
    }
  }

}
</script>

<style lang="less" scoped>
.el-header {
  background-color:#01C5AA;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #fff;
  font-size: 20px;
  > div {
    display: flex;
    align-items: center;
    img {
      height: 49px;
    }
    span {
      margin-left: 15px;
    }

  }
}
.el-aside {
  background-color: #333744;
  .el-menu {
    border-right: none;
  }
}
.el-main {
  background-color: rgb(240,240,240);
}
.home-container {
  height: 100%;
}
.toggle-button{
  background-color: #4a5064;
  font-size: 18px;
  color: #fff;
  text-align: center;
  cursor: pointer;
}

</style>