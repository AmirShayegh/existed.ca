<template>
    <v-container>
            <v-layout row>
                <v-flex xs12 sm6 offset-sm3>
                    <v-text-field
                            label="Your desired business name"
                            solo
                            clearable
                            append-icon="search"
                            @click:append="handleSubmit"
                    ></v-text-field>
                </v-flex>
            </v-layout>
        <v-layout row v-if="loadingSynonyms || loadedDomains < totalDomains">
            <v-flex xs12 sm6 offset-sm3>
                <template>
                    <v-progress-linear :indeterminate="true"></v-progress-linear>
                </template>
            </v-flex>
        </v-layout>
        <v-layout row v-if="success">
            <v-flex xs12 sm6 offset-sm3>
                Search

                <template v-for="(item, index) in synonyms">
                    {{ item }}
                </template>
                <h1 v-if="domain">{{ domain }}</h1>
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
                loadingSynonyms: false,
                loadedDomains: 0,
                totalDomains: 10,
                error: false,
                synonyms: [],
                domain: null,
                success: false
            }
        },

        methods: {
            handleSubmit()
            {
                console.log('test');
                this.error = false;
                this.loadingSynonyms = true;
                this.fetchSynonyms('test');
                for (var i = 1; i <= 5; i++) {
                    console.log(i);
                    this.fetchDomainDetails('google.com');
                }

                if(!this.error)
                {
                    this.success = true;
                }
            },
            fetchSynonyms(word)
            {
                SynonymsApi.getSynonyms(word, 5)
                    .then(data => {
                        this.synonyms = data;
                        this.totalDomains = this.synonyms.length;
                        this.loadedDomains++;

                        console.log(this.totalDomains + ' ' + this.loadedDomains);
                    })
                    .catch(error => {
                        console.log(error)
                        this.error = true
                    })
                    .finally(() => {
                        this.loadingSynonyms = false;
                    })
            },
            fetchDomainDetails(domainName){
                DomainNamesApi.getDomainNameAvailability(domainName)
                    .then(data => {
                        this.domain = data;
                    })
                    .catch(error => {
                        console.log(error)
                        this.error = true
                    })
                    .finally(() => {

                    })
            }

        },

        components: {
            appPRSList : PRSList
        },

        created () {

        }
    }
</script>

<style>
    .icon-bg {
        background-color: pink;
    }
</style>