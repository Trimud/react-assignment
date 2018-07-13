import {
	SET_USER_TYPE_ADMIN,
	SET_USER_TYPE_DUMMY,
	CHANGE_FORM,
	SET_AUTH,
	SET_ERROR_MESSAGE
} from '../constants/ActionTypes';
import initialState from './initialState';

export default function usersReducer(state = initialState, action) {
	switch(action.type) {
		case SET_USER_TYPE_ADMIN:
		// Set userType to `admin`
		return {
			...state,
			userType: 'admin'
		};
		case SET_USER_TYPE_DUMMY:
		// Set userType to `dummy`
		return {
			...state,
			userType: 'dummy'
		};
		case CHANGE_FORM:
		return {
			...state,
			loginFormState: action.newState
		};
		case SET_AUTH:
		// Set `loggedin` state to true
		return {
			...state,
			loggedin: action.newState
		};
		case SET_ERROR_MESSAGE:
		return {
			...state,
			errorMessage: action.message
		};
		default:
			// ALWAYS have a default case in a reducer
			return state;
	}
}
