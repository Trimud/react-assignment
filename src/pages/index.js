import React, { Component } from 'react';
import PropTypes from 'prop-types';
import compose from 'recompose/compose';
import * as api from "../api/kinveyRequester";
import { connect } from "react-redux";
import { Route } from 'react-router';
import { user } from "../actions/userActions";
import { fetchRestaurants } from "../actions/restaurantsActions";
import withRoot from '../withRoot';
import { withStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import SingleLineGrid from '../components/SingleLineGrid';
import RecipeReviewCard from '../components/Card';

const styles = theme => ({
  '@global': {
    html: {
      background: theme.palette.background.default,
      WebkitFontSmoothing: 'antialiased', // Antialiasing.
      MozOsxFontSmoothing: 'grayscale', // Antialiasing.
      boxSizing: 'border-box'
    },
    '*, *:before, *:after': {
      boxSizing: 'inherit',
    },
    body: {
      margin: 0,
    }
  },
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
  },
  progressWrapper: {
    textAlign: 'center'
  },
  progress: {
    margin: theme.spacing.unit * 2
  }
});

class Index extends Component {
	componentWillMount() {
    let promise = api.getUser();
    promise.then(function(response) {
      this.props.dispatch(fetchRestaurants());
      this.props.dispatch(user(api.getUserType()));
    }.bind(this));

  }

  componentDidMount() {
    // ...
  }

  render() {
		const { classes, error, loading, restaurants } = this.props;
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
        <SingleLineGrid data={restaurants} />
        <RecipeReviewCard data={restaurants} />
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

Index.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withRoot(compose(
  withStyles(styles),
  connect(mapStateToProps),
)(Index));
