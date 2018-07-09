import * as types from '../constants/ActionTypes';

export function user(isAdmin) {
	return dispatch => {
		if (isAdmin) {
			dispatch(setUserAdmin());
		} else {
			dispatch(setUserRegular());
		}
	};
}

export const setUserAdmin = () => ({
	type: types.SET_USER_TYPE_ADMIN
});

export const setUserRegular = restaurants => ({
	type: types.SET_USER_TYPE_REGULAR
});
