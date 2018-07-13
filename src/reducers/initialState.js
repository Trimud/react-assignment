const initialState = {
	userType: 'dummy',
	loggedin: false,
	items: [],
	loading: false,
	error: null,
	loginFormState: {
	  username: '',
	  password: ''
	},
	restaurantData: {},
	errorMessage: ''
};

export default initialState;