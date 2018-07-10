import React from "react";
import { connect } from "react-redux";
import { fetchRestaurants } from "../actions/restaurantsActions";
import { user } from "../actions/userActions";
import * as api from "../api/kinveyRequester";
import Header from '../components/Header';
import compose from 'recompose/compose';
import { withStyles } from '@material-ui/core/styles';
// import withRoot from '../withRoot';

const styles = {
	root: {
	  flexGrow: 1,
	  textAlign: 'center'
	},
	flex: {
	  flex: 1,
	},
	header: {
		background: '#FF4081'
	},
	menuButton: {
	  marginLeft: -12,
	  marginRight: 20
	},
	logoIcon: {
		verticalAlign: 'middle'
	}
};
class RestaurantsList extends React.Component {
	componentWillMount() {
		api.getUser();
		api.isUserAdmin().then(response => {
			this.props.dispatch(user(response));
		});
		this.props.dispatch(fetchRestaurants());
	}

	render() {
		const { error, loading, restaurants, userType } = this.props;
		if (error) {
			return <div>Error! {error.message}</div>;
		}

		if (loading) {
			return <div>Loading...</div>;
		}

		return (
			<div>
				<Header />
				<ul>
				{restaurants.map(restaurant =>
					<li key={restaurant._id}>{restaurant.name}</li>
				)}
				</ul>
			</div>
		);
	}
}

const mapStateToProps = state => ({
	userType: state.userType,
	restaurants: state.items,
	loading: state.loading,
	error: state.error
});

export default connect(mapStateToProps)(RestaurantsList);

// export default withRoot(withStyles(styles)(RestaurantsList));
// export default compose(
// 	// withStyles(styles, {
// 	//   name: 'Restaurants',
// 	// }),
// 	withStyles(styles)(RestaurantsList),
// 	connect(mapStateToProps)(RestaurantsList)
// )(RestaurantsList);