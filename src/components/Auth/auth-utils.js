import Router from 'next/router';
import request from '../../_utilities/request';
import { createAlert } from '../../_utilities/helpers';
import Cookies from 'js-cookie';
import auth from '../../_utilities/auth';

const defaultConfig = {
	expires: 9000000,
	secure: false,
};

async function authenticateUser(provider, credentials) {
	try {
		const resp = await request.post(`/auth/${provider}`, credentials);
		const data = resp.data;
		if ( data.status === 200 ) {
			auth.setToken(data.data.token, true);
			auth.set(data.data.user, 'user', true);
			Cookies.set('access_token', data.data.token, defaultConfig);
			Cookies.set('user', data.data.user, defaultConfig);
			return true;
		} else {
			return false;
		}
	} catch (err) {
		createAlert('Oops! There was an error while trying to log in!', {type: 'error'});
		return false;
	}
}

async function registerUser(user) {
	try {
		const { data } = await request.post(`/auth/local/register`, user);
		Cookies.set('access_token', data.token, defaultConfig);
		Cookies.set('user', data.user, defaultConfig);
		return true;
	} catch (err) {
		createAlert('Oops! There was an error while trying to register!', {type: 'error'});
		return false;
	}
}

function isAuthenticated() {
	const token = auth.get('access_token');
	const user = auth.get('user');

	if (token && user) return true;

	return false;
}

function getUserInfo() {
	if ( process.browser ) {
		const user = auth.get('user');
		return user ? JSON.parse(user) : false;
	}
	return false;
}

async function logout() {
	try {
		Object.keys(Cookies.get()).forEach((name) => Cookies.remove(name));
		auth.clearAppStorage();
		Router.push('/login');
	} catch (err) {
		createAlert('Oops! There was an error while trying to logout!', {type: 'error'});
	}
}

export {
	authenticateUser,
	registerUser,
	isAuthenticated,
	getUserInfo,
	logout,
}