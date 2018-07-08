import * as types from '../constants/ActionTypes'

export const increment = text => ({
	type: types.INCREMENT,
	text
});
