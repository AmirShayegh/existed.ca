import axios from 'axios';

export default {
    async getSynonyms (word, max){
        let endpoint = 'https://api.datamuse.com/words?rel_syn=' + word + '&max=' + max;

        return await axios.get(endpoint)
            .then(response => {
                return response.data;
            })
    }
}