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
        <!-- 标题 -->
        <el-table-column
         prop="title"
         label="标题"
         width="180">
        </el-table-column>

        <!-- 总评论数据 -->
        <el-table-column
         prop="total_comment_count"
         label="总评论数据"
         width="180">
        </el-table-column>

        <!-- 粉丝评论数量 -->
        <el-table-column
         prop="fans_comment_count"
         label="粉丝评论数量">
        </el-table-column>

        <!-- 评论状态 -->
        <el-table-column label="评论状态">
          <template slot-scope="scope">
            <el-switch
              v-model="scope.row.comment_status"
              active-color="#13ce66"
              inactive-color="#ff4949"
              @change="statusChange(scope.row)"
            ></el-switch>
          </template>
        </el-table-column>

        <!-- 操作 -->
        <el-table-column
         prop="address"
         label="操作">
          <el-button
           type="primary"
           round
           size="mini"
           icon="el-icon-s-tools"
           >修改</el-button>
        </el-table-column>
      </el-table>

      <!-- 分页插件 -->
      <el-pagination
        style="text-align:center;margin-top:20px;"
        :background="true"
        layout="prev, pager, next"
        :total="totalComment"
        @current-change="changePage"
      ></el-pagination>
    </el-card>
  </div>
</template>

<script>
export default {
  name: 'Comment',

  data () {
    return {
      commentData: [], // 评论数据
      totalComment: null // 全部评论
    }
  },
  created () {
    this.loadComments()
  },

  methods: {
    // 加载评论
    loadComments (page) {
      this.$axios({
        method: 'GET',
        url: '/articles',
        params: {
          response_type: 'comment',
          page
        }
      })
        .then(res => {
          this.commentData = res.data.data.results
          this.totalComment = res.data.data.total_count
        })
        .catch(() => {
          this.$message.error('获取数据失败')
        })
    },

    // 换页
    changePage (page) {
      this.loadComments(page)
    },

    // 修改评论状态
    statusChange (commentStatus) {
      this.$axios({
        method: 'PUT',
        url: `/comments/status?article_id=${commentStatus.id}`,
        data: {
          allow_comment: commentStatus.comment_status
        }
      })
        .then(res => {
          this.$message({
            type: 'success',
            message: '状态修改成功！'
          })
        })
        .catch(err => {
          console.log(err)
          this.$message.error('状态修改失败！')
        })
    }
  }
}
</script>

<style lang="less" scope>
</style>
