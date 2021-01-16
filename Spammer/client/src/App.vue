<template>
  <b-container id="app" style="max-width: 100%" >

        <b-navbar class="navbar navbar-default" role="navigation" variant="success" style="max-width: 100%">
          <b-navbar-brand>
            <h2 class="p-3 text-light">Web page to send spam emails</h2>
          </b-navbar-brand>
          <b-navbar-nav class="ml-auto">
            <b-nav-item  to="/" v-if="show('/')">Send spam mails</b-nav-item>
            <b-nav-item  to="/emails" v-if="show('/emails')">Change emails info</b-nav-item>
          </b-navbar-nav>
        </b-navbar>

        <router-view/>
  </b-container>
</template>

<script>
    export default {
        methods: {
            show(link) {
                return this.$route.path != link
            }
        }
    };
</script>

