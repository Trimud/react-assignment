import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Route, Switch } from 'react-router';
import { ConnectedRouter } from 'connected-react-router';
import store, { history } from './store/configureStore';

import Header from './components/Header';
import Index from './pages/Index';

const storeConfig = store();

ReactDOM.render(
	<Provider store={storeConfig}>
		<ConnectedRouter history={history}>
			<div>
				<Header />
				<Switch>
					<Route exact path="/" render={() => (<Index />)} />
					<Route render={() => (<div>Missing page</div>)} />
				</Switch>
			</div>
		</ConnectedRouter>
	</Provider>,
	document.getElementById('root')
)
