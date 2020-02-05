<template>
  <!-- 首页 -->
  <el-container>
    <!-- 左侧导航栏 -->
    <el-aside class="left_header" style="width:220px">
      <!-- 头部标题 -->
      <div class="menu_title">
        <img src="../../assets/img/logo_admin.png" alt="">
      </div>
      <!-- 菜单选项 -->
      <el-menu
        background-color="#353b4e"
        text-color="#adafb5"
        active-text-color="#ffd04b"
        style="width:221px"
        :router="true"
      >
        <el-menu-item index="/layout">
          <span slot="title">首页</span>
        </el-menu-item>
        <el-submenu index="2">
          <template slot="title">
            <span>内容管理</span>
          </template>
          <el-menu-item-group>
            <el-menu-item index="/article">内容列表</el-menu-item>
            <el-menu-item index="1-2">发布文章</el-menu-item>
            <el-menu-item index="1-3">评论列表</el-menu-item>
            <el-menu-item index="1-4">素材管理</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
        <el-submenu index="3">
          <template slot="title">
            <span>粉丝管理</span>
          </template>
          <el-menu-item-group>
            <el-menu-item index="2-1">图文数据</el-menu-item>
            <el-menu-item index="2-2">粉丝概况</el-menu-item>
            <el-menu-item index="2-3">粉丝画像</el-menu-item>
            <el-menu-item index="2-4">粉丝自述</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
        <el-menu-item index="4">
          <span slot="title">账户信息</span>
        </el-menu-item>
      </el-menu>
    </el-aside>
    <!-- 右侧主体内容 -->
    <el-container>
      <!-- 头部 -->
      <el-header>
        <layout-header></layout-header>
      </el-header>
      <!-- 内容 -->
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<style lang="less">
.left_header {
 background-color: #323745;
 height: 100vh;
 overflow: hidden;
 .menu_title {
  text-align: center;
  padding: 15px 0;
  background-color: #2e2f32;
  img {
   height: 30px;
  }
 }
}
</style>

<script>
import layoutHeader from '../../components/layout-header'

export default {
  components: {
    layoutHeader
  }
}
</script>
