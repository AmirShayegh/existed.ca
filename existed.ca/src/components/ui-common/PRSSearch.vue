<template>
    <v-container>
         <v-card>
        <v-layout row>
            <v-flex xs12>
                <v-flex xs12>
                    <v-text-field
                    label="Search"
                    single-line
                    box
                    v-model="currentInput"
                    v-on:change="searchCurrent"
                    type="text"
                    >
                    </v-text-field>
                </v-flex>
             </v-flex>
            
        </v-layout>

        <v-layout row v-if="isAvailable != null">
            <v-flex row offset-xs1 color="blue" v-if="isAvailable" >
                This domain is available.
            </v-flex>
            <v-flex row offset-xs1 color="red" v-if="!isAvailable" >
                This domain is not available.
            </v-flex>
        </v-layout>

        <v-layout row v-if="loading">
            <v-flex xs12>
                Loading...
            </v-flex>
        </v-layout>

        <v-layout row v-if="error">
            <v-flex xs12>
                Unable to retrieve this information at this time.
            </v-flex>
        </v-layout>

        <v-layout row>
            <v-flex xs12 offset-xs1>
                <v-flex xs12>
                    You could also try...
                </v-flex>
                <div  v-for="(item, i) in synonyms" :key="i">
                    {{ item }}
                </div>
                <h1 v-if="domain">{{ domain }}</h1>
            </v-flex>
         </v-layout>

        <appPRSList></appPRSList>
         </v-card>
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
                synonyms: ["hello", "hi"],
                domain: null,
                isAvailable: true,
                currentInput: "",
            }
        },

        methods: {
            fetchSynonyms(word) {
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
            fetchDomainDetails(domainName) {
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
            },
            searchCurrent() {
                this.fetchDomainDetails(this.current);
                this.fetchSynonyms('this.current');
            },
            searchSynonyms() {
                this.synonyms.forEach(element => {
                    
                });
            }

        },

        components: {
            appPRSList : PRSList
        },

        created () {
            // this.fetchSynonyms('test');
            // this.fetchDomainDetails('google.com');
        }
    }
</script>

<style>

</style>