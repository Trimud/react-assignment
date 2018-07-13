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

export function fetchSingleRestaurant(id) {
	return dispatch => {
		dispatch(fetchSingleRestaurantBegin());
		let promise = Kinvey.ping();
		promise.then(function(response) {
			const dataStore = Kinvey.DataStore.collection('restaurants', Kinvey.DataStoreType.Cache);
			var stream = dataStore.findById('5b3dee4e7f20c939e4273f9d');
			stream.subscribe(function onNext(entity) {
				console.log(entity);
				dispatch(fetchSingleRestaurantSuccess(entity));
				return entity;
			}, function onError(error) {
				dispatch(fetchSingleRestaurantFailure());
			}, function onComplete() {
				// ...
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

export const fetchSingleRestaurantBegin = () => ({
	type: types.FETCH_RESTAURANT_DATA_BEGIN
});

export const fetchSingleRestaurantSuccess = restaurant => ({
	type: types.FETCH_RESTAURANT_DATA_SUCCESS,
	payload: restaurant
});

export const fetchSingleRestaurantFailure = error => ({
	type: types.FETCH_RESTAURANT_DATA_FAILURE,
	payload: { error }
});
