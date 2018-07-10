import Kinvey from 'kinvey-javascript-sdk-core';
import axios from 'axios';

const config = {
	baseURL     : 'https://baas.kinvey.com/',
	appKey      : 'kid_S1aNYuwzX',
	appSecret   : 'e38f2de0279846f9991071b81a0e01f5',
	masterSecret: '2fbe9e77a2934439b08a6769913734c2',
	adminRole   : '04282d57-98df-41c5-9c40-f70f813bc8e6'
};

let promise = Kinvey.init({
	appKey    : config.appKey,
	appSecret : config.appSecret
});

let axiosUserInstance = axios.create({
  baseURL: config.baseURL,
	timeout: 3000,
	responseType: 'json',
	auth: {
    username: config.appKey,
    password: config.masterSecret
  }
});

export function getUser() {
	let activeUser = Kinvey.User.getActiveUser();
	promise = Promise.resolve(activeUser);
	if (activeUser !== null) {
	  promise = activeUser.me();
	}
	promise
	  .then(function(activeUser) {
			console.log(activeUser);
			if (!activeUser) {
				// Autogenerate user as requested by Kinvey
				promise = Kinvey.User.signup()
					.then(function(user) {
						// ...
					})
					.catch(function(error) {
						console.log('Couldn\'t create new user: ' + error);
					});
			}
	  })
	  .catch(function(error) {
			console.log('Set active user error: ' + error);
	  });
}

export function loginUser(username, password) {
	Kinvey.User.login('yuriy.boev@gmail.com', 'platinum');
}
export function logoutUser() {
	Kinvey.User.logout();
}

export function isUserAdmin() {
	let activeUser = Kinvey.User.getActiveUser();
	return axiosUserInstance.get(`user/kid_S1aNYuwzX/${activeUser.data._id}/roles`)
		.then(response => {
			if (response.data[0].roleId === config.adminRole) {
				// User is admin
				return true;
			} else {
				return false;
			}
		})
		.catch(function (error) {
			console.log({error});
			return false;
		})
}

export function getUserType() {
	let activeUser = Kinvey.User.getActiveUser();
	return axiosUserInstance.get(`user/kid_S1aNYuwzX/${activeUser.data._id}/roles`)
		.then(response => {
			if (response.data[0].roleId === config.adminRole) {
				// User is admin
				return true;
			} else {
				return false;
			}
		})
		.catch(function (error) {
			console.log({error});
			return false;
		})
}
