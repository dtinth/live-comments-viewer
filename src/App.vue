<template>
  <div id="app">
    <h1>live-comments-viewer</h1>
    <div v-if="authStatus === 'checking'">
      Checking login status...
    </div>
    <div v-if="authStatus === 'connected'">
      <router-view></router-view>
    </div>
    <div v-if="authStatus === 'not_authorized' || authStatus === 'unknown'">
      <button @click="signIn">Sign in with Facebook</button>
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
      const result = await new Promise(resolve => {
        window.FB.login(resolve, { scope: 'user_videos' })
      })
      console.log('Login result', result)
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
</style>
