import {
	SET_USER_TYPE_ADMIN,
	SET_USER_TYPE_REGULAR
} from '../constants/ActionTypes';
import initialState from './initialState';

export default function usersReducer(state = initialState, action) {
	switch(action.type) {
		case SET_USER_TYPE_ADMIN:
		// Set the state to true
		return {
			...state,
			isAdmin: true
		};
		case SET_USER_TYPE_REGULAR:
		// Set the state to false
		return {
			...state,
			isAdmin: false
		};
		default:
			// ALWAYS have a default case in a reducer
			return state;
	}
}
