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
            <el-radio :label="null">全部</el-radio>
            <el-radio label="0">草稿</el-radio>
            <el-radio label="1">待审核</el-radio>
            <el-radio label="2">审核通过</el-radio>
            <el-radio label="3">审核失败</el-radio>
            <el-radio label="4">已删除</el-radio>
          </el-radio-group>
        </el-form-item>

        <!-- 频道列表 -->
        <el-form-item label="频道列表">
          <channel-select v-model="ArticleForm.channel_id"></channel-select>
        </el-form-item>

        <!-- 发布时间 -->
        <el-form-item label="发布时间">
          <div class="block">
            <el-date-picker
              v-model="rangeDate"
              type="daterange"
              range-separator="——"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              value-format="yyyy-MM-dd"
            ></el-date-picker>
          </div>
        </el-form-item>

        <!-- 提交查询 -->
        <el-form-item>
          <el-button type="primary" @click="onQuery" round>查询</el-button>
        </el-form-item>
      </el-form>
    </el-card>

    <!-- 文章列表 -->
    <el-card class="box-card search">
      <div slot="header" class="clearfix">
        <span>共找到{{totalContent}}条符合的数据</span>
      </div>
      <!--
        el-table 表格组件
        data 表格的数组，要求是数组
        表格组件会使用 data 数据，在内部自己进行遍历，我们不需要自己写什么 v-for
        你只需要告诉这个表格组件：
          data 是啥
          表头名是什么
          列值是什么
        el-table-column 表格列组件
          prop 用来指定渲染哪个数据字段
          label 表头名称
          width 列宽
        表格列默认只能渲染普通文本，如果想要渲染点儿别的东西，需要自定义表格列。
      -->
      <el-table
        :data="articleData"
        style="width: 100%"
        v-loading="loading"
        element-loading-text="加载数据中，请稍后。。。"
        element-loading-spinner="el-icon-loading"
        element-loading-background="rgba(0, 0, 0, 0.8)"
      >
        <el-table-column prop="cover" label="封面" width="180">
          <!--
            自定义表格列
            在 template 上声明 slot-scope="scope" ，然后就可以通过 scope.row 获取遍历项
            scope.row 就相当于我们自己 v-for 的 item

            注意：只有当你需要在自定义表格列模板中访问遍历项的时候才这么做
          -->
          <template slot-scope="scope">
            <img :src="scope.row.cover.images[0]" alt="文章封面" width="100">
          </template>
        </el-table-column>
        <el-table-column prop="title" label="标题" width="180"></el-table-column>
        <el-table-column prop="status" label="状态">
          <template slot-scope="scope">
            <el-tag :type="articleStasus[scope.row.status].type" effect="dark" size="mini">
              <span>{{articleStasus[scope.row.status].label}}</span>
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="pubdate" label="发布日期"></el-table-column>
        <el-table-column prop="address" label="操作">
          <template slot-scope="scope">
            <el-button
             type="danger"
             size="mini"
             @click="onDelete(scope.row.id)">删除</el-button>
            <el-button
             type="primary"
             size="mini"
             @click="$router.push(`/publish/${scope.row.id}`)">编辑</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>

    <!-- 分页 -->
    <el-pagination
      :disabled="loading"
      background=""
      :current-page="page"
      layout="prev, pager, next"
      :total="totalContent"
      class="paging"
      @current-change="onPageChange"
    >
    </el-pagination>
  </div>
</template>

<script>
import channelSelect from '@/components/channel-select'
export default {
  name: 'Article',

  components: {
    channelSelect
  },

  data () {
    return {
      // 文章表单
      ArticleForm: {
        status: null, // 文章状态
        channel_id: null // 频道id
      },
      // 文章状态图标
      articleStasus: [
        {
          type: 'primary',
          label: '草稿'
        },
        {
          type: 'warning',
          label: '待审核'
        },
        {
          type: 'success',
          label: '审核通过'
        },
        {
          type: 'danger',
          label: '审核失败'
        },
        {
          type: 'danger',
          label: '已删除'
        },
        {
          type: '',
          label: '全部'
        }
      ],
      // 搜索的日期范围
      rangeDate: [],
      // 文章展示列表
      articleData: [],
      // 文章总个数
      totalContent: 0,

      // 文章加载 loading 效果
      loading: true,
      // 文章初始页码
      page: 0
    }
  },

  created () {
    this.loadArticles()
  },

  methods: {
  // 加载文章列表
    loadArticles (page = 1) {
      this.loading = true
      this.$axios({
        type: 'GET',
        url: '/articles',
        params: {
          page, // 页码
          per_page: 10, // 每页多少数据，后端默认按照每页十个数据
          status: this.ArticleForm.status, // 文章的状态
          channel_id: this.ArticleForm.channel_id, // 文章频道的ID
          begin_pubdate: this.rangeDate ? this.rangeDate[0] : null, // 开始的数据
          end_pubdate: this.rangeDate ? this.rangeDate[1] : null // 结束的数据
        }
      })
        .then(res => {
          this.articleData = res.data.data.results
          this.totalContent = res.data.data.total_count
        })
        .catch(err => {
          console.log(err, '获取数据失败')
        })
        .finally(() => {
          this.loading = false
        })
    },

    // 换页操作
    onPageChange (page) {
      this.page = page
      this.loadArticles(page)
    },

    // 查询操作
    onQuery () {
      this.loadArticles()
      this.page = 1
    },

    // 删除文章
    onDelete (articleId) {
      this.$axios({
        method: 'DELETE',
        url: `/articles/${articleId}`
      })
        .then(res => {
          this.loadArticles(this.page)
          this.$message({
            type: 'success',
            message: '删除文章成功！'
          })
          this.loadArticles()
        })
        .catch(err => {
          console.log('删除文章失败', err)
          this.$message.error('删除文章失败！')
        })
    }
  }
}
</script>

<style lang="less" scoped>
.search {
 margin: 20px 0;
}
.paging {
 text-align: center;
}
</style>
