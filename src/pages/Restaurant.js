import React from 'react';
import PropTypes from 'prop-types';
import compose from 'recompose/compose';
import { connect } from "react-redux";
import withRoot from '../withRoot';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import { withRouter } from 'react-router-dom';

import { getUser } from "../api/kinveyRequester";
import { fetchSingleRestaurant } from "../actions/restaurantsActions";

import CircularProgress from '@material-ui/core/CircularProgress';

import RestaurantCard from '../components/RestaurantCard';
import MapComponent from "./includes/MapComponent";

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
  },
  paper: {
    margin: '20px 10px'
  },
  headline: {
    fontSize: '0.875rem',
    fontWeight: 500,
    padding: '10px 0'
  },
  gmap: {
    width: '100%',
    height: 300
  }
});

class Restaurant extends React.Component {

  componentWillMount() {
    let promise = getUser();
    promise.then(function(response) {
      const loc = window.location.href;
      const restaurantId = window.location.href.substr(window.location.href.lastIndexOf('/') + 1);
      this.props.dispatch(fetchSingleRestaurant(restaurantId));
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
        <Paper className={classes.paper} elevation={1}>
          <Typography className={classes.headline} variant="headline" component="h1">
            Location
          </Typography>
          <div className={classes.gmap}>
            <MapComponent
              googleMapURL="https://maps.googleapis.com/maps/api/js?key=<API_KEY>&v=3.exp&libraries=geometry,drawing,places"
              loadingElement={<div style={{ height: `100%` }} />}
              containerElement={<div style={{ height: `300px` }} />}
              mapElement={<div style={{ height: `100%` }} />}
              isMarkerShown={true}
              lat={restaurantData.latitude}
              lng={restaurantData.longitude}
            />
          </div>
        </Paper>
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
