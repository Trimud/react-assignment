import {
	SET_USER_TYPE_ADMIN,
	SET_USER_TYPE_DUMMY
} from '../constants/ActionTypes';
import initialState from './initialState';

export default function usersReducer(state = initialState, action) {
	switch(action.type) {
		case SET_USER_TYPE_ADMIN:
		// Set the state to true
		return {
			...state,
			userType: 'admin'
		};
		case SET_USER_TYPE_DUMMY:
		// Set the state to false
		return {
			...state,
			userType: 'dummy'
		};
		default:
			// ALWAYS have a default case in a reducer
			return state;
	}
}
