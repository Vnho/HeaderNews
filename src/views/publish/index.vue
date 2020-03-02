<template>
  <div class="publish">
    <!-- 发布文章区域 -->
    <el-card class="box-card">
      <!-- 表头 -->
      <div slot="header" class="clearfix">
        <span>发布文章</span>
      </div>
      <!-- 表单内容 -->
      <el-form ref="publishForm" :model="publishForm" label-width="80px">
        <!-- 文章标题 -->
        <el-form-item label="文章标题">
          <el-input v-model="publishForm.title"></el-input>
        </el-form-item>
        <!-- 文章内容 -->
        <el-form-item label="文章内容">
          <el-input type="textarea" v-model="publishForm.content"></el-input>
        </el-form-item>
        <!-- 文章频道 -->
        <el-form-item label="文章频道">
          <el-select v-model="publishForm.channel_id" placeholder="请选择频道">
            <el-option
             v-for="channel in channels"
             :key="channel.id"
             :label="channel.name"
             :value="channel.id">
            </el-option>
          </el-select>
        </el-form-item>
        <!-- 文章封面 -->
        <el-form-item label="文章封面">
          <el-radio-group v-model="publishForm.cover.type">
            <el-radio :label="1">单图</el-radio>
            <el-radio :label="3">三图</el-radio>
            <el-radio :label="0">无图</el-radio>
            <el-radio :label="-1">自动</el-radio>
          </el-radio-group>
        </el-form-item>
        <!-- 提交按钮 -->
        <el-form-item>
          <el-button type="primary" @click="onSubmit(false)">提交</el-button>
          <el-button @click="onSubmit(true)">草稿</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
export default {
  name: 'Publish',

  data () {
    return {
      publishForm: {
        title: '', // 文章标题
        content: '', // 文章内容
        // 文章封面
        cover: {
          type: 0, // 类型
          images: [] // 图片
        },
        channel_id: '' // 频道id
      },
      channels: [] // 文章频道
    }
  },

  created () {
    this.loadChannel()
  },

  methods: {
    // 加载文章频道列表
    loadChannel () {
      this.$axios({
        methods: 'GET',
        url: '/channels'
      })
        .then(res => {
          this.channels = res.data.data.channels
        })
    },
    // 发布文章
    onSubmit (draft) {
      this.$axios({
        method: 'POST',
        url: '/articles',
        props: {
          draft
        },
        data: this.publishForm
      })
        .then(res => {
          this.$message({
            type: 'success',
            message: '发表文章成功！'
          })
        })
        .catch(err => {
          this.$message.error('发表文章失败！')
          console.log(err)
        })
    }
  }
}
</script>

<style lang="less" scoped>
</style>
