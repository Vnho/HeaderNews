<template>
  <div class="upload-images">
    <!-- 点击选择图片 -->
    <div class="click-change" @click="dialogVisible=true">
      <img style="border-radius:5px" width="125" height="125" v-if="value" :src="value">
      <template v-else>
        <i class="el-icon-plus"></i>
        <div>点击上传图片</div>
      </template>
    </div>
    <!-- 弹出框 -->
    <el-dialog
      title="选择图片"
      :visible.sync="dialogVisible"
      width="50%"
      center
    >
      <!-- 中间内容区域 -->
      <el-tabs v-model="chooseChannle">
        <!-- 素材库 -->
        <el-tab-pane label="素材库" name="first">
          <!-- 是否为收藏内容 -->
          <el-radio-group
           v-model="allNot"
           size="small"
           style="margin:0 0 10px 40%"
           @change="onFind"
          >
            <el-radio-button label="false">全部</el-radio-button>
            <el-radio-button label="true">收藏</el-radio-button>
          </el-radio-group>
          <!-- 图片展示区域 -->
          <el-row :gutter="20">
            <el-col
             :span="6"
             v-for="(image,index) in images"
             :key="image.id"
             @click.native="activeImage = index">
              <img
               :src="image.url"
               style="margin-bottom:10px"
               width="100"
               height="100"
               :class="{'image-border':activeImage===index}">
            </el-col>
          </el-row>
          <!-- 分页 -->
          <el-pagination
            style="text-align: center;"
            background
            layout="prev, pager, next"
            :total="totalCount"
            :page-size="12"
            @current-change="pageChage">
          </el-pagination>
        </el-tab-pane>

        <!-- 用户上传 -->
        <el-tab-pane label="用户上传" name="second">
          <div class="click-change">
            <i class="el-icon-plus"></i>
            <div>点击上传图片</div>
          </div>
        </el-tab-pane>
      </el-tabs>
      <!-- 底部选择 -->
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="onUpload">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'uploadImages',

  data () {
    return {
      dialogVisible: false, // 显示或隐藏选择内容
      chooseChannle: 'first', // 选择素材或手动上传
      allNot: 'false', // 是否为收藏内容
      images: [], // 素材列表
      totalCount: '', // 素材总数
      activeImage: null // 选中的图片的索引
    }
  },

  props: {
    value: {
      type: String
    }
  },

  created () {
    this.loadMaterial()
  },

  methods: {
    // 加载素材列表
    loadMaterial (isCollect = false, page) {
      this.$axios({
        method: 'GET',
        url: '/user/images',
        params: {
          collect: isCollect,
          page,
          per_page: 12
        }
      }).then(res => {
        this.images = res.data.data.results
        this.totalCount = res.data.data.total_count
      })
    },

    // 换页操作
    pageChage (page) {
      this.loadMaterial(this.allNot, page)
    },

    // 切换收藏和全部
    onFind (value) {
      this.loadMaterial(value)
    },

    // 上传图片
    onUpload () {
      const image = this.images[this.activeImage]
      if (image) {
        this.$emit('input', image.url)
      }
      this.dialogVisible = false
    }
  }
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
.el-col-6{
  display: flex;
  justify-content: center;
  align-items: center;
}
.image-border{
  box-shadow: 5px -5px 20px 1px #2e93d6
}
</style>
