<template>
    <v-layout row>
        <v-flex xs12 sm6 offset-sm3>
            <v-card>
                <v-toolbar
                        color="pink"
                        dark
                        @click="purchase(domain)">

                    <v-toolbar-title> {{ domain.domain }}</v-toolbar-title>

                    <v-spacer></v-spacer>

                    <v-icon v-if="domain.available">
                        check
                    </v-icon>
                    <v-icon v-else>
                        close
                    </v-icon>

                </v-toolbar>

                <v-list two-line>
                    <template v-for="(item, index) in domainSynonyms">
                        <v-list-tile
                                :key="item.domain"
                                avatar
                                ripple
                                @click="purchase(item)"
                        >
                            <v-list-tile-content>
                                <v-list-tile-title>{{ item.domain }}</v-list-tile-title>
                            </v-list-tile-content>

                            <v-list-tile-action>
                                <v-list-tile-action-text
                                        v-if="item.available">
                                    AVAILABLE
                                </v-list-tile-action-text>
                                <v-list-tile-action-text
                                        v-else>
                                    UNAVAILABLE
                                </v-list-tile-action-text>
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
        data() {
            return {
                purchase(item) {
                    window.open("https://www.namecheap.com/domains/registration/results.aspx?domain=" + item.domain, "_blank");
                }
            }
        },

        methods: {}
    }
</script>

<style scoped>

</style>
