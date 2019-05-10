<template>
  <v-app>
    <v-toolbar app>
      <v-toolbar-title class="headline text-uppercase">
        <span>PRS Design</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn
        flat
        href="https://github.com/vuetifyjs/vuetify/releases/latest"
        target="_blank"
      >
        <span class="mr-2">Latest Release</span>
      </v-btn>
    </v-toolbar>

    <v-content>
      <PRSList></PRSList>
    </v-content>
  </v-app>
</template>

<script>
//TODO: test for PRS List component, should delete it later
import PRSList from './components/ui-common/PRSList'

export default {
  name: 'App',
  components: {
    PRSList
  },
  data () {
    return {
      //
    }
  }
}
</script>
