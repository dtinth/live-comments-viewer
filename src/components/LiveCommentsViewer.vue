<template>
  <ul>
    <li
      v-for="comment in comments"
      :key="comment.id">
      <strong>{{ comment.from.name }}:</strong> {{ comment.message }}
    </li>
  </ul>
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
  },
  methods: {
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
