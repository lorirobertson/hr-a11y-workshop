import axios from 'axios';
import _ from 'lodash';

const setToken = () =>{
    let token = localStorage.getItem('access-token');
    if ( token ) {
        return `Bearer ${token.replace(/"/g, '')}`;
    } else {
        return '';
    }    
}

axios.defaults.headers.common['Authorization'] = setToken();

const prefix = '/api';

const request = {
    setAuthorization: () => {
        axios.defaults.headers.common['Authorization'] = setToken();
    },

    get: (url, data={}, usePrefix=true) => {
        let route = usePrefix ? prefix + url : url;
        return axios.get(route, data);
    },

    post: (url, data={}, usePrefix=true) => {
        let route = usePrefix ? prefix + url : url;
        return axios.post(route, data);
    },

    put: (url, data={}, usePrefix=true) => {
        let route = usePrefix ? prefix + url : url;
        return axios.put(route, data);
    },

    delete: (url, data={}, usePrefix=true) => {
        let route = usePrefix ? prefix + url : url;
        return axios.delete(route, data);
    }
};

export default request;