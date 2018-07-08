import Kinvey from 'kinvey-javascript-sdk-core';

const config = {
	baseURL   : 'https://baas.kinvey.com/',
	appKey    : 'kid_S1aNYuwzX',
	appSecret : 'e38f2de0279846f9991071b81a0e01f5'
};

let promise = Kinvey.init({
	appKey    : config.appKey,
	appSecret : config.appSecret
});

export function getUser() {
	let activeUser = Kinvey.User.getActiveUser();
	promise = Promise.resolve(activeUser);
	if (activeUser !== null) {
	  promise = activeUser.me();
	}
	promise
	  .then(function(activeUser) {
		if (!activeUser) {
		  // Autogenerate user as requested by Kinvey
		  promise = Kinvey.User.signup()
			.then(function(user) {})
			.catch(function(error) {
			  console.log('Couldn\'t create new user: ' + error);
			});
		}
	  })
	  .catch(function(error) {
		console.log('Set active user error: ' + error);
	  });
}

export function getCollection(id) {
	let promise = Kinvey.ping();
	promise.then(function(response) {
		console.log('Kinvey.ping:SUCCESS: Kinvey Service is alive, version: ' + response.version + ', response: ' + response.kinvey);
		const dataStore = Kinvey.DataStore.collection(id, Kinvey.DataStoreType.Cache);
		dataStore.pull().then(
			function onSuccess(entities) {
				console.log(entities);
				return entities;
			}).catch(function onError(error) {
				console.log('DataStore fetch error: ' + error);
			});
	}, function(error) {
		console.log('Kinvey.ping:ERROR:', error);
	});
}
