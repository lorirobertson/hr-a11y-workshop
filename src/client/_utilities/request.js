import Cookies from 'js-cookie';

const setToken = () => {
    let token = Cookies.get('access_token');
    if ( token ) {
        return `Bearer ${token.replace(/"/g, '')}`;
    } else {
        return '';
    }    
}

const setHeader = (extra={}) => {
	const headers = {
		'Content-Type': 'application/json',
		'Authorization': setToken(),
	};
	return Object.assign(headers, extra);
};

const createRequest = async(usePrefix=true, url, method, body={}, headers={}) => {
	const route = usePrefix ? '/api/v1' + url : url;
	const response = await fetch(route, {
		method,
		headers: setHeader(headers),
		body: ( method !== 'GET' ) ? JSON.stringify(body) : null,
	});

	return new Promise(async (resolve) => {
        resolve({
            status: response.status,
            statusText: response.statusText,
            headers: response.headers,
            data: await response.json(),
        })
    });
};

const request = {
    get: async(url, data={}, usePrefix=true) => {
		return createRequest(usePrefix, url, 'GET', null, { 
			helpers: JSON.stringify(data)
		});
    },

    post: async (url, data={}, usePrefix=true) => {
		return createRequest(usePrefix, url, 'POST', data);
    },

    put: (url, data={}, usePrefix=true) => {
		return createRequest(usePrefix, url, 'PUT', data);
    },

    delete: (url, data={}, usePrefix=true) => {
		return createRequest(usePrefix, url, 'DELETE', data);
    }
};

export default request;