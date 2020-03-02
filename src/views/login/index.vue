<template>
<!-- 登陆页面 -->
  <div class="login">
    <!-- element卡片组件 -->
    <el-card class="login-card">
      <!-- 登陆标题 -->
      <div class="title">
        <img src="../../assets/img/logo_index.png" alt="">
      </div>
      <!-- 登陆表单 -->
      <el-form style="margin-top:30px" ref="loginForm" :model="loginForm" :rules="loginRules">
        <!-- 手机号 -->
        <el-form-item prop="mobile">
          <el-input placeholder="请输入您的手机号" v-model="loginForm.mobile"></el-input>
        </el-form-item>
        <!-- 验证码和获取按钮 -->
        <el-form-item prop="code">
          <!-- 验证码输入 -->
          <el-input
           style="width:280px"
           placeholder="请输入您的验证码"
           v-model="loginForm.code"
          ></el-input>
          <!-- 获取验证码 -->
          <el-button style="float:right" plain>获取验证码</el-button>
        </el-form-item>
        <!-- 协议同意复选框 -->
        <el-form-item prop="itemChecked">
          <el-checkbox v-model="loginForm.itemChecked">我已阅读并同意用户协议及条款</el-checkbox>
        </el-form-item>
        <!-- 登录按钮 -->
        <el-form-item>
          <el-button style="width:100%" type="primary" @click="login">登陆</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
export default {
  name: 'Login',
  data () {
    return {
      // 表单数据
      loginForm: {
        mobile: '',
        code: '',
        itemChecked: false
      },

      // 验证规则
      loginRules: {
        mobile: [
          { required: true, message: '请输入手机号' },
          { pattern: /^1[3456789]\d{9}$/, message: '请输入正确的手机号' }
        ],
        code: [
          { required: true, message: '请输入验证码' },
          { pattern: /^\d{6}$/, message: '请输入正确的验证码' }
        ],
        itemChecked: [
          {
            validator: function (rules, value, callback) {
              if (value) {
                callback()
              } else {
                callback(new Error('您需要同意本协议才可登陆'))
              }
            }
          }
        ]
      }
    }
  },

  methods: {
    login () {
      this.$refs.loginForm.validate(isOK => {
        if (isOK) {
          this.$axios({
            method: 'POST',
            url: '/authorizations',
            data: this.loginForm
          }).then(res => {
            window.localStorage.setItem('user-token', res.data.data.token)
            this.$router.push('/layout')
          }).catch(() => {
            this.$message({
              type: 'warning',
              message: '手机号或验证码错误'
            })
          })
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
.login {
 background-image: url("../../assets/img/login_bg.jpg");
 background-size: cover;
 height: 100vh;
 display: flex;
 justify-content: center;
 align-items: center;
 .title {
  text-align: center;
 }
 .login-card {
  width: 440px;
  height: 360px;
 }
}
</style>
