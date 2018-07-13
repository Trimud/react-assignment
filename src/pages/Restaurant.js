import React from 'react';
import PropTypes from 'prop-types';
import compose from 'recompose/compose';
import { connect } from "react-redux";
import withRoot from '../withRoot';
import { withStyles } from '@material-ui/core/styles';
import { withRouter } from 'react-router-dom';

import { getUser } from "../api/kinveyRequester";
import { fetchSingleRestaurant } from "../actions/restaurantsActions";

import CircularProgress from '@material-ui/core/CircularProgress';

import RestaurantCard from '../components/RestaurantCard';

const styles = theme => ({
  root: {
    textAlign: 'center',
    background: 'none'
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  actions: {
    display: 'flex',
  },
  avatar: {
    backgroundColor: theme.palette.primary.main,
	},
	site: {
		marginTop: 8
	},
  progressWrapper: {
    textAlign: 'center'
  },
  progress: {
    margin: theme.spacing.unit * 2
  }
});

class Restaurant extends React.Component {

  componentWillMount() {
    let promise = getUser();
    promise.then(function(response) {
      console.log(response);
      
      this.props.dispatch(fetchSingleRestaurant());
    }.bind(this));
  }

  render() {
    const { classes, error, loading, restaurantData } = this.props;

		if (error) {
			return <div>Error! {error.message}</div>;
		}

		if (loading) {
			return <div className={classes.progressWrapper}>
        <CircularProgress className={classes.progress} size={50} />
      </div>;
    }

    return (
      <div className={classes.root}>
        <RestaurantCard data={restaurantData} />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  restaurantData: state.restaurantData,
	loading: state.loading,
	error: state.error
});

Restaurant.propTypes = {
  classes: PropTypes.object.isRequired,
  restaurantData: PropTypes.object.isRequired
};

export default withRoot(compose(
  withStyles(styles),
  withRouter,
  connect(mapStateToProps)
)(Restaurant));
