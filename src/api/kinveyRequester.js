import Kinvey from 'kinvey-javascript-sdk-core';

const config = {
	baseURL     : 'https://baas.kinvey.com/',
	appKey      : 'kid_S1aNYuwzX',
	appSecret   : 'e38f2de0279846f9991071b81a0e01f5',
	adminRoleID   : '04282d57-98df-41c5-9c40-f70f813bc8e6'
};

Kinvey.init({
	appKey    : config.appKey,
	appSecret : config.appSecret
});

export const getUser = () => {
	let activeUser = Kinvey.User.getActiveUser();
	let promise = Promise.resolve(activeUser);

	if (activeUser === null) {
		return promise = Kinvey.User.login('test', 'test')
			.then(
				(user) => {
					activeUser = Kinvey.User.getActiveUser();
					return activeUser;
			}).catch(
				(error) => {
					console.log('Could not login test user', error);
			});
	}

	promise = activeUser.me();
	return Promise.resolve(activeUser);
}

export const loginUser = (username, password) => {
	let promise = Kinvey.User.login(username, password)
  .then(function(user) {
		console.log({user});
  })
  .catch(function(error) {
		console.log('Login user error', error);
  });
}

export const logoutUser = () => {
	Kinvey.User.logout();
	Kinvey.User.login('test', 'test');
}

export function getUserType() {
	let activeUser = Kinvey.User.getActiveUser();

	if (activeUser && 'roles' in activeUser.data._kmd && activeUser.data._kmd.roles[0].roleId === config.adminRoleID) {
		// User is admin
		return 'admin';
	} else {
		return 'dummy';
	}
}
