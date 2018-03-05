<template>
  <div>
    <p>
      <button
        :disabled="loading"
        @click="refresh">Refresh</button>
    </p>
    <ul>
      <li
        v-for="comment in comments"
        :key="comment.id">
        <strong>{{ comment.from.name }}:</strong> {{ comment.message }}
      </li>
    </ul>
  </div>
</template>

<script>
/* global FB */
export default {
  data () {
    return {
      loading: true,
      comments: [ ]
    }
  },
  created () {
    this.fetchComments()
    this.refreshInterval = setInterval(
      () => this.fetchComments(),
      15000
    )
  },
  beforeDestroy () {
    window.clearInterval(this.refreshInterval)
  },
  methods: {
    refresh () {
      this.fetchComments()
    },
    async fetchComments () {
      this.loading = true
      try {
        const commentsResponse = await new Promise(resolve => {
          FB.api('/10209640044192089/comments', {
            order: 'reverse_chronological',
            live_filter: 'no_filter',
            filter: 'stream'
          }, resolve)
        })
        this.comments = commentsResponse.data
      } finally {
        this.loading = false
      }
    }
  }
}
</script>

<style scoped>
</style>
