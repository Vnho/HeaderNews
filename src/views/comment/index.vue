<template>
  <div class="comment">
    <!-- 外层卡片 -->
    <el-card class="box-card">
      <!-- 标题 -->
      <div slot="header" class="clearfix">
        <span>评论管理</span>
      </div>

      <!-- 表格表单 -->
      <el-table :data="commentData" style="width: 100%">
        <el-table-column prop="date" label="标题" width="180"></el-table-column>
        <el-table-column prop="name" label="总评论数据" width="180"></el-table-column>
        <el-table-column prop="address" label="粉丝评论数量"></el-table-column>
        <el-table-column prop="address" label="评论状态"></el-table-column>
        <el-table-column prop="address" label="操作"></el-table-column>
      </el-table>

      <!-- 分页插件 -->
      <el-pagination
       style="text-align:center;margin-top:20px;"
       background=""
       layout="prev, pager, next"
       :total="1000">
      </el-pagination>
    </el-card>
  </div>
</template>

<script>
export default {
  data () {
    return {
      commentData: [

      ]
    }
  },
  created () {
    this.loadComments()
  },

  methods: {
    loadComments () {

    }
  }
}
</script>

<style lang="less" scope>
</style>
