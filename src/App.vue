<template>
  <div id="app">
    <h1>live-comments-viewer</h1>
    <div v-if="authStatus === 'checking'">
      Checking login status...
    </div>
    <div v-if="authStatus === 'notAuthorized'">
      <button @click="signIn">Sign in with Facebook</button>
    </div>
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'

export default {
  name: 'app',
  data () {
    return {
      authStatus: 'checking',
      authResponse: null
    }
  },
  methods: {
    async signIn () {
      const result = await new Promise(resolve => {
        FB.login(resolve, { scope: 'user_videos' })
      })
      console.log('Login result', result)
    },
    onAuthResponseChange () {
      console.log(this)
    },
    onStatusChange () {
      console.log(this)
    }
  },
  async created () {
    const FB = await window.facebookSDKPromise
    FB.Event.subscribe(
      'auth.authResponseChange',
      this.onAuthResponseChange
    )
    FB.Event.subscribe(
      'auth.statusChange',
      this.onStatusChange
    )
    FB.getLoginStatus((response) => {
      this.onAuthResponseChange(response.authResponse)
      this.onStatusChange(response.status)
    })
  },
  components: {
    HelloWorld
  }
}
</script>

<style>
</style>
