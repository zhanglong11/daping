<template>
  <div :id="id"></div>
</template>

<script>
import 'xgplayer'
import Xgplayer from 'xgplayer-flv.js'
export default {
  name: 'Video',
  props: {
    url: {
      required: true
    },
    autoplay: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      id: 'video-' + _.uniqueId(),
      video: null
    }
  },
  mounted() {
    this.video = new Xgplayer({
      id: this.id,
      isLive: true,
      playsinline: true,
      autoplay: this.autoplay,
      volume: 0,
      fluid: true,
      url: this.url,
      flvOptionalConfig: {
        enableWorker: false
      },
      videoInit: true
    })
  },
  methods: {
    remove() {
      this.$emit('remove')
    },
    pause() {
      this.video.pause()
    }
  }
}
</script>

<style scoped lang="less"></style>
