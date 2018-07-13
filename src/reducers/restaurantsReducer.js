import {
	FETCH_RESTAURANTS_BEGIN,
	FETCH_RESTAURANTS_SUCCESS,
	FETCH_RESTAURANTS_FAILURE,
	FETCH_RESTAURANT_DATA_BEGIN,
	FETCH_RESTAURANT_DATA_SUCCESS,
	FETCH_RESTAURANT_DATA_FAILURE
} from '../constants/ActionTypes';
import initialState from './initialState';

export default function restaurantsReducer(state = initialState, action) {
	switch(action.type) {
		case FETCH_RESTAURANTS_BEGIN:
		// Mark the state as "loading" so we can show a spinner or something
		// Also, reset any errors. We're starting fresh.
		return {
			...state,
			loading: true,
			error: null
		};
		case FETCH_RESTAURANTS_SUCCESS:
		// All done: set loading "false".
		// Also, replace the restaurants with the ones from the server
		return {
			...state,
			loading: false,
			items: action.payload
		};
		case FETCH_RESTAURANTS_FAILURE:
		// The request failed, but it did stop, so set loading to "false".
		// Save the error, and we can display it somewhere
		// Since it failed, we don't have restaurants to display anymore, so set it empty.
		// This is up to you and your app though: maybe you want to keep the restaurants
		// around! Do whatever seems right.
		return {
			...state,
			loading: false,
			error: action.payload.error,
			items: []
		};
		case FETCH_RESTAURANT_DATA_BEGIN:
		// Get Restaurant Begin
		return {
			...state,
			loading: true,
			error: null
		};
		case FETCH_RESTAURANT_DATA_SUCCESS:
		// Get Restaurant Data
		console.log(action.payload);
		return {
			...state,
			loading: false,
			restaurantData: action.payload
		};
		case FETCH_RESTAURANT_DATA_FAILURE:
		// Get Restaurant ID
		return {
			...state,
			loading: false,
			error: action.payload.error,
			restaurantData: []
		};
		default:
			// ALWAYS have a default case in a reducer
			return state;
	}
}
