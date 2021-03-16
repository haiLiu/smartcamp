<template>
  <div class="login_container">
    <div class="login_box">
      <!-- 图标区域 -->
      <div class="logo_box">
        <img src="@/assets/img/logo.png">
      </div>
      <!-- 标题 -->
      <div class="logo_title">
        营地管理系统
      </div>
      <!-- 注册表单区域 -->
      <el-form :model="registerForm" :rules="registerFormRules" ref="registerFormRef" label-width="0px" class="login_form">
        <!-- 账号 -->
        <el-form-item prop="username">
          <el-input v-model="registerForm.username" placeholder="请输入昵称" prefix-icon="el-icon-user" clearable></el-input>
        </el-form-item>
        <!-- 密码 -->
        <el-form-item prop="password">
          <el-input type="password" placeholder="请输入密码" v-model="registerForm.password" prefix-icon="el-icon-lock" clearable></el-input>
        </el-form-item>
        <!-- 确认密码 -->
        <el-form-item prop="checkPassword">
          <el-input type="password" placeholder="请输入密码" v-model="registerForm.checkPassword" prefix-icon="el-icon-lock" clearable></el-input>
        </el-form-item>
        <!-- 手机 -->
        <el-form-item prop="phone">
          <el-input type="text"  placeholder="请输入手机号码" v-model="registerForm.phone" prefix-icon="el-icon-phone" clearable></el-input>
        </el-form-item>
        <!-- 邮箱 -->
        <el-form-item prop="email">
          <el-input type="email" placeholder="请输入邮箱"  v-model="registerForm.email" prefix-icon="el-icon-lock" clearable></el-input>
        </el-form-item>
        <!-- 用户还是营长 -->
        <el-form-item label="用户类型：" label-width="100px" prop="type">
            <el-radio-group  v-model="registerForm.type" >
                <el-radio label="普通用户"></el-radio>
                <el-radio label="营地管理员"></el-radio>
            </el-radio-group>
        </el-form-item>
        <!-- 按钮区域 -->
        <el-form-item>
          <el-button class="btnRegister" @click="doRegister" type="primary">注册</el-button>
        </el-form-item>
        <el-form-item align="right">
          <a class="btnLogin" href="#" @click="goLogin">去登录</a>
        </el-form-item>
        
      </el-form>
     
    </div>
  </div>
</template>

<script>
import { login }  from '@/network/api/login'

export default {
  data() {
    // 验证密码的正则
    var pass = (rule, value, callback) => {
        // 只能由数字，字母组成，不能有特殊符号,并且长度限制在8-10位
        const regPass = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,10}$/;
        if (regPass.test(value)) {
            console.log(regPass.test(value))
            return callback()
        }
        callback(new Error('必须是且包含大小写字母，数字，长度为8-10位'));
    };
    
    // 验证确认密码的正则
    var checkPass = (rule, value, callback) => {
        if (value === '') {
            callback(new Error('请再次输入密码'));
        } else if (value !== this.registerForm.password) {
            callback(new Error('两次输入密码不一致!'));
        } else {
            callback();
        }
    };

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
      cb(new Error('请输入11位手机号'))
    }
    return {
      //这是登录表单的数据绑定对象
      registerForm: {
        type: "",
        username: "",
        password: "",
        checkPassword: "",
        email: "",
        phone: ""
      },
      //这是表单的验证规则对象
      registerFormRules: {
        //验证用户类型是否合法
        type: [
            { required: true, message: '请选择用户类型', trigger: 'blur' }
        ],
        //验证用户名是否合法
        username: [
            { required: true, message: '请输入账户', trigger: 'blur' },
            { min: 3, max: 10, message: '长度在 3 到 10个字符', trigger: 'blur' },
        ],
        //验证密码是否合法
        password: [
            { validator: pass, trigger: 'blur' }
        ],
        //验证确认密码是否合法
        checkPassword: [
            {  validator: checkPass, trigger: 'blur' }
        ],
        //验证邮箱是否合法
        email: [
            { validator: checkEmail, trigger: 'blur' }
        ],
        //验证手机号是否合法
        phone: [
            { validator: checkMobile, trigger: 'blur' }
        ],

      }
    }
  },
  methods: {
    doRegister() {
      this.$refs.registerFormRef.validate(valid =>{
        if(!valid) return;
        login(this.registerForm).then(res => {
          this.$message.success("登录成功");
          var resToken = res.data.token;
          //1.将登录成功之后的token,保存到客户端的sessionStorage中
            //   1.1 项目中除了登录之外的其他API接口,必须在登录之后才能访问
            //   2.2 token只应当在当前网站打开期间生效,所以将token保存在seesionStorage中
          window.sessionStorage.setItem("token",resToken);
          // 2. 通过编程式导航跳转到后台主页,路由地址式home  
          this.$router.push('home');

        })
      })
    },
    goLogin() {
        this.$router.push('login');
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
  height: 600px;
  background-color: #fff;
  border-radius: 3px;
  position: relative;

  .logo_box{
    height: 80px;
    width: 80px;
    border-radius: 50%;
    padding: 10px;
    box-shadow: 0 0 10px #ddd;
    position: absolute;
    left: 50%;
    transform: translate(-50%,-66%);
    img{
      width: 100%;
      height: 100%;
      border-radius: 50%;
      background-color: #fff;
    } 
  }
  .logo_title{
    display: flex;
    justify-content: center;
    margin-top: 45px;
    font-size: 22px;
    font-weight: bold;
    color: #2b4b6b;
  }
  .login_form{
    position: absolute;
    bottom: 0px;
    width: 100%; 
    padding: 0px 40px;
    box-sizing: border-box;

  }
  .btnRegister{
    width: 100%;
  }
  .activeTab{
    color: #0963EF;
  }
  .btnLogin{
    text-decoration: none;
    color: #409EFF;
  }
  a:hover{
    color: #2b4b6b;
  }
}



</style>