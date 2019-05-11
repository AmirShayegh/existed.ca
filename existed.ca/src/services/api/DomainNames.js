import axios from 'axios';

export default {
    getDomainNameAvailability (domainName){
        let endpoint = 'https://cors.io/?https://api.ote-godaddy.com/v1/domains/available?domain=' + domainName + '&checkType=FAST&forTransfer=false';

        return axios.get(endpoint, this.getConfig())
            .then(response => {
                return response.data;
            })
    },

    getMultipleDomainNamesAvailability (domainNames){
        let endpoint = 'https://cors.io/?https://api.ote-godaddy.com/v1/domains/available?checkType=FULL';

        return axios.post(endpoint, this.getConfig())
            .then(response => {
                return response.data;
            })
    },

    getConfig()
    {
        return {
            headers: {
                "Authorization" : 'sso-key 3mM44UaBuaGpHF_HXTWznMMCeHx2SgFymcjnd:HXUiW7sTraqtxNFKct7sc1'
            }
        }
    }
}