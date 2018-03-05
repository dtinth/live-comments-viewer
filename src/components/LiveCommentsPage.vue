<template lang="html">
  <LiveCommentsViewer :video-id="videoId" />
</template>

<script>
import LiveCommentsViewer from './LiveCommentsViewer'
export default {
  components: {
    LiveCommentsViewer
  },
  computed: {
    videoId () {
      return this.$route.params.id
    }
  }
}
</script>

<style lang="css">
</style>
