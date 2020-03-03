<template>
  <div class="channel_select">
    <el-select
     placeholder="请选择频道"
     @input="onChange"
     :value="value"
    >
      <el-option
        v-if="notAll"
        label="全部频道"
        :value="null"
      ></el-option>
      <el-option
        v-for="channel in articleChannel"
        :key="channel.id"
        :label="channel.name"
        :value="channel.id"
      ></el-option>
    </el-select>
  </div>
</template>

<script>
export default {
  name: 'ChannelSelect',

  data () {
    return {
      articleChannel: []
    }
  },

  props: {
    value: {
      type: [String, Number]
    },
    notAll: {
      type: Boolean,
      default: true
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
          this.articleChannel = res.data.data.channels
        })
        .catch(err => {
          console.log(err)
        })
    },

    // 当元素改变事件
    onChange (ID) {
      this.$emit('input', ID)
    }
  }
}
</script>
