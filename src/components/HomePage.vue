<template lang="html">
  <form @submit="submit($event)">
    <h2 class="title is-5">Please enter your Video URL:</h2>
    <div class="field">
      <p class="control">
        <input
          v-model="videoUrl"
          class="input"
          type="text"
          size="50"
          placeholder="https://www.facebook.com/yourusername/videos/___/" >
      </p>
    </div>
    <div class="field">
      <p class="control">
        <input
          class="button is-primary"
          type="submit"
          value="View comments" >
      </p>
    </div>
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
