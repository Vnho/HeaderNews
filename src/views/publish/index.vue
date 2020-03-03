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
          <!-- 富文本编辑器 -->
          <quill-editor
            style="height:200px;margin-bottom:100px"
            v-model="publishForm.content"
            ref="myQuillEditor"
            :options="editorOption"
          ></quill-editor>
        </el-form-item>

        <!-- 文章频道 -->
        <el-form-item label="文章频道">
          <channel-select v-model="publishForm.channel_id" :notAll="false"></channel-select>
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
// 富文本编辑器
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

import { quillEditor } from 'vue-quill-editor'

import channelSelect from '@/components/channel-select'
export default {
  name: 'Publish',

  components: {
    quillEditor,
    channelSelect
  },

  data () {
    return {
      editorOption: {}, // 富文本编辑器的配置选项对象
      publishForm: {
        title: '', // 文章标题
        content: '', // 文章内容
        // 文章封面
        cover: {
          type: 0, // 类型
          images: [] // 图片
        },
        channel_id: '' // 频道id
      }
    }
  },

  created () {
    this.loadChannel()
  },

  methods: {
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
          this.$router.push('/article')
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
