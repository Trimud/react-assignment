import React, { Component } from 'react';
import PropTypes from 'prop-types';
import compose from 'recompose/compose';
import { connect } from "react-redux";
import { fetchRestaurants } from "../actions/restaurantsActions";
import { user } from "../actions/userActions";
import * as api from "../api/kinveyRequester";
import { withStyles } from '@material-ui/core/styles';
import withRoot from '../withRoot';
import CircularProgress from '@material-ui/core/CircularProgress';
import SingleLineGrid from '../components/includes/SingleLineGrid';

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
    backgroundColor: theme.palette.background.paper
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
		api.getUser();
		api.isUserAdmin().then(response => {
			this.props.dispatch(user(response));
		});
    this.props.dispatch(fetchRestaurants());
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
