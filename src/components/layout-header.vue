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
            <el-dropdown-item>退出</el-dropdown-item>
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

  }
}
</script>
