<template>
  <div class="section">
    <div class="container">
      <h1 class="title is-3">live-comments-viewer</h1>
      <div v-if="authStatus === 'checking'">
        Checking login status...
      </div>
      <div v-if="authStatus === 'connected'">
        <router-view/>
      </div>
      <div v-if="authStatus === 'not_authorized' || authStatus === 'unknown'">
        <button
          class="button is-link"
          @click="signIn">Sign in with Facebook</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'App',
  data () {
    return {
      authStatus: 'unknown',
      authResponse: null
    }
  },
  async created () {
    const FB = await window.facebookSDKPromise
    FB.getLoginStatus((response) => {
      this.onAuthResponseChange(response)
      this.onStatusChange(response)
      FB.Event.subscribe(
        'auth.authResponseChange',
        this.onAuthResponseChange
      )
      FB.Event.subscribe(
        'auth.statusChange',
        this.onStatusChange
      )
    })
  },
  methods: {
    async signIn () {
      const response = await new Promise(resolve => {
        window.FB.login(resolve, { scope: 'user_videos' })
      })
      this.onAuthResponseChange(response)
      this.onStatusChange(response)
    },
    onAuthResponseChange ({ authResponse }) {
      console.log('onAuthResponseChange', authResponse && authResponse.userID)
    },
    onStatusChange ({ status }) {
      console.log('onStatusChange', status)
      this.authStatus = status
    }
  }
}
</script>

<style>
body {
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
}
</style>
