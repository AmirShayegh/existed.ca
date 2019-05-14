<template>
    <v-container>
        <v-layout row>
            <v-flex xs12 sm6 offset-sm3>
                <v-text-field
                        v-model="name"
                        label="Your desired business name"
                        solo
                        clearable
                        append-icon="search"
                        @click:append="handleSubmit"
                ></v-text-field>
            </v-flex>
        </v-layout>

        <v-layout row v-if="loading">
            <v-flex xs12 sm6 offset-sm3>
                <template>
                    <v-progress-linear :indeterminate="true"></v-progress-linear>
                </template>
            </v-flex>
        </v-layout>

        <v-layout row v-if="error">
            <v-flex xs12 sm6 offset-sm3>
                Unable to retrieve this information at this time.
            </v-flex>
        </v-layout>

        <appPRSList
                v-if="success"
                :domain="domain"
                :domainSynonyms="domainSynonyms"
        />
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
                success: false,
                name: null,
                synonyms: [],
                domain: null,
                domainSynonyms: []
            }
        },

        methods: {
            async handleSubmit()
            {
                this.error = false
                this.success = false
                this.loading = true

                await(this.fetchDomainDetails(this.name, '.com'))

                await(this.fetchSynonyms(this.name, 10))

                for (const synonym of this.synonyms){
                    await this.fetchDomainDetails(synonym.word, '.com')
                }

                this.loading = false;

                if(!this.error){
                    this.success = true;
                }

            },
            async fetchSynonyms(word, max)
            {
                await SynonymsApi.getSynonyms(word, max)
                    .then(data => {
                        this.synonyms = data;
                    })
                    .catch(error => {
                        console.log(error)
                        this.error = true
                    })
                    .finally(() => {

                    })
            },
            async fetchDomainDetails(domainName, topLevel){
                await DomainNamesApi.getDomainNameAvailability(domainName + topLevel)
                    .then(data => {
                        if(this.domain == null){
                            this.domain = data;
                        } else {
                            this.domainSynonyms.push(data);
                        }
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