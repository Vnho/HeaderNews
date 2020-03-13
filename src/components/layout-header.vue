<template>
  <!-- 主体区域头部 -->
  <div>
    <el-row :span="6" justify="space-between" align="middle" type="flex" style="padding:20px 0;">
      <!-- 左侧 -->
      <el-col class="left">
        <i class="el-icon-s-fold"></i>
        <span>江苏传智播客教育科技股份有限公司</span>
      </el-col>
      <!-- 右侧 -->
      <el-col :span="4" class="right">
        <img :src="userMessage.photo" width="50" height="50" alt="" class="user_img">
        <el-dropdown trigger="click">
          <span class="el-dropdown-link">{{userMessage.name}}
            <i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>个人信息</el-dropdown-item>
            <el-dropdown-item>git地址</el-dropdown-item>
            <el-dropdown-item @click.native="logOut">退出</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import eventBus from '@/utils/event-bus.js'

export default {
  name: 'LayoutHeader',

  data () {
    return {
      userMessage: {} // 用户信息
    }
  },

  created () {
    // 加载用户信息
    this.loadUser()

    // 事件监听
    eventBus.$on('update-user', user => {
      this.userMessage.name = user.name
      this.userMessage.photo = user.photo
    })
  },

  methods: {
    // 退出登录
    logOut () {
      this.$confirm('您将退出登录，是否继续？', '退出提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        window.localStorage.removeItem('user-token')
        this.$router.push('/login')
        this.$message({
          type: 'success',
          message: '退出登录成功'
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消退出登录'
        })
      })
    },

    // 获取用户信息
    loadUser () {
      this.$axios({
        method: 'GET',
        url: '/user/profile'
      })
        .then((res) => {
          this.userMessage = res.data.data
        })
    }
  }
}
</script>

<style lang="less" scoped>
.left {
 display: flex;
 align-items: center;
 i {
  font-size: 24px;
 }
}
.right {
 display: flex;
 align-items: center;
 .user_img {
  border-radius: 50%;
  margin-right: 10px;
 }
}
</style>
