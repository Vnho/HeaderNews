<template>
  <!-- 文章列表 -->
  <div class="article">
    <!-- 筛选文章区域 -->
    <el-card class="articles">
      <!-- 头部显示 -->
      <div slot="header" class="clearfix">
        <span>全部图文</span>
      </div>
      <!-- 表单查询 -->
      <el-form ref="ArticleManage" :model="ArticleForm" label-width="80px">
        <!-- 文章状态 -->
        <el-form-item label="文章状态">
          <el-radio-group v-model="ArticleForm.status">
            <el-radio label="全部"></el-radio>
            <el-radio label="草稿"></el-radio>
            <el-radio label="待审核"></el-radio>
            <el-radio label="审核通过"></el-radio>
            <el-radio label="审核失败"></el-radio>
          </el-radio-group>
        </el-form-item>
        <!-- 频道列表 -->
        <el-form-item label="频道列表">
          <el-select v-model="ArticleForm.channel" placeholder="请选择文章频道">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <!-- 发布时间 -->
        <el-form-item label="发布时间">
          <div class="block">
            <el-date-picker
              v-model="ArticleForm.times"
              type="daterange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
            ></el-date-picker>
          </div>
        </el-form-item>
        <!-- 提交查询 -->
        <el-form-item>
          <el-button type="primary" @click="loadArticles">查询</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <!-- 文章列表 -->
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>共找到1354563条符合的数据</span>
      </div>
      <el-table :data="articleData" style="width: 100%">
        <el-table-column prop="date" label="封面" width="180"></el-table-column>
        <el-table-column prop="name" label="标题" width="180"></el-table-column>
        <el-table-column prop="address" label="状态"></el-table-column>
        <el-table-column prop="address" label="发布日期"></el-table-column>
        <el-table-column prop="address" label="操作"></el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<style lang="less">
</style>

<script>
export default {
  name: 'Article',
  data () {
    return {
      ArticleForm: {
        status: '', // 文章状态
        channel: '', // 频道列表
        times: '' // 发布时间
      },
      articleData: [] // 文章展示列表
    }
  },

  created () {
    this.loadArticles()
  },

  methods: {
    loadArticles () {
      const token = window.localStorage.getItem('user-token')
      this.$axios({
        type: 'GET',
        url: '/articles',
        headers: {
          Authorization: `Bearer ${token}`
        }
      }).then(res => {
        console.log(res)
      })
    }
  }
}
</script>
