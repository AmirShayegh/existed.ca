<template>
  <v-layout row>
    <v-flex xs12 sm6 offset-sm3>
      <v-card>
        <v-toolbar color="pink" dark>

          <v-toolbar-title> {{ domain.domain }}</v-toolbar-title>

          <v-spacer></v-spacer>

          <v-btn icon>
            <v-icon v-if="domain.available">
              check
            </v-icon>
            <v-icon v-else>
              close
            </v-icon>
          </v-btn>

        </v-toolbar>

        <v-list two-line>
          <template v-for="(item, index) in domainSynonyms">
            <v-list-tile
              :key="item.domain"
              avatar
              ripple
              @click="toggle(index)"
            >
              <v-list-tile-content>
                <v-list-tile-title>{{ item.domain }}</v-list-tile-title>
              </v-list-tile-content>

              <v-list-tile-action>
                <v-list-tile-action-text>{{ item.available }}</v-list-tile-action-text>
                <v-icon
                  v-if="!item.available"
                  color="grey lighten-1"
                >
                  close
                </v-icon>

                <v-icon
                  v-else
                  color="green darken-2"
                >
                  check
                </v-icon>
              </v-list-tile-action>

            </v-list-tile>
            <v-divider
              v-if="index + 1 < domainSynonyms.length"
              :key="index"
            ></v-divider>
          </template>
        </v-list>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
export default {
    props: [
        'domain', 'domainSynonyms'
    ],
   data () {
      return {
        selected: [2],
        items: [
          {
            action: '15 min',
            headline: 'Brunch this weekend?',
            title: 'Ali Connors',
            subtitle: "I'll be in your neighborhood doing errands this weekend. Do you want to hang out?"
          },
          {
            action: '2 hr',
            headline: 'Summer BBQ',
            title: 'me, Scrott, Jennifer',
            subtitle: "Wish I could come, but I'm out of town this weekend."
          },
          {
            action: '6 hr',
            headline: 'Oui oui',
            title: 'Sandra Adams',
            subtitle: 'Do you have Paris recommendations? Have you ever been?'
          },
          {
            action: '12 hr',
            headline: 'Birthday gift',
            title: 'Trevor Hansen',
            subtitle: 'Have any ideas about what we should get Heidi for her birthday?'
          },
          {
            action: '18hr',
            headline: 'Recipe to try',
            title: 'Britta Holt',
            subtitle: 'We should eat this: Grate, Squash, Corn, and tomatillo Tacos.'
          }
        ]
      }
    },

    methods: {
      toggle (index) {
        const i = this.selected.indexOf(index)

        if (i > -1) {
          this.selected.splice(i, 1)
        } else {
          this.selected.push(index)
        }
      }
    }
}
</script>

<style scoped>

</style>
