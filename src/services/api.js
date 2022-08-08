import axios from 'axios';

const api = axios.create({
    baseURL : 'https://content.guardianapis.com/search?api-key=0d160d0f-71cd-48b0-801f-2fc9cabd2157'
});

export default api;