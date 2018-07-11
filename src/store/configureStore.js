import { createStore, applyMiddleware } from 'redux';
import { connectRouter, routerMiddleware } from 'connected-react-router';
import createHistory from 'history/createBrowserHistory';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import rootReducer from '../reducers';

export const history = createHistory();

const store = function configureStore(initialState) {
	return createStore(
		connectRouter(history)(rootReducer),
		initialState,
		composeWithDevTools(
			applyMiddleware(thunk, routerMiddleware(history))
		)
	);
}

export default store;
