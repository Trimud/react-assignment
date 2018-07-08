import React from "react";
import { connect } from "react-redux";
import { fetchRestaurants } from "../actions/restaurants";
import * as api from "../api/kinveyRequester";

class RestaurantsList extends React.Component {
	componentWillMount() {
		api.getUser();
	}
	componentDidMount() {
		this.props.dispatch(fetchRestaurants());
	}

	render() {
		const { error, loading, restaurants } = this.props;
		console.log(restaurants.restaurants);
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
	restaurants: state.items,
	loading: state.loading,
	error: state.error
});

export default connect(mapStateToProps)(RestaurantsList);
