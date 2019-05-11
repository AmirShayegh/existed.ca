<template>
    <v-container>
        <v-layout row>
            <v-flex xs12 sm6 offset-sm3>
                Search

                <template v-for="(item, index) in synonyms">
                    {{ item }}
                </template>
                <h1 v-if="domain">{{ domain }}</h1>
            </v-flex>
        </v-layout>

        <v-layout row v-if="loading">
            <v-flex xs12 sm6 offset-sm3>
                Loading...
            </v-flex>
        </v-layout>

        <v-layout row v-if="error">
            <v-flex xs12 sm6 offset-sm3>
                Unable to retrieve this information at this time.
            </v-flex>
        </v-layout>

        <appPRSList></appPRSList>
    </v-container>
</template>

<script>
    import PRSList from './PRSList.vue';
    import SynonymsApi from '@/services/api/Synonyms';
    import DomainNamesApi from '@/services/api/DomainNames';


    export default {
        data () {
            return {
                loading: false,
                error: false,
                synonyms: [],
                domain: null,
            }
        },

        methods: {
            fetchSynonyms(word)
            {
                this.loading = true;
                this.error = false;

                SynonymsApi.getSynonyms(word, 2)
                    .then(data => {
                        this.synonyms = data;
                    })
                    .catch(error => {
                        console.log(error)
                        this.error = true
                    })
                    .finally(() => {
                        this.loading = false;
                    })
            },
            fetchDomainDetails(domainName){
                this.loading = true;
                this.error = false;

                DomainNamesApi.getDomainNameAvailability(domainName)
                    .then(data => {
                        this.domain = data;
                    })
                    .catch(error => {
                        console.log(error)
                        this.error = true
                    })
                    .finally(() => {
                        this.loading = false;
                    })
            }

        },

        components: {
            appPRSList : PRSList
        },

        created () {
            this.fetchSynonyms('test');
            this.fetchDomainDetails('google.com');
        }
    }
</script>

<style>

</style>