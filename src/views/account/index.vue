<template>
  <div class="account">
    <el-card class="box-card">
      <!-- 表头 -->
      <div slot="header" class="clearfix">
        <span>账户信息</span>
      </div>
      <!-- 账户表单 -->
      <el-form ref="userForm" :model="userForm" label-width="80px">
        <!-- 用户头像 -->
        <el-form-item label="用户头像">
          <img v-if="userForm.photo" :src="userForm.photo" alt="用户头像" height="100px" width="100px" style="border-radius:50%">
          <el-button
           type="primary"
           round size="mini"
           @click="onChangePhoto">点击上传头像</el-button>
          <input
           type="file"
           ref="userPhoto"
           hidden
           @change="changePhoto">
        </el-form-item>

        <!-- 用户昵称 -->
        <el-form-item label="用户昵称">
          <el-input v-model="userForm.name"></el-input>
        </el-form-item>

        <!-- 个人介绍 -->
        <el-form-item label="个人介绍">
          <el-input type="textarea" v-model="userForm.intro"></el-input>
        </el-form-item>

        <!-- 手机号 -->
        <el-form-item label="手机号">
          <el-input :disabled="true" v-model="userForm.mobile"></el-input>
        </el-form-item>

        <!-- 邮箱地址 -->
        <el-form-item label="邮箱地址">
          <el-input v-model="userForm.email"></el-input>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="onKeep">保存修改</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import eventBus from '@/utils/event-bus.js'

export default {
  name: 'Account',

  data () {
    return {
      userForm: {
        photo: '' // 用户头像信息
      },
      photoURL: '' // 用户头像预览
    }
  },

  created () {
    this.loadAccount()
  },

  methods: {
    // 加载用户信息
    loadAccount () {
      this.$axios({
        method: 'GET',
        url: '/user/profile'
      })
        .then(res => {
          this.userForm = res.data.data
        })
    },

    // 提交修改信息
    onKeep () {
      this.$axios({
        method: 'PATCH',
        url: '/user/profile',
        data: {
          name: this.userForm.name,
          intro: this.userForm.intro,
          email: this.userForm.email
        }
      })
        .then(res => {
          this.$message.success('修改成功!')
          eventBus.$emit('update-user', this.userForm)
        })
        .catch(() => {
          this.$message.waring('修改失败!请检查网络设置')
        })
    },

    // 修改用户头像
    // 1.操作DOM更改点击事件
    onChangePhoto () {
      this.$refs.userPhoto.click()
    },
    // 2.点击事件选取图片
    changePhoto () {
      const photo = this.$refs.userPhoto.files[0]
      const fd = new FormData()
      fd.append('photo', photo)
      this.$axios({
        method: 'PATCH',
        url: '/user/photo',
        data: fd
      })
        .then((res) => {
          this.userForm.photo = res.data.data.photo
          this.$message.success('修改用户头像成功!')
          eventBus.$emit('update-user', this.userForm)
        })
        .catch(() => {
          this.$message.waring('修改用户头像失败!请检查网络连接!')
        })
    }
  }
}
</script>

<style lang="less" scoped>
.el-textarea__inner {
 resize: none;
}
</style>
