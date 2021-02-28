<template>
  <div class="login_container">
    <div class="login_box">
      <!-- 图标区域 -->
      <div class="logo_box">
        <img src="@/assets/img/logo.png">
      </div>
      <!-- 登录表单区域 -->
      <el-form :model="loginForm" :rules="loginFormRules" ref="loginFormRef" label-width="0px" class="login_form">
        <!-- 账号 -->
        <el-form-item prop="username">
          <el-input v-model="loginForm.username" prefix-icon="el-icon-user" clearable></el-input>
        </el-form-item>
        <!-- 密码 -->
        <el-form-item prop="password">
          <el-input type="password" v-model="loginForm.password" prefix-icon="el-icon-lock" clearable></el-input>
        </el-form-item>
        <!-- 按钮区域 -->
        <el-form-item class="btns">
          <el-button @click="loginBtn" type="primary">登录</el-button>
          <el-button @click="resetLoginForm(loginForm)" type="info">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { login }  from '@/network/api/login'

export default {
  data() {
    return {
      //这是登录表单的数据绑定对象
      loginForm: {
        username: "user",
        password: "123456"
      },
      //这是表单的验证规则对象
      loginFormRules: {
        //验证用户名是否合法
        username: [
           { required: true, message: '请输入账户', trigger: 'blur' },
           { min: 3, max: 10, message: '长度在 3 到 10个字符', trigger: 'blur' }
        ],
        //验证密码是否合法
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, max: 15, message: '长度在 6 到 15个字符', trigger: 'blur' }
        
        ]

      }
    }
  },
  methods: {
    //点击重置按钮,重置登录表单
    resetLoginForm() {
      this.$refs.loginFormRef.resetFields();
    },
    loginBtn() {
      this.$refs.loginFormRef.validate(valid =>{
        if(!valid) return;
        login().then(res => {
          this.$message.success("登录成功");
          console.log(res);
          var resToken = "lhy"
          //1.将登录成功之后的token,保存到客户端的sessionStorage中
            //   1.1 项目中除了登录之外的其他API接口,必须在登录之后才能访问
            //   2.2 token只应当在当前网站打开期间生效,所以将token保存在seesionStorage中
          window.sessionStorage.setItem("token",resToken);
          // 2. 通过编程式导航跳转到后台主页,路由地址式home  
          this.$router.push('home');

        })
      })
    }
  }

}
</script>

<style lang="less" scoped>
.login_container{
  // background-image: url('../../assets/img/loginbg.jpg');
  // background-size: 100%;
  background-color: #2b4b6b;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.login_box{
  width: 450px;
  height: 300px;
  background-color: #fff;
  border-radius: 3px;
  position: relative;

  .logo_box{
    height: 130px;
    width: 130px;
    border-radius: 50%;
    padding: 10px;
    box-shadow: 0 0 10px #ddd;
    position: absolute;
    left: 50%;
    transform: translate(-50%,-50%);
    img{
      width: 100%;
      height: 100%;
      border-radius: 50%;
      background-color: #fff;
    } 
  }
  .login_form{
    position: absolute;
    bottom: 0px;
    width: 100%;
    padding: 0px 20px;
    box-sizing: border-box;

  }
  .btns {
    display: flex;
    justify-content: flex-end;
  }
}



</style>