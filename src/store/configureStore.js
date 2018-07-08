import { createStore, applyMiddleware, } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import restaurants from '../reducers/restaurants';

export default function configureStore(initialState) {
	console.log(initialState);
	
	return createStore(
		restaurants,
		initialState,
		composeWithDevTools(
			applyMiddleware(thunk)
		)
	);
}
