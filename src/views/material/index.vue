<template>
  <div class="material">
    <el-card class="box-card">
      <!-- 上传图片 -->
      <div slot="header" class="clearfix">
        <span>素材管理</span>
        <el-button type="primary" style="float:right;">点击上传</el-button>
      </div>
      <!-- 素材种类 -->
      <div>
        <el-radio-group v-model="orCollect" @change="onFind">
          <el-radio-button label="false">全部</el-radio-button>
          <el-radio-button label="true">收藏</el-radio-button>
        </el-radio-group>
      </div>
      <!-- 素材内容 -->
      <el-row :gutter="20" style="margin-top:20px">
        <el-col
          :span="4"
          v-for="(image,index) in images"
          :key="index"
          style="margin-bottom:20px;"
          :xs="24"
          :sm="12"
          :md="4"
        >
          <el-card :body-style="{ padding: '0px' }" style="text-align:center;">
            <!-- 素材内容 -->
            <el-image :src="image.url" class="image" lazy fit="cover" style="height:150px"></el-image>
            <!-- 操作 -->
            <div style="padding: 14px;">
              <div class="bottom clearfix">
                <!-- 收藏素材 -->
                <i
                  :class="{'el-icon-star-off':!image.is_collected,'el-icon-star-on':image.is_collected}"
                  style="font-size:26px;color:skyblue;cursor:pointer"
                  @click="onCollect(image)"
                ></i>
                <!-- 删除素材 -->
                <i
                  class="el-icon-delete"
                  style="font-size:24px;cursor:pointer"
                  @click="onDelete(image)"
                ></i>
              </div>
            </div>
          </el-card>
        </el-col>
      </el-row>
      <!-- 分页按钮 -->
      <el-pagination
        style="text-align:center"
        :background="true"
        layout="prev, pager, next"
        :total="totalCount"
        @current-change="onPageChange"
        :page-size="24"
      ></el-pagination>
    </el-card>
  </div>
</template>

<script>
export default {
  name: 'Material',

  data () {
    return {
      orCollect: false, // 当前所在频道
      totalCount: 0, // 总共素材数
      images: [], // 素材内容
      nowPage: 0 // 当前所在页数
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
          per_page: 24
        }
      }).then(res => {
        this.images = res.data.data.results
        this.totalCount = res.data.data.total_count
      })
    },

    // 切换全部或收藏
    onFind (value) {
      this.loadMaterial(value)
    },

    // 换页操作
    onPageChange (page) {
      this.loadMaterial(this.orCollect, page)
      this.nowPage = page
    },

    // 收藏素材
    onCollect (item) {
      this.$axios({
        method: 'PUT',
        url: `/user/images/${item.id}`,
        data: {
          collect: !item.is_collected
        }
      })
        .then(res => {
          if (res.data.data.collect) {
            this.$message({
              type: 'success',
              message: '添加收藏成功'
            })
          } else if (!res.data.data.collect) {
            this.$message({
              type: 'warning',
              message: '已取消收藏'
            })
          }
          item.is_collected = !item.is_collected
        })
        .catch(() => {
          this.$message.error('操作失败!请检查网络连接!')
        })
    },

    // 删除素材
    onDelete (item) {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          this.$axios({
            method: 'DELETE',
            url: `/user/images/${item.id}`
          })
            .then(() => {
              this.$message.success('删除成功!')
              this.loadMaterial(this.nowPage)
            })
            .catch(() => {
              this.$message.error('删除失败!请检查网络设置!')
            })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
    }
  }
}
</script>

<style lang="less">
.bottom {
 display: flex;
 i {
  flex: 1;
 }
}
</style>
