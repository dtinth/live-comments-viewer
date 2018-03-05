<template lang="html">
  <form @submit="submit($event)">
    <h2>Please enter your Video URL:</h2>
    <input type="text" size="50" v-model="videoUrl" placeholder="https://www.facebook.com/yourusername/videos/___/" />
    <input type="submit" value="View comments" />
    <p>This only works with your own videos, or videos posted by pages.</p>
  </form>
</template>

<script>
export default {
  data () {
    return {
      videoUrl: ''
    }
  },
  methods: {
    submit (e) {
      e.preventDefault()
      const { videoUrl } = this
      if (videoUrl.match(/^\d+$/)) {
        return this.viewComments(videoUrl)
      }
      const m = videoUrl.match(/videos(?:\/[^/]+)?\/(\d+)(?:\/|\?|$)/)
      if (m) {
        return this.viewComments(m[1])
      }
      window.alert('Invalid URL format. Please make sure your URL is in format of https://www.facebook.com/yourusername/videos/<id>/')
    },
    viewComments (videoId) {
      this.$router.push(`/${videoId}/comments`)
    }
  }
}
</script>

<style lang="css">
</style>
