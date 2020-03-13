<template>
  <div class="upload-images">
    <!-- 点击选择图片 -->
    <div class="click-change" @click="dialogVisible=true">
      <i class="el-icon-plus"></i>
      <div>点击上传图片</div>
    </div>
    <!-- 弹出框 -->
    <el-dialog title="选择图片" :visible.sync="dialogVisible" width="50%" :before-close="handleClose">

      <!-- 中间内容区域 -->

      <!-- 底部选择 -->
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'uploadImages',

  data () {
    return {
      dialogVisible: false
    }
  },

  created () {},

  methods: {}
}
</script>

<style lang="less" scoped>
.click-change {
 display: flex;
 flex-direction: column;
 border-radius: 5px;
 align-items: center;
 justify-content: center;
 height: 125px;
 width: 125px;
 border: 1px dashed #cccccc;
 color: #666;
 cursor: pointer;
 font-size: 14px;
 .el-icon-plus {
  margin-bottom: 10px;
 }
}
</style>
