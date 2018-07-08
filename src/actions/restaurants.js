import * as types from '../constants/ActionTypes';
import Kinvey from 'kinvey-javascript-sdk-core';

export function fetchRestaurants() {
	return dispatch => {
		dispatch(fetchRestaurantsBegin());
		let promise = Kinvey.ping();
		promise.then(function(response) {
			console.log('Kinvey.ping:SUCCESS: Kinvey Service is alive, version: ' + response.version + ', response: ' + response.kinvey);
			const dataStore = Kinvey.DataStore.collection('restaurants', Kinvey.DataStoreType.Cache);
			dataStore.pull()
				.then(
					function onSuccess(entities) {
						dispatch(fetchRestaurantsSuccess(entities));
						return entities;
					})
				.catch(
					function onError(error) {
						console.log('DataStore fetch error: ' + error);
						dispatch(fetchRestaurantsFailure(error))
				});
		}, function(error) {
			console.log('Kinvey.ping:ERROR:', error);
		});
	};
}

export const fetchRestaurantsBegin = () => ({
	type: types.FETCH_RESTAURANTS_BEGIN
});

export const fetchRestaurantsSuccess = restaurants => ({
	type: types.FETCH_RESTAURANTS_SUCCESS,
	payload: restaurants
});

export const fetchRestaurantsFailure = error => ({
	type: types.FETCH_RESTAURANTS_FAILURE,
	payload: { error }
});
