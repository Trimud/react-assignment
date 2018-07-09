import React from "react";
import { connect } from "react-redux";
import { fetchRestaurants } from "../actions/restaurantsActions";
import { user } from "../actions/userActions";
import * as api from "../api/kinveyRequester";

class RestaurantsList extends React.Component {
	componentWillMount() {
		api.getUser();
		api.isUserAdmin().then(response => {
			this.props.dispatch(user(response));
		});
		this.props.dispatch(fetchRestaurants());
	}

	render() {
		const { error, loading, restaurants, isAdmin } = this.props;
		if (error) {
			return <div>Error! {error.message}</div>;
		}

		if (loading) {
			return <div>Loading...</div>;
		}

		return (
			<ul>
			{restaurants.map(restaurant =>
				<li key={restaurant._id}>{restaurant.name}</li>
			)}
			</ul>
		);
	}
}

const mapStateToProps = state => ({
	isAdmin: state.isAdmin,
	restaurants: state.items,
	loading: state.loading,
	error: state.error
});

export default connect(mapStateToProps)(RestaurantsList);
