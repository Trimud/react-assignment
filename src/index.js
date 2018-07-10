import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import configureStore from './store/configureStore';

// import RestaurantsList from './pages/restaurantsView';
import Index from './pages/Index';
import Header from './components/Header';

const rootEl = document.getElementById('root');

const store = configureStore();

ReactDOM.render(
	<Provider store={store}>
		<div>
			<Header />
			<Index />
		</div>
	</Provider>,
	rootEl
)
