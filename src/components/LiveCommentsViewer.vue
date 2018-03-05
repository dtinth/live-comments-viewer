<template>
  <div>
    <p>
      <button
        :disabled="loading"
        class="button"
        @click="refresh">Refresh</button>
    </p>
    <ul>
      <li
        v-for="comment in comments"
        :key="comment.id"
        @click="fullScreen($event.currentTarget)">
        <strong>{{ comment.from.name }}:</strong> {{ comment.message }}
      </li>
    </ul>
    <p>Click on a comment to view it in full screen</p>
  </div>
</template>

<script>
/* global FB */
export default {
  props: {
    videoId: {
      type: String,
      required: true
    }
  },
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
      10000
    )
  },
  beforeDestroy () {
    window.clearInterval(this.refreshInterval)
  },
  methods: {
    refresh () {
      this.fetchComments()
    },
    fullScreen (el) {
      el.requestFullscreen()
    },
    async fetchComments () {
      this.loading = true
      try {
        const commentsResponse = await new Promise(resolve => {
          FB.api('/' + this.videoId + '/comments', {
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
  ul {
    border: 1px solid #eee;
    margin: 1em 0;
  }
  li:not(:first-child) {
    border-top: 1px solid #eee;
  }
  li {
    padding: 0.5em;
  }
  li:fullscreen {
    font-size: 100px;
    background: black;
    color: #e9e8e7;
    border: 0;
    text-align: center;
  }
  li:fullscreen strong {
    color: #bef;
    display: block;
  }
</style>
