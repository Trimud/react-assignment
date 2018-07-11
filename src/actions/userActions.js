import {
	SET_USER_TYPE_ADMIN,
	SET_USER_TYPE_DUMMY
} from '../constants/ActionTypes';

export function user(userType) {
	return dispatch => {
		if (userType === 'admin') {
			dispatch(setUserAdmin());
		} else {
			dispatch(setUserDummy());
		}
	};
}

export const setUserAdmin = () => ({
	type: SET_USER_TYPE_ADMIN
});

export const setUserDummy = restaurants => ({
	type: SET_USER_TYPE_DUMMY
});
