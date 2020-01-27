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
        <img src="../assets/img/avatar.jpg" alt="" class="user_img">
        <el-dropdown trigger="click">
          <span class="el-dropdown-link">下拉菜单
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

<script>
export default {
  data () {
    return {

    }
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
    }
  }
}
</script>
