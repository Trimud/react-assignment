import {
	SET_USER_TYPE_ADMIN,
	SET_USER_TYPE_DUMMY,
	SET_AUTH,
	SET_ERROR_MESSAGE
} from '../constants/ActionTypes';
import * as errorMessages  from '../constants/MessageConstants';
import { loginUser } from "../api/kinveyRequester";

export function user(userType) {
	return dispatch => {
		if (userType === 'admin') {
			dispatch(setUserAdmin());
		} else {
			dispatch(setUserDummy());
		}
	};
}

export const login = (username, password) => {
	return dispatch => {
		const logUser = loginUser(username, password);
		logUser
			.then(function(response) {
				dispatch(setAuthState(response));
			})
			.catch(function(error) {
				console.log('Unable to set auth state', error);
			});
	};
}

export const setAuthState = (newState) => ({
	type: SET_AUTH,
	newState
});

export const setUserAdmin = () => ({
	type: SET_USER_TYPE_ADMIN
});

export const setUserDummy = restaurants => ({
	type: SET_USER_TYPE_DUMMY
});
